import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UserService {

  constructor(private http: HttpClient, ) {}

  getFavoritesCity(id: string){
    return this.http.get('../assets/favCity.json');
  }
}
