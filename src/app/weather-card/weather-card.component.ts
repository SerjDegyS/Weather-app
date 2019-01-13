import {Component, OnInit, Output, Input} from '@angular/core';
import {Pod, TempUnits} from '../model/Weathers.enum';
import {WeatherCardCity} from '../model/WeatherCardCity.class';
import {IWeatherItemCurrent, IWeatherItemForecast} from '../model/IWeather-item.interface';

import {WeatherService} from '../services/weather.service';
import {IWeatherDayNight} from '../model/IWeatherCity.interface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  providers: [WeatherService]
})
export class WeatherCardComponent implements OnInit {

  weatherCardCity: WeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>;
  currentWeather: IWeatherItemCurrent;
  forcast: IWeatherDayNight[];
  showforcast: boolean = false;
  dailyForecast: IWeatherItemForecast[];
  city: string = 'kiev';
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
            this.city = this.weatherCardCity.getCity().name;
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
    console.log(this.dailyForecast);
  }

  public searchCityWeatherCard(){
    this.showforcast = false;
    console.log('SEARCH!!!')
    this.weatherHttp.getCurrentWeatherCardByCity(this.city).subscribe(data =>{
      this.weatherCardCity = data;
      this.currentWeather = this.weatherCardCity.getCurrentWeather();
    })
  }

  public receiveDailyForecastFromChild(evnt){
    this.dailyForecast = evnt;
    }
}
