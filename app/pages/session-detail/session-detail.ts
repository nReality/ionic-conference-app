import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {NavParams} from 'ionic-angular';
import { Star } from './star';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/pages/session-detail/session-detail.html',
  directives: [Star]
})
export class SessionDetailPage {
  session: any;
  stars:number[] = [1,2,3,4,5];
  comment:string = "";

  @Input() starCount: number;
  @Input() rating: number = 0;
  @Output() rate = new EventEmitter();
  _rating = this.rating;
  ratingsRef: any;

  constructor(private navParams: NavParams) {
    this.session = navParams.data;
    const count = this.starCount < 0 ? 5 : this.starCount;

    this.ratingsRef = firebase.database().ref('Ratings');
  }

  onRate(star) {
    this.rate.emit(star);
    this._rating = star;
  }

  postRating(session){
    this.ratingsRef.push({session:session.name, deviceID: 123456, value: this._rating, comment:this.comment});
    alert("Thank you. Your feedback has been received.");
  }
}
