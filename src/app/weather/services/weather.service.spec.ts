import { TestBed } from '@angular/core/testing';

import { WeatherHttp} from './weather.service';

describe('Weather.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherHttp = TestBed.get(WeatherHttp);
    expect(service).toBeTruthy();
  });
});
