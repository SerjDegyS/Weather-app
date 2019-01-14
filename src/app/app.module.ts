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
import {FavoritesComponent} from './favorites/favorites/favorites.component';
import {FavoritesModule} from './favorites/favorites.module';
import {WeatherCardModule} from './weather-card/weather-card.module';
import {WeatherService} from './services/weather.service';
import {UserService} from './services/user.service';



//определение маршрутов
const appRoutes: Routes = [
  {path: '', component: WeatherCardComponent},
  {path: 'forecast', component: ForcastWeatherCardComponent},
  {path: 'favorites', component: FavoritesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    WeatherCardModule,
    FavoritesModule,
    RouterModule.forRoot(appRoutes)
    // AngularFireModule.initializeApp(environment.firebase, 'WeatherByDegys'),
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireAuthModule

  ],
  providers: [WeatherService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
