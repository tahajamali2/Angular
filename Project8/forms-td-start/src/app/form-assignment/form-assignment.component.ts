import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-assignment',
  templateUrl: './form-assignment.component.html',
  styleUrls: ['./form-assignment.component.css']
})
export class FormAssignmentComponent implements OnInit {

  @ViewChild('af') customform:NgForm;

  defaultSubs:string = "advanced";
  formsubmitted:boolean = false;
  formData = {
    email : '',
    subscription : '',
    password : ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formData.email = this.customform.value.email;
    this.formData.password = this.customform.value.password;
    this.formData.subscription = this.customform.value.subscriptions;

    this.formsubmitted = true;
    console.log(this.formData);
  }

}
