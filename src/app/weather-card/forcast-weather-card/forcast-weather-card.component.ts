import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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
  @Output() dailyForecast = new EventEmitter();
  forcastWeather: IWeatherDayNight[];


  constructor(private weatherHttp: WeatherService) {
  }

  ngOnInit() {
    // console.log(this.weatherCardCity);
    // console.log(this.weatherCardCity.getCurrentWeather().date);
    if (this.weatherCardCity.getForcastWeather()) {
      this.forcastWeather = this.weatherCardCity.getForcastWeather();
      this.dailyForecast.emit(this.forcastWeather[0]);
    } else {
      console.log('getForcast');
      this.weatherHttp.getForcastWeatherByCityCard(this.weatherCardCity).subscribe(data => {
        this.weatherCardCity.forcast = data;
        this.forcastWeather = this.weatherCardCity.getForcastWeather();
        this.dailyForecast.emit(this.forcastWeather[0]);
      });
    }

    
  }
public showForecast(weather){
  this.dailyForecast.emit(weather);
  console.log(weather);
  
}
}
