import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form-assignment',
  templateUrl: './reactive-form-assignment.component.html',
  styleUrls: ['./reactive-form-assignment.component.css']
})
export class ReactiveFormAssignmentComponent implements OnInit {

  assignmentForm:FormGroup;
  forbiddenProjectNamesSimple=['Test','TestSimple'];
  forbiddenProjectNamesAsync=['TestAsync'];

  projectStatuses:string[] = ['Stable','Critical','Finished'];
  constructor() { }

  ngOnInit(): void {
    this.assignmentForm = new FormGroup({
        projectname:new FormControl(null,[Validators.required,this.notAllowedProjectNameSimple.bind(this)],this.notAllowedProjectNameAsync.bind(this)),
        email:new FormControl(null,[Validators.required,Validators.email]),
      status:new FormControl('Critical')
  })
  }

  notAllowedProjectNameSimple(control:FormControl):{[s:string]:boolean} {
    if(this.forbiddenProjectNamesSimple.indexOf(control.value) !== -1) {
      return {'nameNotAllowed':true};
    }
    return null;
  }

  notAllowedProjectNameAsync(control:FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve,reject)=> {
      setTimeout(()=>{
        if(this.forbiddenProjectNamesAsync.indexOf(control.value) !== -1) {
          resolve({'nameNotAllowedAsync':true});
        }
        else {
          resolve(null);
        }
      },1500);
    });

    return promise;
  }

  onSubmit() {
    console.log(this.assignmentForm);
  }

}
