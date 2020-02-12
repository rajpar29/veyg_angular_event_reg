import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    constructor(
        private _db: AngularFirestore,
        private _spinner: NgxSpinnerService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _dataService: DataService
    ) {
    }

    teamid;

    async registerTeam(data, orderId) {

        let teamCount;
        console.log(data);
        
        await this._db.collection("metadata").doc("team-count").get().toPromise().then((res) => {
            teamCount = res.data().count;

            this.teamid = teamCount + "_" + data[0]["participants"][0]["code"] ;
            this._db.collection("metadata").doc("team-count").set({ count: teamCount + 1 });
            this._db.collection("teams").doc(orderId).set({
                ...data,
                 "order_id": orderId,
                 "paid":false,
                 "teamId": this.teamid
            });


        }
        ).catch(err => {
            this._snackBar.open("Some error occured", "Ok", { duration: 3000 });

        });
    }



}
