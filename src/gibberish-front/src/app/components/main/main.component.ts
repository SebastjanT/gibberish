import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../service/user.service';
import { User } from '../../classes/user';
import { JwtService } from '../../service/jwt.service';
import { LayoutComponent } from '../../components/layout/layout.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public layoutComponent: LayoutComponent,
  ) { }

  ngOnInit(): void {
  }

}
