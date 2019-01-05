import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Weather } from './weather';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  // request parameters
  private url:string = 'http://api.openweathermap.org/data/2.5/weather';
  private key:string = 'd5bb2bd186d0447a80000f7dbf63c601';

  // make a request result a BehaviorSubject to support
  // reactive changes of the components demonstrating search results
  private weather = new BehaviorSubject(null);

  // inject HttpClient service
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
  public searchWeather(city: string) {
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
}
