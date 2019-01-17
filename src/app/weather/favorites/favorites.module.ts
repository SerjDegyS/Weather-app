import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import {UserService} from '../services/user.service';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule
  ]
})
export class FavoritesModule { }
