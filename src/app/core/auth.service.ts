import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from './user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {auth} from 'firebase';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else { return (null); }
      })
    //  tap...
    );
  }

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

  private handleError(error: Error){
    console.log(error);
  }

  private updateUserData(user: User) {
    const userRef = this.afs.doc(`users/${user.uid}`);

  const data: User = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || 'user name',
    photoURL: user.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIfMLw1MOz84I_ySvxyLSaKUoATrd30bkNuhn43A84xA2tsryV'
  };
  return userRef.set(data);
  }

}
