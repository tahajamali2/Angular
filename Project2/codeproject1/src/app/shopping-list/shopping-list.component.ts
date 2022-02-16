import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[] = [];
  private refreshSubscription:Subscription;
  constructor(private shoppinglistservice:ShoppingListService,private loggingService:LoggingService) { 

  }

  
  ngOnInit(): void {
    this.ingredients = this.shoppinglistservice.getIngredients();

    this.refreshSubscription = this.shoppinglistservice.refreshEvent.subscribe(()=> {
      this.ingredients = this.shoppinglistservice.getIngredients();
    });

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
      this.refreshSubscription.unsubscribe();
  }

  onEditItem(index:number) {
    this.shoppinglistservice.startedEditing.next(index);
  }

}
