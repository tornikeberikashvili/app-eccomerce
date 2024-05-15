import {Component, inject,} from '@angular/core';
import {AuthHeadComponent} from "../auth-head/auth-head.component";
import {InputComponent} from "../../../components/input/input.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ButtonComponent} from "../../../ui/button/button.component";

import {AuthFacades} from "../../../facades";
import {AuthPayload} from "../../../core/interfaces/auth-payload";
import {AlertComponent} from "../../../components/alert/alert.component";
import {catchError, throwError} from "rxjs";



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthHeadComponent,
    InputComponent,
    ReactiveFormsModule,
    JsonPipe,
    RouterLink,
    ButtonComponent,
    AlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: [
    '../auth.style.scss',
    './login.component.scss'
  ]
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  authFacades = inject(AuthFacades)
  router = inject(Router)


  errorMessage: string | null = null
  successMessage: string | null = null


  submit() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      return
    }

    this.errorMessage = null
    this.successMessage = null

    const {email, password} = this.form.value as { email: string, password: string }

    email.trim()
    password.trim()

    const payload: AuthPayload = {
      email,
      password
    }

    this.authFacades.login(payload)
      .pipe(
        catchError(({error}) => {
          this.errorMessage = error.error.message
          return throwError(() => error.error.message)

        })
      )
      .subscribe(res => {
        console.log(res)
        if (res) {
          this.successMessage = 'Login successful'
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 2000)
        }
      })
  }
}
