import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  editmode:boolean = false;
  editedItem:Ingredient;
  @ViewChild("f",{static:false}) slForm:NgForm;
  
editsubscription:Subscription;

  constructor(private store:Store<fromApp.AppState>) 
  { }

  ngOnInit(): void {
    this.editsubscription = this.store.select('shoppingList').subscribe(stateDate=> {
      if(stateDate.editedIngredientIndex > -1) {
        this.editmode = true;
        this.editedItem = stateDate.editedIngredient;
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
      else {
        this.editmode = false;
      }
        
    })
  }

  onSubmit(form:NgForm) {
    const value = form.value;

    if(this.editmode) {

      //this.shoppinglistservice.updateIngredient(this.editedItemIndex,this.editedItem);
      this.store.dispatch(new ShoppingListAction.UpdateIngredient({updatedIngredient:new Ingredient(value.name,value.amount)}));
    }
    else {
    
    //this.shoppinglistservice.addIngredient(value.name,value.amount);
    this.store.dispatch(new ShoppingListAction.AddIngredient(new Ingredient(value.name,value.amount)));
    }

    this.slForm.reset();
    this.editmode = false;
    this.editedItem = null;
  }

  onClear() {
    this.slForm.reset();
    this.editmode = false;
    this.editedItem = null;
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete() {
    //this.shoppinglistservice.deleteIngredeint(this.editedItemIndex);
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editsubscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }
}
