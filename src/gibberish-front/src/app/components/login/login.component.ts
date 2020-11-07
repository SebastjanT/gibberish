import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';
import { Login } from '../../classes/login';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NameSurnameService } from '../../service/name-surname.service';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public status:string;
  public minPassLen=8;
  private user:User;
  @ViewChild('statusModal') modalObj;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private jwtService: JwtService,
    private nameSurnameService: NameSurnameService,
    private userService: UserService,
  ) { }

  public loginForm:FormGroup=new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(this.minPassLen)
    ])
  });

  onSuccess(){
    if(this.jwtService.isLoggedIn()){
      this.userService.getAllData(this.jwtService.getData().id, data=>{
        this.nameSurnameService.changeMessage(data.user.name+' '+data.user.surname);
        this.router.navigateByUrl('/main');
      });
    }
  }

  onFailure(message: string){
    this.status=message;
    this.modalService.open(this.modalObj);
  }

  onSubmit=()=>{
    const login:Login=new Login();
    login.email=this.loginForm.get('email').value;
    login.password=this.loginForm.get('password').value;

    this.jwtService.login(login, ()=>this.onSuccess(), (data)=>this.onFailure(data));
    this.loginForm.reset();
  }

  ngOnInit(): void {
    if (this.jwtService.isLoggedIn()){
      this.router.navigateByUrl('/main');
    }
  }

}
