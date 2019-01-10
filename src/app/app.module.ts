import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ForcastWeatherCardComponent } from './weather-card/forcast-weather-card/forcast-weather-card.component';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {environment} from '../environments/environment';



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
    // AngularFireModule.initializeApp(environment.firebase, 'WeatherByDegys'),
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireAuthModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
