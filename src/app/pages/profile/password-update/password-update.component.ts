import {Component, inject,} from '@angular/core';
import {FormControl, FormGroup, isFormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../../components/input/input.component";
import {ButtonComponent} from "../../../ui/button/button.component";
import {confirmPasswordValidator} from "../../../services/validators/confirm-password.validator";
import {NgIf} from "@angular/common";
import {AlertComponent} from "../../../components/alert/alert.component";
import {AuthFacades} from "../../../facades";
import {subscribe} from "node:diagnostics_channel";

@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    NgIf,
    AlertComponent
  ],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.scss'
})
export class PasswordUpdateComponent {
  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
    ]),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: confirmPasswordValidator})

  authFacade = inject(AuthFacades)

  submit() {
    this.form.markAllAsTouched()

    if (this.form.invalid) {
      return
    }
    const password = this.form.value.password as string

    this.authFacade.changePassword(password)
      .subscribe(()=>{
        this.form.reset()
    })
  }
}
