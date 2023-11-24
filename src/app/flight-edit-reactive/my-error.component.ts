import {Component, inject} from "@angular/core";
import {FormGroup, FormGroupDirective, NgControl, NgForm} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-my-error',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf
  ],
  template: `
    <small>name: {{ ngControl.name | json }}</small>
    <pre *ngIf="errors">{{ errors | json }}</pre>
  `
})
export class MyErrorComponent {

  ngControl = inject(NgControl);
  formGroup = inject(FormGroupDirective, { optional: true });
  ngForm = inject(NgForm, { optional: true });

  get errors(): any {
    const form = this.formGroup ? this.formGroup.form : this.ngForm?.form;
    if (form) {
      return form.controls[this.ngControl.name || '']?.errors ?? {};
    }
  }

}
