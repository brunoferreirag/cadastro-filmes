import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }
  hasErrorValidar(control: AbstractControl, errorName: string): boolean {
    if ((control.dirty || control.touched && this.hasError(control, errorName))) {
      return true;
    }
    return false;
  }
  hasError(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }

  lengthValidar(control: AbstractControl, errorName: string): number{
    if(!control.errors){
      return 0;
    }
    const error = control.errors[errorName];
    if(!error){
      return 0;
    }
    return error.requiredLength || error.min || error.max || 0;
  }
}
