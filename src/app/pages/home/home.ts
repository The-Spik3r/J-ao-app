import { Component } from '@angular/core';
import { Nav } from "../../components/nav/nav";
import { Search } from "../../components/search/search";
import { Categories } from "../../components/categories/categories";

@Component({
  selector: 'app-home',
  imports: [Nav, Search, Categories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
