import { Component, EventEmitter, Output } from "@angular/core";

@Component({
selector:"app-header",
templateUrl:'./header.component.html'
})
export class HeaderComponent {
@Output('navclicked') navClicked = new EventEmitter<number>();
    onNavClick(navid:number) {
        this.navClicked.emit(navid);
    }
}