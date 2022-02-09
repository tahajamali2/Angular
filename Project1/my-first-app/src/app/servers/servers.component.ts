import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //template: '<app-server></app-server><app-server></app-server>',
  templateUrl:"./servers.component.html",
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testing';
  userName = '';
  serverCreated = false;
  servers = ['Test Server','Test Server2']

  constructor() { 

    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server has been created! Name is "+this.serverName;
  }

  onUpdateServerName(event:Event) {
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  resetUserName() {
    this.userName = '';
  }
}
