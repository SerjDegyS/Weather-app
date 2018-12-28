import {TempUnits} from './Weathers.enum';
import {IWeatherCardCity, IWeatherDayNight} from './IWeatherCity.interface';
import {IWeatherItemShort} from './IWeather-item.interface';
import {generate} from 'rxjs';


export class WeatherCardCity<T extends IWeatherItemShort> implements IWeatherCardCity<T> {

  // private city: {
  //   id: number,
  //   name: string,
  //   country: string
  // }
  private _current: T;
  _forcast: T[] = [];

  // private tempUnit: TempUnits;

  constructor(private city: {
                id: number,
                name: string,
                country: string,
                coord: {
                  lat: number,
                  lon: number
                }
              },
              private tempUnit: TempUnits) {
  }

  set forcast(value: T[]) {
    this._forcast = value;
  }

  set current(value: T) {
    this._current = value;
  }

  getCity() {
    return this.city;
  }

  getCurrentWeather(): T {
    return this._current;
  }

  getForcastWeather(): IWeatherDayNight[] {
    // console.log(this._forcast);
    if (this._forcast.length === 0) {
      console.log('return NULL');
      return null;
    } else {

      /*Next day*/
      let nextDate: number = new Date().setDate(new Date().getDate() + 1);
      /*Beginning of the next day*/
      nextDate = new Date(nextDate).setHours(0, 0, 0, 0);

      // console.log(this._forcast);
      console.log(nextDate);
      console.log(this._forcast);


      let forcastToday: T[] = this._forcast.filter((fi) => {
        return fi.date.getTime() < nextDate;
      });
      let forcastNextDays: T[] = this._forcast.filter((fi) => {
        return fi.date.getTime() >= nextDate;
      });
      // console.log(forcastNextDays);
      let forcastDayNight: IWeatherDayNight[] = this.generateDayNightForcast(forcastToday);

      // console.log(this.generateDayNightForcast(forcastNextDays));
      forcastDayNight = forcastDayNight.concat(this.generateDayNightForcast(forcastNextDays));
      console.log(forcastDayNight);

      return forcastDayNight;
    }
  }


  public generateDayNightForcast(forcast: T[]): IWeatherDayNight[] {
    let rez: IWeatherDayNight[] = [];

    // if(forcast.length < 8){
    //   let i = 0;
    // }
    console.log(forcast.length);
    for (let k = 1; k <= forcast.length; k++) {
      if (k % 8 === 0) {
        f(k);

      }
    }

    function f(i: number): void {
      console.log(i);
      let dayNight: T[] = forcast.slice(i - 7, i);
      console.log(dayNight);
      rez.push({
        day: dayNight[0].date,
        tempMax: dayNight.reduce((prev: T, current: T, i: number): T => {
          return (prev.tempMax > current.tempMax) ? prev : current;
        }).tempMax,
        tempMin: dayNight.reduce((prev: T, current: T) => {
          return (prev.tempMin < current.tempMin) ? prev : current;
        }).tempMin,
        condition: dayNight[0].condition,
        icon: dayNight[0].condition
      });
    }
    console.log(rez);
    return rez;
  }


  getTempUnit() {
    return this.tempUnit;
  }
}
