import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Weather } from './weather';
import { UserLocation } from './user-location';
import { BaseConstService } from './base-const.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  // request url
  private url:string = 'http://api.openweathermap.org/data/2.5/weather';

  // make a request result a BehaviorSubject to support
  // reactive changes of the components demonstrating search results
  private weather = new BehaviorSubject(null);

  /**
  * Inject necessary services
  * @param http: HttpClient - to request api
  * @param baseConst: BaseConstService - to get common parameters
  */
  constructor(
    private http: HttpClient,
    private baseConst: BaseConstService
  ) { }

  // function to return search results
  public getWeather$() {
    return this.weather.asObservable();
  }

  /**
  * Find a weather for the city selected by user
  * @param searchParams - a set of query params
  *
  * after obtaining data saves them into the weather variable
  */
  private searchWeather(searchParams) {
    // if city is empty (initial condition), then find it by coordinates
    this.http.get(
      this.url,
      {
          params: searchParams
      }
    )
    .pipe(
      map(response => response as any),
      map(response => new Weather(
        response.name,
        new Date(response.dt * 1000), // convert UTC date
        response.main.temp,
        response.main.temp_min,
        response.main.temp_max,
        response.main.pressure,
        response.main.humidity,
        response.weather[0].icon
      )),
      map(response => response as Weather)
    )
    .subscribe(response => this.weather.next(response));
  }

  /**
  * Provides search by city name
  *
  * @param city: string - city name
  */

  public searchByCityName(city: string) {
    this.searchWeather(
      {
      'q': city,
      'units': 'metric',
      'appid': this.baseConst.getWeatherKey()
      }
    );
  }

  /**
  * Provides search by coordinates of the current location of user
  *
  * @param coords: UserLocation - lat-n-lon of current user
  */
  public searchByCoords(coords: UserLocation) {
    this.searchWeather(
      {
      'lat': coords.lat,
      'lon': coords.lon,
      'units': 'metric',
      'appid': this.baseConst.getWeatherKey()
      }
    );
  }
}
