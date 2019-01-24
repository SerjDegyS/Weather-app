import {Component, OnInit, Output, Input} from '@angular/core';
import {Pod, TempUnits} from '../model/Weathers.enum';
import {WeatherCardCity} from '../model/WeatherCardCity.class';
import {IWeatherItemCurrent, IWeatherItemForecast} from '../model/IWeather-item.interface';

import {WeatherService} from '../services/weather.service';
import {IWeatherCardCity, IWeatherDayNight} from '../model/IWeatherCity.interface';
import {IUser} from '../../core/user.model';
import {AuthService} from '../../core/auth.service';
import {FavoriteCitiesService} from '../services/favorite-cities.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  providers: [WeatherService, AuthService]
})
export class WeatherCardComponent implements OnInit {

  weatherCardCity: IWeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>;
  currentWeather: IWeatherItemCurrent;
  user: IUser;
  showforcast: boolean = false;
  @Output() dailyForecast: IWeatherItemForecast[];
  city: string = 'kiev';
  private currentPosition: {
    lat: number,
    lng: number,
  };


  constructor(private weatherHttp: WeatherService, private userService: AuthService, private favCitiesService: FavoriteCitiesService) {
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

    this.userService.user.subscribe(user => {
      this.user = user
      console.log(this.user);
    });
  }

  public searchCityWeatherCard(){
    this.showforcast = false;
    console.log('SEARCH!!!')
    this.weatherHttp.getCurrentWeatherCardByCity(this.city).subscribe(data =>{
      this.weatherCardCity = data;
      this.currentWeather = this.weatherCardCity.getCurrentWeather();
      console.log(this.weatherCardCity);
    })
  }

  public receiveDailyForecastFromChild(evnt){
    this.dailyForecast = evnt;
    console.log(evnt)
    }

  public addCityToFav(city: IWeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>){
    const newFavCity = {
      id: city.getCity().id,
      name: city.getCity().name
    }
    this.favCitiesService.updateFavCities(newFavCity);
  }
}
