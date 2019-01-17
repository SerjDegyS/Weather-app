import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeatherCardModule} from './weather-card/weather-card.module';
import {FavoritesModule} from './favorites/favorites.module';
import {WeatherService} from './services/weather.service';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WeatherCardModule,
    FavoritesModule
  ],
  providers: [WeatherService, UserService]
})
export class WeatherModule { }
