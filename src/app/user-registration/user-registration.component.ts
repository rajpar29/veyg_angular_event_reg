import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  userForm: FormGroup;

  semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  branches = [
    { "name": "Computer", "id": "ce" },
    { "name": "Information Technology", "id": "it" },
    { "name": "Civil", "id": "civ" },
    { "name": "Mechanical", "id": "mech" },
    { "name": "Automobile", "id": "auto" },
    { "name": "Electrical", "id": "el" },
    { "name": "Electronics", "id": "ec" },
    { "name": "Others", "id": "ot" }];


  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {
    this.userForm = _formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      // birthday: ["", Validators.required],
      gender: ["", [Validators.required]],
      semester: ["", [Validators.required]],
      branch: ["", [Validators.required]],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$")
        ]
      ],
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this._userService.registerUser(this.userForm.value).then((res) => {
      this.userForm.reset();
    });

  }

}
