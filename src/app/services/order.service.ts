import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    constructor( private http: HttpClient) {}

    createOrder(){
        this.http.post('localhost:8080/payment',{"cust_id":"raju_1_12345", "txn_amnt":"123"});
    }
}
