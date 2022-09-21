import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/Login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/auth/Register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  // main page
  { path: 'main', component: MainPageComponent },
  // authentication
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // dashboard
  { path: 'dashboard', component: DashboardComponent },
  // not found
  { path: 'not-found', component: NotFoundComponent },
  // default
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
