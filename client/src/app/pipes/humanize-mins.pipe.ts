import { Pipe, PipeTransform } from '@angular/core';
// import { MomentModule } from 'angular2-moment';

@Pipe({name: 'humanize'})
export class MinutesConversionPipe implements PipeTransform {

  constructor() {}

  transform(minutes: number): string {
       // return moment.duration(time, "minutes").humanize();
       // let min = parseInt(minutes);
       if(!minutes || minutes < 0){
         return "";
       }
       let hours = Math.floor(minutes / 60);
       let remainingMinutes = minutes % 60;
       if(hours == 0){
          return remainingMinutes+" mins ";
       }else{
         if(remainingMinutes == 0){
           return hours + " hours";
         }else{
           return hours + " hours " + remainingMinutes+" mins ";
         }
       }

  }
}
