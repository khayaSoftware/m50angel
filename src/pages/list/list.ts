import { Component, NgModule } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  
})



export class ListPage {
  icons: string[];
  items: Array<{text: string, date: string, profile: string, name: string}>;
  json: Tweet[];
  lengthOfArray = Number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, http: HttpClient) {
    http.get<TweetFeed>("http://34.240.178.13:3000/user_timeline").subscribe(result => {
        this.json = result.data;
        this.items = [];
        //console.log(this.json);

        for(let i = 0; i < this.json.length; i++) {
          this.items.push({
            text: this.json[i].text,
            date: this.json[i].created_at,
            profile: this.json[i].user.profile_image_url_https,
            name: this.json[i].user.name
          });
        }
    }, error => console.error(error));
    
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}

interface TweetFeed {
  data: Tweet[];
}

class TwitterUser {
  profile_image_url_https: string;
  name: string;
}

class Tweet{
  text: string;
  created_at: string;
  user: TwitterUser;
}