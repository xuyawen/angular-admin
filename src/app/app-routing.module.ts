import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: ['canActivateTeam']
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: 'canActivateTeam',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        console.log(window);
        const history = window.history;
        const Token = localStorage.getItem('Token');
        return Token ? true : history.pushState(null, null, '/login');
      }
    }
  ]
})

export class AppRoutingModule {}
