import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observable, Observable, pipe, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Pod, TempUnits} from '../model/Weathers.enum';
import {WeatherCardCity} from '../model/WeatherCardCity.class';
import {IWeatherItemCurrent, IWeatherItemForecast} from '../model/IWeather-item.interface';
import {nextContext} from '@angular/core/src/render3';
import {IWeatherDayNight} from '../model/IWeatherCity.interface';
import {UrlsConst} from './urls.const';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getCurrentWeatherCardByCity(city: string): Observable<WeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>> {
  return this.weatherCardBuild(this.http.get(UrlsConst.weatherByCityName(city)));
  }

  getCurrentWeatherCardByPosition(position: {lat: number, lng: number}): Observable<WeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>> {
    return this.weatherCardBuild(this.http.get(UrlsConst.weatherByPosition(position.lat.toString(), position.lng.toString())));
  }

  getCurrentWeatherByCitesGroup(groupId: string): Observable<any> {
    return new Observable(obs => this.http.get(UrlsConst.weatherByAllCitesId(groupId))
      .pipe(map(data => data['list'])).subscribe((data) => {
        data.map(city => {
          this.weatherCardBuild(new Observable(ob => ob.next(city)))});
        obs.next(data);
      }));
  }




  getForcastWeatherByCityCard(cityCard: WeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>): Observable<WeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>> {
    return new Observable( obs => this.http.get(UrlsConst.forecastByCityId(cityCard.getCity().id.toString()))
      .pipe( map(data => data['list']
          .map((wi): IWeatherItemForecast => {
            return {
              date: new Date(wi.dt * 1000),
              temp: Math.round(wi.main.temp),
              tempMax: Math.round(wi.main.temp_max),
              tempMin: Math.round(wi.main.temp_min),
              pressure: Math.round(wi.main.pressure),
              humidity: Math.round(wi.main.humidity),
              windSpeed: wi.wind.speed,
              condition: wi.weather[0].main,
              description: wi.weather[0].description,
              icon: wi.weather[0].icon + '.png',
              pod: (wi.sys.pod === 'n') ? Pod.Day : Pod.Night
            }
          })
      )
      ).subscribe(data => {
        cityCard.forecast = data;
        obs.next(cityCard);
      }))
    // return new Observable(obs => obs.next(cityCard ));
  }

  private weatherCardBuild(obs: Observable<any>): Observable<WeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>> {
    return obs.pipe(map(data => {
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
      let weather: IWeatherItemCurrent = {
        date: new Date(data['dt'] * 1000),
        temp: Math.round(data['main'].temp),
        tempMin: Math.round(data['main'].temp_min),
        tempMax: Math.round(data['main'].temp_max),
        humidity: +data['main'].hummidity,
        pressure: +data['main'].pressure,
        windSpeed: +data['wind'].speed,
        sunrise: new Date(data['sys'].sunrise * 1000),
        sunset: new Date(data['sys'].sunset * 1000),
        condition: data['weather'][0].main,
        description: data['weather'][0].description,
        icon: data['weather'][0].icon + '.png',
        pod: (data['dt'] === 'n') ? Pod.Day : Pod.Night
      };
      let rez = new WeatherCardCity<IWeatherItemCurrent, IWeatherItemForecast>(city, TempUnits.Celsius);
      // console.log(rez);
      rez.current = weather;
      return rez;
    }));
  }

}
