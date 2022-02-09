import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class') togglecClass:string = "btn-group";
     toggle:boolean = false;

    @HostListener('click') 
    click(eventData:Event) {
        this.toggle = !this.toggle;
        if(this.toggle) {
            this.togglecClass = "btn-group open";
        }
        else {
            this.togglecClass = "btn-group";
        }
    }
}