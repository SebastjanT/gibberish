import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameSurnameService {

  private messageSource=new BehaviorSubject<string>("default");
  currMessage=this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string){
    this.messageSource.next(message);
  }
}
