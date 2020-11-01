import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
      this.title = 'Home'
   }

  ngOnInit(): void {
    console.log('componente Home cargado');
  }

}
