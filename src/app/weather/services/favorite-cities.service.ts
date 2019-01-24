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
export class FavoriteCitiesService implements OnInit{

  favCitiesCollection: AngularFirestoreCollection<any>;
  currUser: IUser;
  userFavCities: IFavCity[] = [];

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.user.subscribe(user => {
      this.currUser = user;
      //  set document fo user on firebase data\\
      this.favCitiesCollection = this.afs.collection('userFavCities');
    });
  }

  ngOnInit(): void {
  }

  getFavCities(): Observable<IFavCity[]>{
      return this.afs.doc<IFavCity[]>(`userFavCities/${this.currUser.uid}`).valueChanges().pipe(map(favData => {
        return (favData) ? this.userFavCities = favData['favCities'] : [];
      }));
  }

  updateFavCities(newFavCity: IFavCity){
      this.afs.doc<any>(`userFavCities/${this.currUser.uid}`).set({favCities: this.userFavCities.concat(newFavCity)});
  }

  }
