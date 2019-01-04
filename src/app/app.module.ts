import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ForcastWeatherCardComponent } from './weather-card/forcast-weather-card/forcast-weather-card.component';
import {RouterModule, Routes} from '@angular/router';

//определение маршрутов
const appRoutes: Routes = [
  {path: '', component: WeatherCardComponent},
  {path: 'forcast', component: ForcastWeatherCardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    ForcastWeatherCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
