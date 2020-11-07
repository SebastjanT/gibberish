import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Register } from '../../classes/register';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public status: string;
  public minPassLen=8;
  @ViewChild('statusModal') modalObj;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private jwtService: JwtService,
  ) { }

  public regForm:FormGroup=new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minPassLen),
    ]),
    tel: new FormControl('', Validators.required),
    type: new FormControl('customer', [
      Validators.required,
      Validators.pattern('^customer|worker|provider'),
    ]),
  });

  onSuccess(){
    this.status="Registration successfull";
    this.modalService.open(this.modalObj).result.then(()=>{
      this.router.navigateByUrl('/login');
    },
    ()=>{
      this.router.navigateByUrl('/login');
    });
  }

  onFailure(data){
    this.status=data;
    this.modalService.open(this.modalObj);
    this.regForm.get('password').reset();
  }

  onSubmit=()=>{
    const register:Register=new Register();
    register.name=this.regForm.get('name').value;
    register.surname=this.regForm.get('surname').value;
    register.email=this.regForm.get('email').value;
    register.password=this.regForm.get('password').value;
    register.tel=this.regForm.get('tel').value;
    register.type=this.regForm.get('type').value;
    this.jwtService.register(register, ()=>this.onSuccess(), (data)=>this.onFailure(data));
  }

  ngOnInit(): void {
    if (this.jwtService.isLoggedIn()){
      this.router.navigateByUrl('/main');
    }
  }

}
