import { Component, OnInit } from '@angular/core';
import {IWeatherCardCity, IWeatherDayNight} from '../model/IWeatherCity.interface';
import {IWeatherItemCurrent, IWeatherItemForecast} from '../model/IWeather-item.interface';
import {FormControl} from '@angular/forms';
import {UserService} from '../services/user.service';
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  private favsCities: any;
  favsCitiesCards: IWeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>[];
  dailyForecast: IWeatherDayNight

  // selectedCity = new FormControl();
  constructor(private userService: UserService, private weatherService: WeatherService) {
  }

  ngOnInit() {
    /*Get user favorite cities*/
    console.log('Get user favorite cities');
    this.userService.getFavoritesCity('1')
      .subscribe(data => {
        this.favsCities = data['list'];
        this.favsCities = this.favsCities.reduce((listId, city) => listId + city.id + ',', '');
        this.weatherService.getCurrentWeatherByCitesGroup(this.favsCities.slice(0, -1)).subscribe(dat => {
          /*Get forecast weather for cities*/
          console.log('Get forecast for cities');
          this.favsCitiesCards = dat.map(cityCard => {
            this.weatherService.getForcastWeatherByCityCard(cityCard).subscribe(d => cityCard = d);
            console.log(cityCard);
            return cityCard;
          });
        });
      });
  }

  public stateOfTemperature(cityCard): string {
    return (cityCard.getCurrentWeather().temp <= cityCard.getForcastWeather()[0].fullWeatherDayNight[0].temp) ? 'and rising' : 'and falling';
  }
}
