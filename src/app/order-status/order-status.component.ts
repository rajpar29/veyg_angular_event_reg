import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';
import * as CryptoJS from 'crypto-js';
import { environment } from "../../environments/environment";
import { MatSnackBar } from '@angular/material';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  isPaymentSuccessFull;
  txn_id;
  order_id;
  pdfMake;

  constructor(
    private route: ActivatedRoute,
    private _fsDB: AngularFirestore,
    private _snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.decryptData(params['response']);

      pdfMake.vfs = pdfFonts.pdfMake.vfs;
    });
  }
  
  decryptData(response){
    let j;
    let hexes = response.match(/.{1,4}/g) || [];
    let back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 25));
    }
    let res = back.split("splitter");
      if (res[1] == "TXN_SUCCESS") {
        this._fsDB.collection("registrations").doc(res[0]).set({ "paid": true, "txn_id":res[2] ,"order_id": res[0]}, { merge: true });
        this._fsDB.collection("teams").doc(res[0]).set({ "paid": true, "txn_id":res[2] ,"order_id": res[0]}, { merge: true });
        this.isPaymentSuccessFull = true;
        this.txn_id = res[2];
        this.order_id = res[0]
      }
      else {
        this.isPaymentSuccessFull = false;
      }
    
  }

  generatePdf(){
    const documentDefinition = { content: "SAFFRONY INSTITUTE OF TECHNOLOGY " + "\n\n" + "Veyg 2020 " + "\n\n" +"Transaction Id:" + this.txn_id + "\n" +  "Order Id : "  + this.order_id};
    pdfMake.createPdf(documentDefinition).open();
   }

  copy() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = "Order Id : " + this.order_id + " Transaction Id : " + this.txn_id;
    document.body.appendChild(selBox);
    selBox.focus(); 
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this._snack.open('Code Copied', "Ok", { duration: 3000 });
  }
}
