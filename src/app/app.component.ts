import { Component, OnInit } from '@angular/core';
import {logger} from 'codelyzer/util/logger';
import { AuthService } from './core/auth.service';
import { IUser } from './core/user.model';
import { startWith } from 'rxjs/operators';
import { auth } from 'firebase';
declare var jquery: any;
declare var $: any;





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WeatherByDegys';
  user: IUser; 


  constructor(private auth: AuthService){
    this.auth.user.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    // Hidden or show user-menu
    this.ShowUserMenu();
    // JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    

  }


  ShowUserMenu() {
    $(document).mouseup(function (e) {
      const userMenu = $('.user');
      const userMenuContent = $('.user-menu__content');
      // console.log(e);
      if (userMenu.is(e.target) && !userMenuContent.hasClass('user-menu__opened')
        || $('.user-menu__content').has(e.target).length !== 0) {
        console.log(e);
        userMenuContent.addClass('user-menu__opened');
      } else {
        userMenuContent.removeClass('user-menu__opened');
      }
    });
  };

  signOut(){
    this.auth.signOut();
  }
}
