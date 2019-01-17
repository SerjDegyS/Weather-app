export interface IFavCity {
  id: string;
  name: string;
}

export interface IUser {
  setId(id: number);
  setName(name: string);
  setEmail(email: string | null);
  setFavCity(city: IFavCity[] | null);
  setPhotoURL(phUrl: string);
  // setHistory(): any;
}

export class FavUser implements IUser{

  private email: string;
  private _favCity: IFavCity[];
  private _photoUrl: string;

  constructor(private _id: number, private _name: string){};

  setEmail(email: string) {
    this.email = email;
  }


  get _email(): string {
    return this._email;
  }

  get favCity(): IFavCity[] {
    return this._favCity;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  setFavCity(city: IFavCity[]) {
    this._favCity = city;
  }

  setId(id: number) {
    this._id = id;
  }

  setName(name: string) {
    this._name = name;
  }

  setPhotoURL(phUrl: string) {
    this._photoUrl = phUrl;
  }

  get photoUrl(): string {
    return this._photoUrl;
  }

  public updateUsers(name: string, phURL: string, favCity: IFavCity[]){
    this._name = name;
    this._photoUrl = phURL;
    this._favCity = favCity;
  }
}
