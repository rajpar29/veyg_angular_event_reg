import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { OrderService } from '../services/order.service';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { FirebaseStorage } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  firstUser: any;
  orderId: any;
  tempFilter: any[] = [];

  constructor(
    private _dataService: DataService,
    private _orderService: OrderService,
    private _fsDB: AngularFirestore,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _cartService: CartService
  ) { }

  cartItems: any[];
  sortedParticipantMap = {};
  sortedParticipantList = [];
  overallTotal = 0;

  isTcAccepted = false;



  ngOnInit() {
    this.cartItems = this._dataService.cartList;
    console.log(this.cartItems);
    this.sortparticipants();
    if (this.sortedParticipantList.length > 0) {

      this._spinner.show();
      // console.log("first user", this.sortedParticipantList[0]);
      this.getFirstUser();
    }
  }

  async getFirstUser() {
    await this._fsDB.collection("users").doc(this.sortedParticipantList[0]["id"]).get().toPromise().then(res => {
      this.firstUser = res.data();
      // console.log("first user /data", this.firstUser);
      this._spinner.hide()
    }).catch(err => {
      alert("Some Error occured");
      this._spinner.hide()
    });
  }

  register() {
    this.orderId = this.sortedParticipantList[0]["id"] + new Date().getTime();
    this._spinner.show();


    this._cartService.registerTeam(this.cartItems, this.orderId).then(res => {
      this._fsDB.collection("registrations").doc(this.orderId).set({ "registers": this.sortedParticipantList, "paid": false, "total": this.overallTotal }).then(res => {
        document.forms['myform'].submit();
        this._spinner.hide();
        return false;
      }).catch(err => {
        alert("Some Error occured");
      });
    });
  }

  clearCart() {
    this._dataService.cartList = [];
    this.cartItems = [];
    this.sortedParticipantMap = {};
    this.sortedParticipantList = [];
    this.overallTotal = 0;
  }

  toEvents() {
    this._router.navigate(["event-registration"]);
  }
  sortparticipants() {

    this.cartItems.forEach(item => {
      let participants = item["participants"];
      participants.forEach(participant => {
        if (!this.sortedParticipantMap.hasOwnProperty(participant["code"])) {
          this.sortedParticipantMap[participant["code"]] = [{ "event": item["event"] }]
        }
        else {
          this.sortedParticipantMap[participant["code"]].push({ "event": item["event"] });
        }
      });
    });
    console.log(this.sortedParticipantMap);
    let keys = Object.keys(this.sortedParticipantMap);
    keys.forEach(key => {
      this.sortedParticipantList.push({ "id": key, "events": this.sortedParticipantMap[key] });
      console.log("LIST", this.sortedParticipantList);

    });

    this.calculateParticipantPrice();


  }
  calculateParticipantPrice() {

    this.sortedParticipantList.forEach(participant => {
      let participantTotal = 0;

      this.tempFilter = participant.events.filter(ev => {
        // console.log(ev);
        return ev.event.id === 18;
      });
      // console.log(this.tempFilter);
      let eventsWithoutRobo = participant.events.filter(ev => {
        console.log(ev);
        return !(ev.event.id === 18);
      });



      if (this.tempFilter.length > 0) {
        console.log("Robotics event");
        if (eventsWithoutRobo.length === 1) {
          participantTotal = 70;

        }
        else if (eventsWithoutRobo.length === 2) {
          participantTotal = 120;
        }
        else if (eventsWithoutRobo.length >= 3) {
          participantTotal = eventsWithoutRobo.length * 50;
        }
      }
      else {
        console.log("No robotic");

        if (participant.events.length === 1) {
          participantTotal = 70;
        }
        else if (participant.events.length === 2) {
          participantTotal = 120;
        }
        else if (participant.events.length >= 3) {
          participantTotal = participant.events.length * 50;
        }
      }


      this.overallTotal = this.overallTotal + participantTotal;
      participant["participantTotal"] = participantTotal;
      // console.log("last", participant);

    });

    if (this.tempFilter.length > 0) {
      this.overallTotal = this.overallTotal + 240;
    }
  }

}

