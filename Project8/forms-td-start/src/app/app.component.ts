import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
@ViewChild('f') signupform:NgForm;
defaultQuestion:string = "teacher";
answer:string="";
genders:string[] = ['male','female'];
formsubmitted:boolean = false;

user = {
  username:'',
  email:'',
  secretQuestions:'',
  answer:'',
  gender:''
}

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupform.setValue({
    //   userData : {
    //     username:suggestedName,
    //     email : ''
    //   },
    //   secret:'pet',
    //   questionAnswer:'',
    //   gender:'male'
    // })
    this.signupform.form.patchValue({
      userData: {
        username:suggestedName
      }
    })
  }

  // onSubmit(form:NgForm) {
  //   console.log(form)
  // }

  onSubmit() {
    console.log(this.signupform);

    this.formsubmitted = true;
    this.user.username = this.signupform.value.userData.username;
    this.user.email = this.signupform.value.userData.email;
    this.user.secretQuestions = this.signupform.value.secret;
    this.user.answer = this.signupform.value.questionAnswer;
    this.user.gender = this.signupform.value.gender;

    this.signupform.reset();
  }
}
