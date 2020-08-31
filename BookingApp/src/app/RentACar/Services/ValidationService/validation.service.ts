import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Car } from 'src/app/Shared/Model/RentACars/Models/Car.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  firstYearValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined || control.value !== ''){
      const year = control.value;
      const yearTo = control.root.get('carYearOfProductionTo');

      if(yearTo){
       
          const yearTo2 = yearTo.value;
          if(parseInt(year) > parseInt(yearTo2)){
            return{
              Errorrr: true
            };
          }
      }
    }

    return null;
  }

  secondYearValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined || control.value !== ''){
      const yearTo = control.value;
      const yearFrom = control.root.get('carYearOfProductionFrom');

      if(yearFrom){
          const yearFrom2 = yearFrom.value;
          
          if(parseInt(yearTo) < parseInt(yearFrom2)){
            return{
              Errorrr: true
            };
          }
      }
    }

    return null;
  }
    firstPriceValidator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined || control.value !== ''){
        const price = control.value;
        const priceTo = control.root.get('carPriceTo');

        if(priceTo){
         
            const price2 = priceTo.value;
            if(parseInt(price) > parseInt(price2)){
              return{
                Error: true
              };
            }
        }
      }

      return null;
    }

    secondPriceValidator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined || control.value !== ''){
        const price = control.value;
        const priceFrom = control.root.get('carPriceFrom');

        if(priceFrom){
            const price2 = priceFrom.value;
            
            if(parseInt(price) < parseInt(price2)){
              return{
                Error: true
              };
            }
        }
      }

      return null;
    }
    secondDateValidator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined || control.value !== ''){
        
        
        var dateTo = new Date(control.value.year,control.value.month -1,control.value.day);
        const dateFrom = control.root.get('modelFrom');

        if(dateFrom){
          const dateFromm = new Date(dateFrom.value.year, dateFrom.value.month - 1, dateFrom.value.day);
            
            if(dateFromm.getTime() > dateTo.getTime()){
              return{
                isError: true
              };
            }
        }
      }

      return null;
    }

    firstDateValidator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined || control.value !== ''){
      
        var dateFrom = new Date(control.value.year,control.value.month -1,control.value.day);
        const dateTo = control.root.get('modelTo');

        if(dateTo){
          const dateToo = new Date(dateTo.value.year, dateTo.value.month - 1, dateTo.value.day);
            
            if(dateToo.getTime() < dateFrom.getTime()){
              return{
                isError: true
              };
            }
        }
      }

      return null;
    }

    
    phoneValidator(control: AbstractControl){

      if(control && control.value !== null || control.value !== undefined){
        const regex = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./]{1}[0-9]{3}[-\s\./]{1}[0-9]{2}[-\s\./]{1}[0-9]{2}$');

        if(!regex.test(control.value)){
          return{
            isError: true
          };
        }
      }
      return null;
  }

    lettersValidator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined){
        const regex = new RegExp('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$');

        if(!regex.test(control.value)){
          return{
            isError: true
          };
        }
      }
      return null;
    }
    letters2Validator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined){
        const regex = new RegExp('^[a-zA-Z]*(([a-zA-Z ])?[a-zA-Z]*)*$');

        if(!regex.test(control.value)){
          return{
            isError: true
          };
        }
      }
      return null;
    }
    passwordValidator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined){
        const repeatedPassword = control.value;

        const passControl = control.root.get('password');

        if(passControl){
          const password = passControl.value;

            if(password !== repeatedPassword || password === ''){
              return{
                isError: true
              };
            }
        }
      }

      return null;
    }

    lettersAndNumbers(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined){
        const regex = new RegExp('^(?:[A-Za-z]*)(?:[A-Za-z0-9 _]*)$');

        if(!regex.test(control.value)){
          return{
            isError: true
          };
        }
      }
      return null;
    
    }

    numbersValidator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined){
        const regex = new RegExp('^[0-9]*$');
  
        if(!regex.test(control.value)){
          return{
            isError: true
          };
        }
      }
      return null;
    }

    yearOfProductionValidator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined){
        const yearOfProductionValue = control.value;
  
        if((yearOfProductionValue !== '' && yearOfProductionValue < 1990) || (yearOfProductionValue !== '' &&  yearOfProductionValue > 2020)){
          return{
            Error: true
          };
        }
      }
      return null;
    }

    percentageValidator(control: AbstractControl){
      if(control && control.value !== null || control.value !== undefined){
        const specialOfferPercentage = control.value;

        if(specialOfferPercentage > 100){
          return{
            Errorr:true
          };
        }
      }
      return null;
    }

    discountDetails(car : Car){
      
    }
}
