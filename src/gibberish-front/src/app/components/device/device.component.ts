import { Component, OnInit } from '@angular/core';
import { faUtensils, faShoppingBasket, faHandsHelping, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'


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

  constructor() { }

  ngOnInit(): void {
    document.getElementById('navbar').classList.add('d-none');
  }

}
