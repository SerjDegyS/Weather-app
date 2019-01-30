import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {IFavCity, IUser} from '../../core/user.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../../core/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class FavoriteCitiesService implements OnInit {

  favCitiesCollection: AngularFirestoreCollection<any>;
  currUser: IUser;
  userFavCities: IFavCity[] = [];

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.user.subscribe(user => {
      this.currUser = user;
      this.getFavCities().subscribe( favCities => this.userFavCities = favCities);
      //  set document fo user on firebase data\\
      this.favCitiesCollection = this.afs.collection('userFavCities');
    });
  }

  ngOnInit(): void {
  }

  getFavCities(): Observable<IFavCity[]> {
    return this.afs.doc<IFavCity[]>(`userFavCities/${this.currUser.uid}`).valueChanges().pipe(map(favData => {
      return (favData) ? this.userFavCities = favData['favCities'] : [];
    }));
  }

  addFavCities(newFavCity: IFavCity) {
    this.afs.doc<any>(`userFavCities/${this.currUser.uid}`).set({favCities: this.userFavCities.concat(newFavCity)});
  }


  removeFavCity(remFavCity: IFavCity) {
    for (let i = 0; i < this.userFavCities.length; i++) {
      if (this.userFavCities[i].id === remFavCity.id) {
        this.userFavCities.splice(i, 1);
        console.log(this.userFavCities);
      }
    }
    // console.log(remFavCity)
    this.afs.doc<any>(`userFavCities/${this.currUser.uid}`).set({favCities: this.userFavCities});

  }
}
