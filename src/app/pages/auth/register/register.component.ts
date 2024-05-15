import {Component, inject, OnDestroy} from '@angular/core';
import {AuthHeadComponent} from "../auth-head/auth-head.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../../components/input/input.component";
import {ButtonComponent} from "../../../ui/button/button.component";
import {catchError, Subject, takeUntil, throwError} from "rxjs";
import {AuthPayload} from "../../../core/interfaces/auth-payload";
import {AuthFacades} from "../../../facades";
import {Router} from "@angular/router";
import {AlertComponent} from "../../../components/alert/alert.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AuthHeadComponent,
    FormsModule,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    AlertComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: [
    '../auth.style.scss',
    './register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required)
  })

  authFacades = inject(AuthFacades)
  router = inject(Router)


  errorMessage: string | null = null
  successMessage: string | null = null
  sub$ = new Subject()

  submit() {
    console.log(this.form.value)
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

    this.authFacades.register(payload)
      .pipe(
        takeUntil(this.sub$),
        catchError(({error}) => {
            this.errorMessage = error.error.message
            return throwError(() => error.error.message)
          })
        )
          .subscribe(res => {
            if (res) {
              this.successMessage = 'you are registered successfully, redirecting to login page'
              setTimeout(() => {
                this.router.navigate(['/'])
              }, 2000)
            }
          })
  }

  ngOnDestroy() {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
