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
    if (!this.userRegistered) {
      this._router.navigate([""]);
    }
  }

  copyText() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.userRegistered.code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  navigate(destination) {
    if (destination == 'user') {
      this._router.navigate(["user-registration"]);
    }
    if (destination == 'event') {
      this._router.navigate(["event-registration"]);

    }
  }

}
