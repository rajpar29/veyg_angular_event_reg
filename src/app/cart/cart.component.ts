import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private _dataService: DataService
  ) { }

  cartItems: any[];
  sortedParticipantMap = {};
  sortedParticipantList = [];
  overallTotal = 0;


  ngOnInit() {
    this.cartItems = this._dataService.cartList;
    console.log(this.cartItems);

    this.sortparticipants();

  }
  sortparticipants() {

    this.cartItems.forEach(item => {
      let participants = item["participants"];
      participants.forEach(participant => {
        if (!this.sortedParticipantMap.hasOwnProperty(participant["code"])) {
          this.sortedParticipantMap[participant["code"]] = [{ "event": item["event"] }]
        }
        else {
          this.sortedParticipantMap[participant["code"]].push({ "event": item["event"] });
        }
      });
    });
    console.log(this.sortedParticipantMap);
    let keys = Object.keys(this.sortedParticipantMap);
    keys.forEach(key => {
      this.sortedParticipantList.push({ "id": key, "events": this.sortedParticipantMap[key] });
      console.log("LIST", this.sortedParticipantList);

    });

    this.calculateParticipantPrice();

  }
  calculateParticipantPrice() {
    
    this.sortedParticipantList.forEach(participant => {
      let participantTotal = 0;
      console.log(participant);
      console.log(participant.events.length);
      
      if (participant.events.length === 1) {
        participantTotal = 70;
      }
      else if (participant.events.length === 2) {
        participantTotal = 120;
      }
      else if (participant.events.length >= 3) {
        participantTotal = participant.events.length * 50;
      }
      this.overallTotal = this.overallTotal + participantTotal;
      participant["participantTotal"] = participantTotal;
      console.log("last",participant);

    });
  }

}

