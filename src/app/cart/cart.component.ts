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


  register(){
    
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

      let tempFilter = participant.events.filter(ev => {
        console.log(ev);
        return ev.event.id === 19;
      });
      console.log(tempFilter);
      let eventsWithoutRobo = participant.events.filter(ev => {
        console.log(ev);
        return !(ev.event.id === 19);
      });



      if (tempFilter.length > 0) {
        console.log("Robotics event");
        if (eventsWithoutRobo.length === 1) {
          participantTotal = 70;
        }
        else if (eventsWithoutRobo.length === 2) {
          participantTotal = 120;
        }
        else if (eventsWithoutRobo.length >= 3) {
          participantTotal = eventsWithoutRobo.length * 50;
        }
        participantTotal = participantTotal + 240;
      }
      else {
        console.log("No robotic");

        if (participant.events.length === 1) {
          participantTotal = 70;
        }
        else if (participant.events.length === 2) {
          participantTotal = 120;
        }
        else if (participant.events.length >= 3) {
          participantTotal = participant.events.length * 50;
        }
      }


      this.overallTotal = this.overallTotal + participantTotal;
      participant["participantTotal"] = participantTotal;
      console.log("last", participant);

    });
  }

}

