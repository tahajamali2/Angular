import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

Injectable({providedIn:"root"})
export class UserService{

    constructor() {

    }

    public users:User[] = [
        {ID:1,userName:"Taha",status:true},
        {ID:2,userName:"Muhammad",status:true},
        {ID:3,userName:"Aon",status:true},
        {ID:4,userName:"Akbar",status:true},
        {ID:5,userName:"Hussain",status:false},
        {ID:6,userName:"Abbas",status:false},
        {ID:7,userName:"Ali",status:false},
        {ID:8,userName:"Hamza",status:false},
    ];

    public activeToinActiveCount:number = 0;
    public inActiveToactiveCount:number = 0;

    public setStatusToinactive(id:number) {
        this.users[this.users.indexOf(this.users.filter((element,index,array)=>{return element.ID===id})[0])].status=false;
        this.activeToinActiveCount+=1;
    }

    public setStatusToactive(id:number) {
        this.users[this.users.indexOf(this.users.filter((element,index,array)=>{return element.ID===id})[0])].status=true;
        this.inActiveToactiveCount+=1;
    }
    public getActiveUsers() : User[] {
        return this.users.filter((element,index,array)=>{return element.status===true});
    }

    public getInactiveUsers() : User[] {
        return this.users.filter((element,index,array)=>{return element.status===false});
    }
}