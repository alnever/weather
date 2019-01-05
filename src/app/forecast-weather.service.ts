import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Weather } from './weather';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ForecastWeatherService {

  // request parameters
  private url:string = 'http://api.openweathermap.org/data/2.5/forecast';
  private key:string = 'd5bb2bd186d0447a80000f7dbf63c601';


  // make a request result a BehaviorSubject to support
  // reactive changes of the components demonstrating search results
  private weather = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) { }

  // function to return search results
  public getWeather$() {
    return this.weather.asObservable();
  }

  // Find a weather for the city selected by user
  // @param city: string - the name of the city
  //
  // after obtaining data saves them into the weather variable
  public forecastWeather(city: string) {
    this.http.get(
      this.url,
      {
          params: {
          'q': city,
          'units': 'metric',
          'appid': this.key
        }
      }
    )
    .pipe(
      map(response => response as any),
      map(response => response.list),
      map(response => response.map(
        data => new Weather(
          "",
          new Date(data.dt * 1000),
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

}
