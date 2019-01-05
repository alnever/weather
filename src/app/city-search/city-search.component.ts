import { Component, OnInit, Input } from '@angular/core';
import { CurrentWeatherService } from '../current-weather.service';
import { ForecastWeatherService } from '../forecast-weather.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {
  @Input() cityName: string = "";

  // inject necessary services
  // @param currentWeather: CurrentWeatherService - service for searching weather data
  // @param forecastWeather: ForecastWeatherService -service to get forecast for 3-5 days
  constructor(
    private currentWeather: CurrentWeatherService,
    private forecastWeather: ForecastWeatherService
  ) { }

  ngOnInit() {
  }

  // Function provides a reaction on Enter keyup and Find click events
  public searchByCityName() {
    this.currentWeather.searchWeather(this.cityName);
    this.forecastWeather.forecastWeather(this.cityName);
  }

}
