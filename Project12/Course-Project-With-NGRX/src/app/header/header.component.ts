import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {  Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from "../store/app.reducer";
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private dataStorage: DataStorageService,private authService:AuthService,private store:Store<fromApp.AppState>) {}

  isAuthenticated = false;
  userSub:Subscription;

  @Output('navclicked') navClicked = new EventEmitter<number>();
  onNavClick(navid: number) {
    this.navClicked.emit(navid);
  }

  ngOnInit(): void {
    this.userSub=this.store.select('auth').pipe(map(authState=>{return authState.user})).subscribe(user=> {
      this.isAuthenticated = !!user;
      })
  }

  onSaveData() {
      //this.dataStorage.storeRecipes();
      this.store.dispatch(new RecipesActions.SaveRecipe());
  }

  onFetchData() {
      //this.dataStorage.fetchRecipes();
      this.store.dispatch(new RecipesActions.FetchRecipe())
  }

  onLogout() {
    //this.authService.logOut();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
