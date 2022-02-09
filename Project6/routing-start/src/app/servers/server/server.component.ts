import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,private route:ActivatedRoute,
    private router:Router) {

   }

  ngOnInit() {
   this.route.data.subscribe((data:Data)=> {
    this.server = data["server"];
   });
    // console.log(this.route.snapshot.params["id"]);
    // let id:number = parseInt(this.route.snapshot.params["id"]);
    // this.server = this.serversService.getServer(id);

    //   console.log(this.server);

    // this.route.params.subscribe((params:Params)=>{
    //   id = parseInt(params["id"]);
    //   this.server = this.serversService.getServer(id);
    // })
  }

  onEdit() {
    this.router.navigate(["/servers",this.server.id,"edit"],{queryParamsHandling:"preserve"});
  }

}
