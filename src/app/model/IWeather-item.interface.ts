import {Pod, TempUnits} from './Weathers.enum';

export interface IWeatherItemShort {
  date: Date;
  temp: number;
  tempMin: number;
  tempMax: number;
  windSpeed: number;
  condition: string;
  icon: string;
  pod: Pod;
}


export interface IWeatherItemFull extends IWeatherItemShort {

  pressure: number;
  humidity: number;
  seaLevel?: number;
  grndLevel?: number;
  description: string;
}

