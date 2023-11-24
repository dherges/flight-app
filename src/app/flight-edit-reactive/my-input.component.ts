import {Component, forwardRef} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {MyErrorComponent} from "./my-error.component";

@Component({
  selector: 'app-my-input',
  standalone: true,
  imports: [
    JsonPipe,
    MyErrorComponent
  ],
  template: `
    <div>
      <p>{{ value | json }}</p>
      <button class="btn btn-sm" (click)="onIncrement()">increment</button>
      <button class="btn btn-sm" (click)="onDecrement()">decrement</button>
    </div>
    <app-my-error></app-my-error>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyInputComponent),
      multi: true,
    }
  ]
})
export class MyInputComponent implements ControlValueAccessor {

  public value: any;

  _change: any;
  _touched: any;


  registerOnChange(fn: any): void {
    this._change = fn;
  }

  registerOnTouched(fn: any): void {
    this._touched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;

    console.log("writeValue: " + this.value);
  }

  onChanged() {
    if (typeof this._change === 'function') {
      this._change(this.value);
    }
  }


  onIncrement() {
    if (typeof this.value === 'number') {
      this.value += 1;
    }
    this.onChanged();
  }

  onDecrement() {
    if (typeof this.value === 'number') {
      this.value -= 1;
    }
    this.onChanged();
  }
}
