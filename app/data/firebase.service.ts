import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import { Harvest }     from './harvest';

@Injectable()
export class FirebaseService {
  constructor(private http: Http) { }

  private _url = 'https://nallakeerai-nsp.firebaseio.com';
  private fbRoot = new Firebase(this._url);

  getFarms(): Promise<any> {
    let url = this._url + "/farms" + ".json";
    console.log(url);
    return this.http.get(url).toPromise().then(res => res, this.handleError);
  }

  getPlants() {
    let url = this._url + "/plants" + ".json";
    console.log(url);
    return this.http.get(url).toPromise().then(res => res, this.handleError);
  }

  addHarvest(harvest: any) {
    harvest.when = { '.sv': 'timestamp' };
    let url = this._url + "/harvest/" + harvest.day + ".json";
    console.log(url);
    return this.http.post(url, JSON.stringify(harvest)).toPromise()
      .then(res => console.log(res.json()), this.handleError);
  }

  addFarm(farm: any) {
    farm.when = { '.sv': 'timestamp' };
    let url = this._url + "/farms" + ".json";
    console.log(url);
    return this.http.post(url, JSON.stringify(farm)).toPromise()
      .then(res => console.log(res.json()), this.handleError);
  }

  addPlant(plant: any) {
    plant.when = { '.sv': 'timestamp' };
    let url = this._url + "/plants" + ".json";
    console.log(url);
    return this.http.post(url, JSON.stringify(plant)).toPromise()
      .then(res => console.log(res.json()), this.handleError);
  }

  getFirebaseHarvestLog(day: string) {
    let url = this._url + "/harvest/" + day + ".json";
/*
    //auto push socket works!!
    var fb = new Firebase(this._url + "/" + day);
    fb.on("value", function (snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
*/
    console.log(url);
    return this.http.get(url).toPromise().then(res => res, this.handleError);
  }

  authenticate(email: string, password: string): Promise<any> {
    let fbr = this.fbRoot;
    return new Promise(function(resolve, reject) {
      fbr.authWithPassword({
        email: email,
        password: password
      }, function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          reject(error);
        } else {
          resolve(authData);
        }
      });
    });
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}