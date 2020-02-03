import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private _db: AngularFirestore,
        private _spinner: NgxSpinnerService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _dataService: DataService
    ) {
    }

    async registerUser(data) {
        this._spinner.show();

        await this._db.collection("metadata").doc("users").get().toPromise().then((res) => {
            // console.log(res.data());
            let userCount = res.data().count;
            let code = data.firstName + "_" + userCount + "_" + data.phone.slice(-5);
            this._db.collection("users").doc(code).set({ ...data, "code": code }).then(res => {
                this._snackBar.open("User Registered", "Ok", { duration: 3000 });
                this._spinner.hide();
                // console.log("Success");
                this._db.collection("metadata").doc("users").set({ count: userCount + 1 });
                this._dataService.userRegistered = { ...data, "code": code };
                this._router.navigate(["user-info"]);
            }).catch(err => {
                this._snackBar.open("Some error occured", "Ok", { duration: 3000 });
                this._spinner.hide();
            });

        }
        ).catch(err => {
            this._snackBar.open("Some error occured", "Ok", { duration: 3000 });
            this._spinner.hide();

        });
    }

    fetchUser(code){
        return this._db.collection("users").doc(code).get().toPromise();
    }

}
