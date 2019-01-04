import {Component, OnInit, Output} from '@angular/core';
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
  showforcast: boolean = false;
  private city: string = 'kiev';
  private currentPosition: {
    lat: number,
    lng: number,
  };

  constructor(private weatherHttp: WeatherService) {
  }

  ngOnInit(): void {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          this.currentPosition = {
            lat: position.coords.latitude,
            lng: +position.coords.longitude
          }
          console.log(this.currentPosition);
          console.log(position.coords.accuracy);
          this.weatherHttp.getCurrentWeatherCardByPosition(this.currentPosition).subscribe(data => {
            console.log(data);
            this.weatherCardCity = data;
            this.currentWeather = this.weatherCardCity.getCurrentWeather();
          });
        },
        error => {
          alert(error.message + '. Please turn on you geolocation!');
          this.weatherHttp.getCurrentWeatherCardByCity(this.city).subscribe(data => {
            this.weatherCardCity = data;
            this.currentWeather = this.weatherCardCity.getCurrentWeather();
          })
        }
      )}else {
      this.weatherHttp.getCurrentWeatherCardByCity(this.city).subscribe(data => {
        this.weatherCardCity = data;
        this.currentWeather = this.weatherCardCity.getCurrentWeather();
      })
    }
    // this.weatherHttp.getCurrentWeatherCardByCity(this.city).subscribe((data) => {
    //   // console.log(data);
    //   this.weatherCardCity = data;
    //   this.currentWeather = this.weatherCardCity.getCurrentWeather();
    //   // this.currentWeather = this.weatherCardCity.getCurrentWeather();
    //   console.log(this.weatherCardCity);
    //   // }
    // });
  }

  public showForcast() {
    // this.showForcast() = !this.showForcast();
  }
}
