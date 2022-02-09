import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {
  user: {id: number, name: string};

  paramSubsciption : Subscription
  constructor(private route:ActivatedRoute) { 

  }

  ngOnInit() {
    this.user = {
      id : this.route.snapshot.params["id"],
      name : this.route.snapshot.params["name"]
    }

    this.paramSubsciption =  this.route.params.subscribe((params:Params)=>{
      this.user.id = params["id"];
      this.user.name = params["name"];
    },)
    
  }

  ngOnDestroy(): void {
    this.paramSubsciption.unsubscribe();
  }

}
