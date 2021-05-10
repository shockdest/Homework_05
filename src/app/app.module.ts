import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MonstersComponent } from './monsters/monsters.component';
import { CreateMonsterComponent } from './create-monster/create-monster.component';


@NgModule({
  declarations: [
    AppComponent,
    MonstersComponent,
    CreateMonsterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
