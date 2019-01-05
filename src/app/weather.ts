/**
*  Class to present main weather data
*/
export class Weather {
  constructor(
    public name: string, /* city name */
    public dt: Date,
    public temp: number,
    public temp_min: number,
    public temp_max: number,
    public pressure: number,
    public humidity: number,
    public icon: string
  ) {}
}
