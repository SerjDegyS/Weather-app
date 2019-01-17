import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeatherCardComponent} from './weather-card.component';
import {ForcastWeatherCardComponent} from './forcast-weather-card/forcast-weather-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [WeatherCardComponent, ForcastWeatherCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WeatherCardModule { }
