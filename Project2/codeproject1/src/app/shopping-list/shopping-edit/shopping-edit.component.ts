import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  editmode:boolean = false;
  editedItemIndex:number ;
  editedItem:Ingredient;
  @ViewChild("f",{static:false}) slForm:NgForm;
  
editsubscription:Subscription;

  constructor(private shoppinglistservice:ShoppingListService) 
  { }

  ngOnInit(): void {
    this.editsubscription = this.shoppinglistservice.startedEditing.subscribe((num:number)=> {
        this.editmode = true;
        this.editedItemIndex = num;
        this.editedItem = this.shoppinglistservice.getIngredient(this.editedItemIndex);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
    })
  }

  onSubmit(form:NgForm) {
    const value = form.value;

    if(this.editmode) {
      this.editedItem.name = value.name;
      this.editedItem.amount = value.amount;

      this.shoppinglistservice.updateIngredient(this.editedItemIndex,this.editedItem);
    }
    else {
    
    this.shoppinglistservice.addIngredient(value.name,value.amount);
    }

    this.slForm.reset();
    this.editmode = false;
    this.editedItem = null;
    this.editedItemIndex = -1;
  }

  onClear() {
    this.slForm.reset();
    this.editmode = false;
    this.editedItem = null;
    this.editedItemIndex = -1;
  }

  onDelete() {
    this.shoppinglistservice.deleteIngredeint(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editsubscription.unsubscribe();
  }
}
