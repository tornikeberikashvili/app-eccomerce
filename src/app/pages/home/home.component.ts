import { Component } from '@angular/core';
import {HeroBanerComponent} from "../../components/hero-baner/hero-baner.component";
import {FeatureCardComponent} from "../../components/feature-card/feature-card.component";
import {FEATURES} from "../../data/features";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroBanerComponent,
    FeatureCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
features = FEATURES
}
