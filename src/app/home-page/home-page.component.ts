import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(    private router: Router) { }

  ngOnInit() {
  }

  categoryList: any = [{ "name": "User Registration", "id": 0 }, { "name": "Event Registration", "id": 1 }];


  navigate(category) {
    if(category.id === 0){
      this.router.navigate(['/user-registration']);
    }
    if(category.id === 1){
      this.router.navigate(['/event-registration']);
    }

  }

}
