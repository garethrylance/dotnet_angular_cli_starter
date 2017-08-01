import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';



const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'app', loadChildren: './site-layout/site-layout.module#SiteLayoutModule' }

];

@NgModule({

  declarations: [

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MaterialModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


