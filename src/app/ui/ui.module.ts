import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import {MaterialAppModule} from '../ngmaterial.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
    MaterialAppModule,
    ReactiveFormsModule
  ]
})
export class UiModule { }
