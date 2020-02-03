import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor( ) {}

    userRegistered: any;

    cartList: any[] = [];

}
