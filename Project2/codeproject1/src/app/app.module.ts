import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BlankComponentComponent } from './blank-component/blank-component.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlankComponentComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  //providers:[LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
