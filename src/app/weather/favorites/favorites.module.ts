import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import {UserService} from '../services/user.service';
import { AuthService } from 'src/app/core/auth.service';

@NgModule({
  declarations: [FavoritesComponent],
  providers:[AuthService],
  imports: [
    CommonModule
  ]
})
export class FavoritesModule { }
