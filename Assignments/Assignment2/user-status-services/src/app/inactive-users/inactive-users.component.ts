import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {

  constructor(private userservice:UserService) { }

  ngOnInit(): void {
  }

  setActive(id:number) {
    this.userservice.setStatusToactive(id);
    
  }

}
