import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { NameSurnameService } from '../../service/name-surname.service'
import { UserService } from '../../service/user.service';
import { User } from '../../classes/user';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  closeInfo:string='';
  nameSurname:string;
  faUser=faUser;
  faUsers=faUsers;
  user:User;

  constructor(
    private modalService: NgbModal,
    private nameSurnameService: NameSurnameService,
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router,
  ) { }

  onLogout(content){
    //Logout jwt
    this.jwtService.logout();
    content.close('Logout click');
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-global-message'}).result.then((result) => {
      this.closeInfo=`Closed with: ${result}`;
    }, (reason) =>{
      this.closeInfo=`Dissmissed`;
    });
  }

  loggedIn(): boolean{
    //Check the jwt if logged it
    return this.jwtService.isLoggedIn();
  }

  getUserData(){
    //Check if logged in, and get data
    if (this.loggedIn()){
      //Set the appropriate data
      this.user=new User();
      this.userService.getAllData(this.jwtService.getData().id, data=>{
        this.user.name=data.name;
        this.user.surname=data.surname;
        this.user.user_type=(data.user_type=='client') ? 'customer' : data.user_type;
        this.user.phone=data.phone;
        this.user.email=data.email;
        this.user.address=data.address;
        this.nameSurnameService.changeMessage(`${this.user.name} ${this.user.surname}`);
        this.router.navigateByUrl('/main');
      });
    }
    else{
      this.user=new User();
    }
  }


  ngOnInit(): void {
    this.getUserData();
    this.nameSurnameService.currMessage.subscribe(message => this.nameSurname = message);
  }

}
