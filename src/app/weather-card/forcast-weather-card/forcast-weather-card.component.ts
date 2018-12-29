import {Component, Input, OnInit} from '@angular/core';
import {IWeatherItemShort} from '../../model/IWeather-item.interface';
import {IWeatherDayNight} from '../../model/IWeatherCity.interface';
import {WeatherCardCity} from '../../model/WeatherCardCity.class';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-forcast-weather-card',
  templateUrl: './forcast-weather-card.component.html',
  styleUrls: ['./forcast-weather-card.component.scss']
})
export class ForcastWeatherCardComponent implements OnInit {
  @Input() weatherCardCity: WeatherCardCity<IWeatherItemShort>;
  forcastWeather: IWeatherDayNight[];

  constructor(private weatherHttp: WeatherService) {
  }

  ngOnInit() {
    // console.log(this.weatherCardCity);
  }

  show(): void {
    // console.log(this.weatherCardCity.getForcastWeather());

    if (this.weatherCardCity.getForcastWeather()) {
      this.forcastWeather = this.weatherCardCity.getForcastWeather();
    } else {
        console.log('getForcast');
      this.weatherHttp.getForcastWeatherByCityCard(this.weatherCardCity).subscribe(data => {
        this.weatherCardCity.forcast = data;
        this.forcastWeather = this.weatherCardCity.getForcastWeather();
        console.log(this.forcastWeather);
      });
    }
  }

  shows(){
    console.log(this.weatherCardCity.getForcastWeather());

  }
}
