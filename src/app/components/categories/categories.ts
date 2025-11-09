import { Component } from '@angular/core';
import { CategoriesItems } from "../categories-items/categories-items";

@Component({
  selector: 'app-categories',
  imports: [CategoriesItems],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {

}
