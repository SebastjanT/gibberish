import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { HttpClient } from '@angular/common/http';
import { Register } from '../classes/register';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private JWT;
  private cookieName='theres-no-cookies-here';
  private headers={headers: {
    'Content-Type': 'application/json',
  }}

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
  ) { }

  public register(register:Register, success, failure){
    //Trigger the login request to the api
    this.httpClient.post(`http://awseb-awseb-1qbqaq27at9fe-1327949958.eu-central-1.elb.amazonaws.com/api/users/insert`, register, this.headers).subscribe(
      (data)=>{
        success();
      },
      (error)=>{
        failure(error.statusText);
      }
    );

    //Dummy register
    //success();
  }

  public login({email, password}, success, failure){
    //Trigger the login request to the api

    //Dummy login
    if (email==='worker@test.com'){
      this.saveJwt('aoeuaoeu.{"id": "1"}.aoeuaoeuueo');
    }
    else if (email==='provider@test.com'){
      this.saveJwt('aoeuaoeu.{"id": "2"}.aoeuaoeuueo');
    }
    else{
      this.saveJwt('aoeuaoeu.{"id": "0"}.aoeuaoeuueo');
    }

    success();
  }

  public logout(){
    document.cookie=this.cookieName+"; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    this.cookieService.delete(this.cookieName);
  }

  public getData() {
    this.JWT = this.cookieService.get(this.cookieName);
    if(this.JWT) {
      //return JSON.parse(JwtService.b64Utf8(this.JWT.split('.')[1]));
      //Dummy return
      return (JSON.parse(this.JWT.split('.')[1]));
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    return !!this.cookieService.get(this.cookieName);
  }


  private saveJwt(jwt: string) {
    this.cookieService.set(this.cookieName, jwt);
  }

  private static b64Utf8(text: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          atob(text),
          (character: string) => {
            return '%' + ('00' + character.charCodeAt(0).toString(16)).slice(-2);
          }
        )
        .join('')
    );
  }
}
