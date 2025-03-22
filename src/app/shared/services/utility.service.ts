import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getTodayDDMMYYYYHHMM(){
    let today = new Date();
    let month = this.appendZero(today.getMonth() + 1);
    
    return today.getDate()+''+month+''+today.getFullYear()+''+ today.getHours()+''+today.getMinutes();
  }

  convertTodayTostr(date?:any) {
    let temp = (date)?new Date(date):new Date();
    let month = this.appendZero(temp.getMonth() + 1);
    return temp.getFullYear() + '-' + month + '-' + this.appendZero(temp.getDate());
  }
  convertTodayTostrDDMMYYYY(date?:any) {
    let temp = (date)?new Date(date):new Date();
    let month = this.appendZero(temp.getMonth() + 1);
    return this.appendZero(temp.getDate()) + '-' + month + '-' + temp.getFullYear();
  }
  appendZero(value: any) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  }

  convertDate(test_date: any) {
    return  this.convertTodayTostr(test_date);     
   }  

   getAge(dateString:string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


}
