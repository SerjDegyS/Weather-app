import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherCardComponent } from './weather/weather-card/weather-card.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ForcastWeatherCardComponent } from './weather/weather-card/forcast-weather-card/forcast-weather-card.component';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {FavoritesComponent} from './weather/favorites/favorites.component';
import {FavoritesModule} from './weather/favorites/favorites.module';
import {WeatherCardModule} from './weather/weather-card/weather-card.module';
import {WeatherService} from './weather/services/weather.service';
import {UserService} from './weather/services/user.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialAppModule} from './ngmaterial.module';
import {AuthService} from './core/auth.service';
import {UiModule} from './ui/ui.module';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialAppModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    WeatherCardModule,
    FavoritesModule,
    UiModule,
    AngularFireModule.initializeApp(environment.firebase, 'WeatherByDegys'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
