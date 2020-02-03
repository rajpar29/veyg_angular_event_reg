import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userRegistered: any;
  constructor(
    private _dataService: DataService,
    private _router: Router

  ) { }

  ngOnInit() {
    this.userRegistered = this._dataService.userRegistered;
    if(!this.userRegistered){
      this._router.navigate([""]);
    }
  }

}
