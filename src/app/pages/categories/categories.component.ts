import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  route=inject(ActivatedRoute)

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params) // {id: "42"}
    });
  }
}
