import {TempUnits} from './Weathers.enum';
import {IWeatherItemShort} from './IWeather-item.interface';

export interface IWeatherDayNight {
  day: Date;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
}


export interface IWeatherCardCity<T> {

  getCity(): {
    id: number,
    name: string,
    country: string
  }

  getCurrentWeather(): T;

  getForcastWeather(): IWeatherDayNight[];

  // Temperature units
  getTempUnit(): TempUnits;


}
