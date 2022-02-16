import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any) {
    if(value.length === 0) {
      return value;
    }
    return value.split("").reverse().join("");
    
  }

}
