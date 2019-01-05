import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseConstService {

  // API key
  private keyWeather: string = 'd5bb2bd186d0447a80000f7dbf63c601';

  constructor() { }

  public getWeatherKey(): string {
    return this.keyWeather;
  }

}
