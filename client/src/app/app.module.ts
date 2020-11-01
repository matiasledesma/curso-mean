import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './spo/services/user.service';
import { UserEditComponent } from './spo/components/user-edit/user-edit.component';
import { ArtistListComponent } from './spo/components/artist-list/artist-list.component';
import { HomeComponent } from './spo/components/home/home.component';
import { SPOComponent } from './spo/spo.component';
import { CVComponent } from './cv/cv.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    SPOComponent,
    CVComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
