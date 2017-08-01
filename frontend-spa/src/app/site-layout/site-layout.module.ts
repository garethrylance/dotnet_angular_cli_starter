import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SiteLayoutRoutingModule } from './site-layout-routing.module';
import { SiteLayoutComponent } from './site-layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BlankPageComponent } from './home-page/home-page.component';
import { TerminalComponent } from '../terminal/terminal.component';


@NgModule({
  imports: [
    CommonModule,
    SiteLayoutRoutingModule
  ],
  declarations: [

    SiteLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    BlankPageComponent,
    TerminalComponent
  ]
})
export class SiteLayoutModule { }
