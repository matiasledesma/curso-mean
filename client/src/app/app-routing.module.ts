import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CVComponent } from './cv/cv.component';
import { ArtistListComponent } from './spo/components/artist-list/artist-list.component';
import { HomeComponent } from './spo/components/home/home.component';
import { UserEditComponent } from './spo/components/user-edit/user-edit.component';
import { SPOComponent } from './spo/spo.component';

const routes: Routes = [
  {path: 'spo', component:SPOComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'artists/:page', component: ArtistListComponent},
    {path:'mis-datos', component: UserEditComponent},
    {path:'**', component: HomeComponent}
  ]},
  {path: 'cv', component:CVComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
