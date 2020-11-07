import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private JWT;
  private cookieName='theres-no-cookies-here';

  constructor(
    private cookieService: CookieService,
  ) { }

  public register({email, password}, success, failure){
    //Trigger the login request to the api

    //Dummy register
    success();
  }

  public login({email, password}, success, failure){
    //Trigger the login request to the api

    //Dummy login
    this.saveJwt('aoeuaoeu."id":"0".aoeuaoeuueo');
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
      return ({id: 1});
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
