import { Component, OnInit } from '@angular/core';
import {logger} from 'codelyzer/util/logger';
declare var jquery: any;
declare var $: any;





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WeatherByDegys';

  ngOnInit(): void {
    // Hidden or show user-menu
    this.ShowUserMenu();


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
}
