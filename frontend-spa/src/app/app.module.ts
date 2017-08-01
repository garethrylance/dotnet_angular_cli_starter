import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommandsService } from './services/commands.service';

import { AppComponent } from './app.component';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [CommandsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
