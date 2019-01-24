import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {IUser} from './user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {auth} from 'firebase';



@Injectable()
export class AuthService {
  user: Observable<IUser | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // localStorage.setItem('user', JSON.stringify(user));
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {return of(null)}
      })
    );

    // this.updateUserFavCities();


  }
  // return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges().pipe(switchMap(data => {
  // return this.afs.doc<IFavCity[]>(`users/${data.uid}/favCities/${data.uid}`).valueChanges().subscribe(favData => {
  // this.currUser = data;
  // this.currUser.favCity = favData[`favCities`];
  // return this.currUser;
  // });
  // });
  
  
  // private updateUserFavCities(){
  //   this.user.subscribe(user => {
  //     if (user) {
  //       this.currUser = user;
  //       this.afs.doc<IFavCity[]>(`users/${this.currUser.uid}/favCities/${this.currUser.uid}`).valueChanges()
  //         .subscribe(favCities => {
  //           if (!favCities['favCities']) {
  //             this.currUser.favCity = [];
  //           }else {
  //             this.currUser.favCity = favCities['favCities'];
  //           }
  //             console.log(this.currUser);
  //
  //         })
  //     }
  //   }
  //     )
  //   }


  //  Auth Methods //

  public googleLogin(){
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  public facebookLogin(){
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  public signOut(){
    this.afAuth.auth.signOut().then(() => {
      console.log('SIGNOUT!!!');
      console.log(this.user)
      this.router.navigate(['/']);
    });
  }




  private oAuthLogin(provider: any){
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        console.log('Welcome to WeatherByDegys!!!');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  // public addFavCity(uid: string, city: IFavCity) {
  //   console.log(this.currUser);
  //
  //   const userRefFavCities = this.afs.doc(`users/${uid}/favCities/${uid}`);
  //   console.log(city);
  //
  //
  //   // if (!this.currUser.favCity){
  //   //   this.currUser.favCity  = [].concat(city);
  //   // }else {
  //     this.currUser.subscribe(user => {
  //       user.favCity.push(city);
  //       console.log(user);
  //       return userRefFavCities.set({ favCities: user.favCity});
  //     })
  // }



  private handleError(err: Error){
    console.log(err);
  }

  private updateUserData(user: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);

  const data: IUser = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || 'user name',
    photoURL: user.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIfMLw1MOz84I_ySvxyLSaKUoATrd30bkNuhn43A84xA2tsryV',
  };
  console.log(data);
  return userRef.set(data).catch(err => this.handleError(err));
  }

}
