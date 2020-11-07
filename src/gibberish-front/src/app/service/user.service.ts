import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getAllData(idUser, callback){
    if (idUser==="1"){
      callback({user: {name: 'Test', surname: "Worker", type: "worker"}});
    }
    else if(idUser==="2"){
      callback({user: {name: 'Test', surname: "Provider", type: "provider"}});
    }
    else{
      callback({user: {name: 'Test', surname: "Customer", type: "customer"}});
    }
  }
}
