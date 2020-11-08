import { Component, OnInit, ViewChild } from '@angular/core';
import { faUtensils, faShoppingBasket, faHandsHelping, faExclamationTriangle, faThumbsUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../service/task.service';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  faUtensils=faUtensils;
  faShoppingBasket=faShoppingBasket;
  faHandsHelping=faHandsHelping;
  faExclamationTriangle=faExclamationTriangle;
  faThumbsUp=faThumbsUp;
  faTimesCircle=faTimesCircle;
  @ViewChild('successModal') modalObjS;
  @ViewChild('failureModal') modalObjF;

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService,
  ) { }

  taskInit(type){
    this.taskService.initTask("0", type, ()=>{this.onSuccess()}, ()=>{this.onFailure()});
  }

  onSuccess(){
    this.modalService.open(this.modalObjS);
    setTimeout(()=>{this.modalService.dismissAll()}, 3000);
  }

  onFailure(){
    this.modalService.open(this.modalObjF);
    setTimeout(()=>{this.modalService.dismissAll()}, 3000);
  }

  ngOnInit(): void {
    document.getElementById('navbar').classList.add('d-none');
  }

}
