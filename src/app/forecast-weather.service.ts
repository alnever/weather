import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
export class ForecastWeatherService {

  // request parameters
  private url:string = 'http://api.openweathermap.org/data/2.5/forecast';

  // make a request result a BehaviorSubject to support
  // reactive changes of the components demonstrating search results
  private weather = new BehaviorSubject([]);

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

  /** Find a weather for the city selected by user
  * @param searchParams - a set of query params
  *
  * after obtaining data saves them into the weather variable
  */
  private forecastWeather(searchParams) {
    this.http.get(
      this.url,
      {
          params: searchParams
      }
    )
    .pipe(
      map(response => response as any),
      map(response => response.list),
      map(response => response.map(
        data => new Weather(
          "",
          new Date(data.dt * 1000), // convert UTC date
          data.main.temp,
          data.main.temp_min,
          data.main.temp_max,
          data.main.pressure,
          data.main.humidity,
          ""
        )
      )),
      map(response => response as Weather[])
    )
    .subscribe(response => this.weather.next(response));
  }

  /**
  * Provides search by city name
  *
  * @param city: string - city name
  */

  public searchByCityName(city: string) {
    this.forecastWeather(
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
    this.forecastWeather(
      {
      'lat': coords.lat,
      'lon': coords.lon,
      'units': 'metric',
      'appid': this.baseConst.getWeatherKey()
      }
    );
  }

}
