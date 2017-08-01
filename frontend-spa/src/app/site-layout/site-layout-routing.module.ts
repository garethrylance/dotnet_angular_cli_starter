import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SiteLayoutComponent } from './site-layout.component';
import { BlankPageComponent } from './home-page/home-page.component';
import { TerminalComponent } from '../terminal/terminal.component';



const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: BlankPageComponent },
      { path: 'term', component: TerminalComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteLayoutRoutingModule { }
