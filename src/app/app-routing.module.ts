import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/temp', pathMatch: 'full' },
  { path: 'temp', component: ForecastWeatherComponent },
  { path: 'temp_min', component: ForecastWeatherComponent },
  { path: 'temp_max', component: ForecastWeatherComponent },
  { path: 'pressure', component: ForecastWeatherComponent },
  { path: 'humidity', component: ForecastWeatherComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
