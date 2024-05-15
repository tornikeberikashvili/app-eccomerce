import {Component, inject, OnDestroy} from '@angular/core';
import {AuthHeadComponent} from "../auth-head/auth-head.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from "@angular/forms";
import {InputComponent} from "../../../components/input/input.component";
import {AlertComponent} from "../../../components/alert/alert.component";
import {ButtonComponent} from "../../../ui/button/button.component";
import { RouterLink} from "@angular/router";
import {AuthFacades} from "../../../facades";
import {catchError, Subject, takeUntil, throwError} from "rxjs";

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [
    AuthHeadComponent,
    FormsModule,
    InputComponent,
    ReactiveFormsModule,
    AlertComponent,
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './recovery.component.html',
  styleUrls: [
    '../auth.style.scss',
    './recovery.component.scss']
})
export class RecoveryComponent implements OnDestroy{

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  authFacades = inject(AuthFacades)

  sub$ = new Subject()

  errorMessage: string | null = null
  successMessage: string | null = null

  sendLink() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return
    }
    this.authFacades.sendOobCode(this.form.value.email as string)
      .pipe(
        takeUntil(this.sub$),

        catchError(({error}) => {
          this.errorMessage = error.error.message
          return throwError(() => error.error.message)

        })

      )
      .subscribe((res) => {
        console.log('Email sent', res)
        this.successMessage = 'Email sent ,check your inbox'
      })
  }

  ngOnDestroy() {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
