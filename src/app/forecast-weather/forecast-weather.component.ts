import { Component, OnInit } from '@angular/core';

import { Weather } from '../weather';
import { ForecastWeatherService } from '../forecast-weather.service';

/**
* Component to show forecasted weather data
*/

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss']
})
export class ForecastWeatherComponent implements OnInit {

  // Component data - array of forecated data from API
  public weather: Weather[];

  // Inject a current weather service into component
  constructor(
    private forecastWeather: ForecastWeatherService
  ) { }

  // OnInit
  // TODO: get a current location of user and find a weather for
  ngOnInit() {
    this.getWeather();
  }

  // get a forecast when user enter a city's city
  // and weather data where obtained by service
  getWeather() {
    this.forecastWeather.getWeather$()
      .subscribe(weather => { this.weather = weather });
  }


}
