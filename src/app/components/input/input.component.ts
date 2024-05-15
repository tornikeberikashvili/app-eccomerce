import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR,} from "@angular/forms";

let uniqueId= 1
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true

    }
  ]

})
export class InputComponent implements ControlValueAccessor{

  @Input() type:'text' | 'password' | 'number' | 'email' ='text'
  @Input() placeholder:string=''
  @Input() label:string=''

  value:string= '';
  disabled:boolean= false

  get inputId(){
    return 'input-$(uniqueId++)'
  }

  onChange = (value:string) =>{}
  onTouched=()=>{}

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: any): void {
    console.log('writeValue',value)
    this.value = value
  }




}
