import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { allEvents } from '../data/events.data';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.scss']
})
export class EventRegistrationComponent implements OnInit {

  eventForm: FormGroup;
  teamList: any[] = [];
  events: any;



  branches = [
    { "name": "Civil", "id": "civ" },
    { "name": "Computer and Information Technology", "id": "ce" },
    { "name": "Mechanical and Automobile", "id": "mech" },
    { "name": "Electrical and Electronics", "id": "ec" },
    { "name": "Robotics", "id": "robotics" },
    { "name": "Non technical", "id": "nt" }
  ];
  branchSelected: any;
  branchEvents: any[] = [];

  eventSelected: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _userSevice: UserService,
    private _spinner: NgxSpinnerService,
    private _snackbar: MatSnackBar,
    private _router: Router,
    private _dataService: DataService

  ) {

    this.eventForm = _formBuilder.group({
      branch: ["", Validators.required],
      code: ["", Validators.required],
      event: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.events = allEvents;
  }

  fetchUser() {
    if (this.teamList.length >= this.eventSelected.teamSize) {
      this._snackbar.open(`only ${this.eventSelected.teamSize} members allowed`, "Ok", { duration: 3000 });
      return;
    }
    if (this.checkIfAlreadyExists() == -1) {
      this._snackbar.open(`${this.eventForm.get("code").value} Already Exists`, "Ok", { duration: 3000 });
      return;
    }
    this._spinner.show();
    let code = this.eventForm.get("code").value.trim();
    console.log(code);
    this._userSevice.fetchUser(code).then(res => {
      if (!res.exists) {
        this._snackbar.open("Couldn't Find User\n Please Register First", "Ok", { duration: 3000 });
      }
      else {
        this.teamList.push(res.data());
        this.eventForm.get("code").setValue("");
        console.log(this.teamList);

      }
      this._spinner.hide();
    }).catch(err => {
    });
  }


  addToCart() {
    this._dataService.cartList.push(
      {
        "branch": this.branchSelected.id,
        "event": this.eventSelected,
        "participants": this.teamList,
      }
    );
    this.eventForm.reset();
    this.teamList = [];
    this._snackbar.open("Added to cart", "Ok", { duration: 3000 });
  }

  checkIfAlreadyExists() {
    let code = this.eventForm.get("code").value;
    let tempArr = this.teamList.filter(member => member.code === code);


    console.log(tempArr);

    if (tempArr.length > 0) {
      return -1;
    }
    return 1;
  }

  branchChanged() {
    this.branchSelected = this.eventForm.get("branch").value;
    console.log("here", this.eventForm.get("branch").value);
    this.branchEvents = this.events[this.branchSelected.id];
    console.log(this.branchEvents);
    this.teamList = [];

  }

  eventChanged() {
    this.eventSelected = this.eventForm.get("event").value;
    this.teamList = [];
  }
  toCart() {
    console.log("Cart");
    this._router.navigate(["cart"]);

  }

  validateForm() {
    if (this.eventSelected && this.branchSelected && (this.teamList.length >= 1 && this.teamList.length <= this.eventSelected.teamSize)) {
      return true;
    }
    else {
      false
    }
  }
}
