import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import {MaterialAppModule} from '../ngmaterial.module';
import {ReactiveFormsModule} from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AuthService} from '../core/auth.service';

@NgModule({
  declarations: [UserLoginComponent, UserProfileComponent],
  providers:[AuthService],
  imports: [
    CommonModule,
    MaterialAppModule,
    ReactiveFormsModule,
  ],
  exports:[UserLoginComponent, UserProfileComponent]
})
export class UiModule { }
