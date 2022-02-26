import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { StartEdit } from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Observable<{ingredients:Ingredient[]}>;
  private refreshSubscription:Subscription;
  constructor(private loggingService:LoggingService,
    private store:Store<fromApp.AppState>) { 

  }

  
  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList")
    // this.ingredients = this.shoppinglistservice.getIngredients();

    // this.refreshSubscription = this.shoppinglistservice.refreshEvent.subscribe(()=> {
    //   this.ingredients = this.shoppinglistservice.getIngredients();
    // });

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
      //this.refreshSubscription.unsubscribe();
  }

  onEditItem(index:number) {
    //this.shoppinglistservice.startedEditing.next(index);
    this.store.dispatch(new StartEdit(index));
  }

}
