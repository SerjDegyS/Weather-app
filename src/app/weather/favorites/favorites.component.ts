import { Component, OnInit } from '@angular/core';
import {IWeatherCardCity, IWeatherDayNight} from '../model/IWeatherCity.interface';
import {IWeatherItemCurrent, IWeatherItemForecast} from '../model/IWeather-item.interface';
import {FormControl} from '@angular/forms';
import {WeatherService} from '../services/weather.service';
import { AuthService } from 'src/app/core/auth.service';
import { IFavCity } from 'src/app/core/user.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  private favsCities: IFavCity[];
  favsCitiesCards: IWeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>[];
  dailyForecast: IWeatherDayNight

  // selectedCity = new FormControl();
  constructor(private userService: AuthService, private weatherService: WeatherService) {
  }

  ngOnInit() {
    /*Get user favorite cities*/
    console.log('Get user favorite cities');
    this.userService.user
      .subscribe(data => {
        this.favsCities = data['favCity'];
        if(this.favsCities.length !== 0){
        let favsCitiesString = this.favsCities.reduce((listId, city) => listId + city.id + ',', '');
        this.weatherService.getCurrentWeatherByCitesGroup(favsCitiesString.slice(0, -1)).subscribe(dat => {
          /*Get forecast weather for cities*/
          console.log('Get forecast for cities');
          this.favsCitiesCards = dat.map(cityCard => {
            this.weatherService.getForcastWeatherByCityCard(cityCard).subscribe(d => cityCard = d);
            console.log(cityCard);
            return cityCard;
          });
        });
      }else this.favsCities = [];
      });
  }

  public stateOfTemperature(cityCard): string {
    return (cityCard.getCurrentWeather().temp <= cityCard.getForcastWeather()[0].fullWeatherDayNight[0].temp) ? 'and rising' : 'and falling';
  }
}
