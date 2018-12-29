import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {Pod, TempUnits} from '../model/Weathers.enum';
import {WeatherCardCity} from '../model/WeatherCardCity.class';
import {IWeatherItemShort} from '../model/IWeather-item.interface';
import {nextContext} from '@angular/core/src/render3';
import {IWeatherDayNight} from '../model/IWeatherCity.interface';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getCurrentWeatherCardByCity(): Observable<WeatherCardCity<IWeatherItemShort>> {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=kiev&units=metric&APPID=d7068ea79439a1c4e4435f942b417139')
      .pipe(map(data => {
        let city = {
          id: data['id'],
          name: data['name'],
          country: data['sys'].country,
          coord: {
            lat: data['coord'].lat,
            lon: data['coord'].lon
          }
        };
        // console.log(city);
        let weather: IWeatherItemShort = {
          date: new Date(data['dt'] * 1000),
          temp: Math.round(data['main'].temp),
          tempMin: Math.round(data['main'].temp_min),
          tempMax: Math.round(data['main'].temp_max),
          windSpeed: data['wind'].speed,
          condition: data['weather'][0].main,
          icon: data['weather'][0].icon + '.png',
          pod: (data['dt'] === 'n') ? Pod.Day : Pod.Night
        };
        // console.log(weather);
        let rez = new WeatherCardCity(city, TempUnits.Celsius);
        rez.current = weather;
        return rez;
      }));

  }

  getForcastWeatherByCityCard(cityCard: WeatherCardCity<IWeatherItemShort>): Observable<IWeatherItemShort[]> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityCard.getCity().id}&units=metric&APPID=d7068ea79439a1c4e4435f942b417139`)
      .pipe( map(data => data['list']
          .map((wi) => {
            return {
              date: new Date(wi.dt * 1000),
              temp: Math.round(wi.main.temp),
              tempMin: Math.round(wi.main.temp_max),
              tempMax: Math.round(wi.main.temp_min),
              windSpeed: Math.round(wi.wind.speed),
              condition: wi.weather[0].main,
              icon: wi.weather[0].icon + '.png',
              pod: (wi.sys.pod === 'n') ? Pod.Day : Pod.Night
            };
          })
      )
      )
  }
}
