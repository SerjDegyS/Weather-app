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
  isOpened: boolean = false;


  constructor(private auth: AuthService){
    this.auth.user.subscribe(user => {
      this.isOpened = (user)? true : false;
      this.user = user;
    });
  }

  ngOnInit(): void {

    // Hidden or show user-menu

    // this.showUserMenuByClick();
    // // JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
    

  }


  showUserMenuByClick(event) {
    this.isOpened = !this.isOpened;
    console.log(event);
    
    


    // const userMenu = document.getElementById('user');
    // const userMenuContent = document.getElementById('user-menu__content');

    // window.addEventListener('click', function (e) {
    //   // console.log(e);
    //   // console.log(e.target['parentNode'].className)
    //   if ((e.target === userMenu || e.target['parentNode'].className === 'user-menu'
    //     || e.target['parentNode'].className === 'user-info-container')) {
    //     // && !userMenuContent.className.includes('user-menu__opened')) {
    //     // if (e.target === userMenu
    //     userMenuContent.classList.add('user-menu__opened');
    //   } else {
    //     userMenuContent.classList.remove('user-menu__opened');
    //   }

    // });
  }

  showedUserMenuAfterAuth(){
    $('.user-menu__content').addClass('user-menu__opened');
  }

  logOut(){
    this.auth.signOut();
  }
}
