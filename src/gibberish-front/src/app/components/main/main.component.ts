import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { UserService } from '../../service/user.service';
import { User } from '../../classes/user';
import { Provider } from '../../classes/provider';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tasks: any[];
  user:User;
  provider:Provider;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router,
  ) { }

  public getTasks(){
    this.taskService.getAllTasks((data)=>{
      this.tasks=data;
      console.log(this.tasks);
    });
  }

  getUserData(){
    this.user=new User();
    this.userService.getAllData(this.jwtService.getData().id, data=>{
      this.user.name=data.name;
      this.user.surname=data.surname;
      this.user.user_type=(data.user_type=='client') ? 'customer' : data.user_type;
      this.user.phone=data.phone;
      this.user.email=data.email;
      this.user.address=data.address;

      if (this.user.user_type=='worker' || this.user.user_type=='provider'){
        this.taskService.getAllTasks((data)=>{
          this.tasks=data;
        });
      }
      this.getProviderData();
    });
  }

  getProviderData(){
      this.provider=new Provider();
      if (this.user.user_type=='provider'){
        this.taskService.getProvider('0',(data)=>{
          this.provider.address=data.address;
          this.provider.email=data.email;
          this.provider.location=data.location;
          this.provider.name=data.name;
          this.provider.phone=data.phone;
          this.provider.website=data.website;
        });
      }
  }

  acceptTask(idTask){
    this.taskService.applyForTask(idTask, this.jwtService.getData().id, ()=>{this.router.navigateByUrl('/main')}, ()=>{});
  }

  ngOnInit(): void {
    this.getUserData();
  }

}
