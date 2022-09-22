import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      // tasks/auth - lazyload
      { 
        path: 'auth',
        loadChildren: ()=> import('./pages/auth/auth.module').then(module => module.AuthModule)
       },
      // tasks/dashboard - lazyload
      { 
        path: 'dashboard',
        loadChildren: ()=> import('./pages/content/content.module').then(module => module.ContentModule)
      },
      // default
      {
        path: '**',
        redirectTo: 'auth'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
