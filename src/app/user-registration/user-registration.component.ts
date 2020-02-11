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
  isOtherBranch: boolean;

  semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  branches = [
    { "name": "Computer", "id": "ce" },
    { "name": "Information Technology", "id": "it" },
    { "name": "Civil", "id": "civ" },
    { "name": "Mechanical", "id": "mech" },
    { "name": "Automobile", "id": "auto" },
    { "name": "Electrical", "id": "el" },
    { "name": "Electronics and Communication", "id": "ec" },
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
      clgName: ["", [Validators.required]],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$")
        ]
      ],
      otherBranchName: ["",[Validators.required]]
    });
  }

  ngOnInit() {
  }

  branchChanged(){
    console.log(this.userForm.get("branch").value);
    
    if(this.userForm.get("branch").value === 'ot'){
      this.isOtherBranch = true;
      this.userForm.get("otherBranchName").setValue("");
    }
    else{
      this.isOtherBranch = false;
      this.userForm.get("otherBranchName").setValue("not other");

    }
  }

  submitForm() {
    this._userService.registerUser(this.userForm.value).then((res) => {
      this.userForm.reset();
    });

  }

}
