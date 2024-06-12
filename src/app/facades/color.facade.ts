import {inject, Injectable} from "@angular/core";

import {CategoryService} from "../services/categoty.service";
import { map,} from "rxjs";
import {Category} from "../core/interfaces/category";
import {ColorService} from "../services/color.service";
import {Color} from "../core/interfaces/color";

@Injectable({
  providedIn: 'root'
})

export class ColorFacade {
  colorService = inject(ColorService)

  getColors() {
    return this.colorService.getColors()
      .pipe(
        map((colors) => {
          return Object.keys(colors).map((key: any) => ({
            ...colors[key],
            id: key
          } as Color))
        })
      )
  }


  getColorById(id: string) {
    return this.colorService.getColorById(id)
      .pipe(
        map((color) => ({
            ...color,
            id
        } as Color ))
      )
  }

}
