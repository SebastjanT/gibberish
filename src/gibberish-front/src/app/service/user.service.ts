import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllData(id, callback){
    this.httpClient.get(`http://awseb-awseb-1qbqaq27at9fe-1327949958.eu-central-1.elb.amazonaws.com/api/users/${id}`).subscribe(
      (data)=>{
        callback(data);
      },
      (error)=>{
        console.log("There was a fucky wucky in the get request: "+error.statusText);
      }
    );
    
    //Dummy call
    /*if (idUser==="1"){
      callback({user: {name: 'Test', surname: "Worker", user_type: "worker"}});
    }
    else if(idUser==="2"){
      callback({user: {name: 'Test', surname: "Provider", user_type: "provider"}});
    }
    else{
      callback({user: {name: 'Test', surname: "Customer", user_type: "customer"}});
    }*/
  }
}
