import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Artist } from 'src/app/spo/models/artist';
import { UserService } from 'src/app/spo/services/user.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [UserService]
})
export class ArtistListComponent implements OnInit {
  public title: string;
  public artist: Artist[];
  public identity;
  public token;
  constructor(private _userService: UserService, private _route: ActivatedRoute, private _router: Router) {
    this.title = 'Artistas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    console.log('componente artistas cargado');
    
    
  }

}
