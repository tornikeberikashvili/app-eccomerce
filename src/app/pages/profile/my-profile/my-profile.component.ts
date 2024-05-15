import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {AuthFacades} from "../../../facades";

@Component({
  selector: 'app-my-profile',
  standalone: true,
    imports: [
        AsyncPipe
    ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  authFacade = inject(AuthFacades)

  user$ = this.authFacade.getUser()
}
