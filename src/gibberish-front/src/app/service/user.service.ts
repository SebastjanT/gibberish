import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getAllData(idUser, callback){
    callback({user: {name: 'test', surname: "user"}});
  }
}
