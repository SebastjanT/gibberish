import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private headers={headers: {
    'Content-Type': 'application/json',
  }}

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllTasks(callback){
    this.httpClient.get(`http://awseb-awseb-1qbqaq27at9fe-1327949958.eu-central-1.elb.amazonaws.com/api/tasks`).subscribe(
      (data)=>{
        callback(data);
      },
      (error)=>{
        console.log("There was a fucky wucky in the get request: "+error.statusText);
      }
    );
  }

  public initTask(id, initTask, success, failure){
    this.httpClient.post(`http://awseb-awseb-1qbqaq27at9fe-1327949958.eu-central-1.elb.amazonaws.com/api/tasks/${id}`, initTask, this.headers).subscribe(
      ()=>{
        success();
      },
      (error)=>{
        console.log("There was a fucky wucky in the get request: "+error.statusText);
        failure();
      }
    );
  }

  public applyForTask(idTask, idUser, success, failure){
    this.httpClient.post(`http://awseb-awseb-1qbqaq27at9fe-1327949958.eu-central-1.elb.amazonaws.com/api/tasks/update/${idTask}/${idUser}`, '', this.headers).subscribe(
      ()=>{
        success();
      },
      (error)=>{
        console.log("There was a fucky wucky in the get request: "+error.statusText);
        failure();
      }
    );
  }

  public getProvider(id, callback){
    this.httpClient.get(`http://awseb-awseb-1qbqaq27at9fe-1327949958.eu-central-1.elb.amazonaws.com/api/providers/${id}`).subscribe(
      (data)=>{
        callback(data);
      },
      (error)=>{
        console.log("There was a fucky wucky in the get request: "+error.statusText);
      }
    );
  }
  
}
