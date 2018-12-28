import {Component, OnInit} from '@angular/core';
import {Pod, TempUnits} from '../model/Weathers.enum';
import {WeatherCardCity} from '../model/WeatherCardCity.class';
import {IWeatherItemShort} from '../model/IWeather-item.interface';

import {WeatherService} from '../services/weather.service';
import {IWeatherDayNight} from '../model/IWeatherCity.interface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  providers: [WeatherService]
})
export class WeatherCardComponent implements OnInit {

  weatherCardCity: WeatherCardCity<IWeatherItemShort>;
  currentWeather: IWeatherItemShort;
  forcast: IWeatherDayNight[];

  constructor(private weatherHttp: WeatherService) {
  }

  ngOnInit(): void {
    this.weatherHttp.getCurrentWeatherCardByCity().subscribe((data) => {
      // console.log(data);
      this.weatherCardCity = data;
      this.currentWeather = this.weatherCardCity.getCurrentWeather();
      // this.currentWeather = this.weatherCardCity.getCurrentWeather();
      console.log(this.weatherCardCity);
      // }
    });
  }

  public showForcast() {
    console.log(this.weatherCardCity);
  }
}
