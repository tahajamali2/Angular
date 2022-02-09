import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {


  constructor(private userservice:UserService) {
  
   }

  ngOnInit(): void {
  }

  setInactive(id:number) {
    this.userservice.setStatusToinactive(id);
    
  }
}
