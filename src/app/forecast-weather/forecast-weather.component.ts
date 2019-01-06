import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as CanvasJS from '../canvasjs.min';

import { Weather } from '../weather';
import { ForecastWeatherService } from '../forecast-weather.service';
import { DataPoint } from '../data-point';

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
  // current route
  private currentRoute;

  /** Inject a current weather service into component
  *
  * @param forecastWeather: ForecastWeatherService - to get weather forecast data
  * @param activatedRoute: activatedRoute - to get active route and change component behavior
  */
  constructor(
    private forecastWeather: ForecastWeatherService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.url.subscribe(
      params => this.currentRoute =  params[0].path
    );
  }

  // OnInit
  // TODO: get a current location of user and find a weather for
  ngOnInit() {
    this.getWeather();
  }

  // get a forecast when user enter a city's city
  // and weather data where obtained by service
  getWeather() {
    this.forecastWeather.getWeather$()
      .subscribe(
        weather => this.buildChart(weather)
      );
  }

  /**
  * Build chart on obtained data
  */
  buildChart(weather: Weather[]) {
    let chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exortEnabled: true,
      axisX: {
        title: 'Date'
      },
      axisY: {
        title: this.getAxisYTitle()
      },
      data: [{
        type: this.getChartType(),
        lineColor: this.getLineColor(),
        dataPoints: weather.map(point => new DataPoint(point.dt, this.getY(point), this.getLineColor()))
      }]
    });
    chart.render();
  }

  /**
  * Change chart title according the current route
  */
  private getAxisYTitle(): string {
    switch (this.currentRoute) {
      case 'temp': {
        return 'Temperature';
      }
      case 'min_temp': {
        return 'Minimal Temperature';
      }
      case 'max_temp': {
        return 'Maximal Temperature';
      }
      case 'pressure': {
        return 'Pressure';
      }
      case 'humidity': {
        return 'Humidity';
      }
    }
  }

  /**
  * Returns DataPoint with y-values according the current route
  */
  private getY(point): number {
    switch (this.currentRoute) {
      case '':
      case 'temp': {
        return point.temp;
      }
      case 'temp_min': {
        return point.temp_min;
      }
      case 'temp_max': {
        return point.temp_max;
      }
      case 'pressure': {
        return point.pressure;
      }
      case 'humidity': {
        return point.humidity;
      }
    }
  }

  /**
  * Returns line color according the route
  */

  private getLineColor(): number {
    switch (this.currentRoute) {
      case '':
      case 'temp': {
        return "#186";
      }
      case 'temp_min': {
        return "#456";
      }
      case 'temp_max': {
        return "#812";
      }
      case 'pressure': {
        return "#147";
      }
      case 'humidity': {
        return "#167";
      }

    }
  }

  /**
  * Returns chart type
  */
  private getChartType() {
    switch (this.currentRoute) {
      case '':
      case 'temp':
      case 'temp_min':
      case 'temp_max': {
        return "line";
      }
      case 'pressure':
      case 'humidity': {
        return "column";
      }
    }
  }


}
