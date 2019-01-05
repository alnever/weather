import { Component, OnInit, Input } from '@angular/core';


import { CurrentWeatherService } from '../current-weather.service';
import { ForecastWeatherService } from '../forecast-weather.service';
import { UserLocationService } from '../user-location.service';

import { UserLocation } from '../user-location';


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
    private forecastWeather: ForecastWeatherService,
    private userLocation: UserLocationService
  ) { }

  ngOnInit() {
    this.getCurrentWeather();
  }

  // Function provides a reaction on Enter keyup and Find click events
  public searchByCityName() {
    this.currentWeather.searchByCityName(this.cityName);
    this.forecastWeather.searchByCityName(this.cityName);
  }

  /**
  * Function provides a reaction on Enter keyup and Find click events
  *
  * @param coords: Location - current user location
  */
  public searchByCoords(coords: UserLocation) {
    this.currentWeather.searchByCoords(coords);
    this.forecastWeather.searchByCoords(coords);
  }

  // get current location and it's weather
  public getCurrentWeather() {
    this.userLocation.getLocation$()
      .subscribe(response => {
        this.searchByCoords(response as UserLocation);
      });
  }
}
