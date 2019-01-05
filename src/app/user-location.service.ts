import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserLocation } from './user-location';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  private userLocation = new BehaviorSubject(new UserLocation(0,0));

  constructor() {
    this.getCurrentLocation();
  }

  /**
  * Function returns saved current position
  */
  public getLocation$() {
    return this.userLocation.asObservable();
  }

  /**
  * Function gets user location
  */
  private getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(this.getCoords.bind(this));
  }

  /**
  * Save current coordinates
  * @param position - result of navigator.geolocation.getCurrentPosition
  */

  private getCoords(position) {
    this.userLocation.next(new UserLocation(position.coords.latitude, position.coords.longitude));
  }

}
