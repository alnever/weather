import { Component, OnInit } from '@angular/core';

import { Weather } from '../weather';
import { CurrentWeatherService } from '../current-weather.service';

/**
*  Component shows current weather in selected city
*/

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  // Component data - current weather data
  public weather: Weather;

  // Inject a current weather service into component

  constructor(
    private currentWeather: CurrentWeatherService
  ) { }

  // OnInit
  // TODO: get a current location of user and find a weather for
  ngOnInit() {
    this.getWeather();
  }

  // get weather when user enter a city's city
  // and weather data where obtained by service
  getWeather() {
    this.currentWeather.getWeather$()
      .subscribe(weather => { this.weather = weather });
  }

}
