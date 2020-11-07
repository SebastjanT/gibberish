import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../service/user.service';
import { User } from '../../classes/user';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user:User;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

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
        this.user.name=data.user.name;
        this.user.surname=data.user.surname;
        this.user.type=data.user.type;
      });
    }
  }

  ngOnInit(): void {
    this.getUserData();
    console.log(this.user.type);
  }

}
