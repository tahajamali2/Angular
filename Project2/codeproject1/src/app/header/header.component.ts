import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private dataStorage: DataStorageService,private authService:AuthService) {}

  isAuthenticated = false;
  userSub:Subscription;

  @Output('navclicked') navClicked = new EventEmitter<number>();
  onNavClick(navid: number) {
    this.navClicked.emit(navid);
  }

  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=> {
      this.isAuthenticated = !!user;
      })
  }

  onSaveData() {
      this.dataStorage.storeRecipes();
  }

  onFetchData() {
      this.dataStorage.fetchRecipes();
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
