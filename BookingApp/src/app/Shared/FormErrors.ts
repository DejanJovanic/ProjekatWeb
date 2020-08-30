
import { InjectionToken } from '@angular/core';


export const defaultErrors = {
  required: (error) => `This field is required`,
  minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`,
  min: ({min,actual}) => `Has to be >= ${min}`,
  max: ({max,actual}) => `Has to be >= ${max}`,
  emptyString : ({isEmpty}) => `Needs to have atleats one letter`,
  wholeNumber : ({isWholeNumber}) => `Only integers are allowed`,
  decimalNumber : ({isdecimalNumber}) => `Only decimal numbers are allowed`,
  name : ({invalidName}) => `Only letters, ' , - and spaces are allowed`,
  passport : ({invalidPassport}) => `Needs to contain maximum 13 letters and numbers`
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});


