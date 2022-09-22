import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './pages/auth/auth.module';

import { TasksRoutingModule } from './tasks-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TasksRoutingModule,
    AuthModule,
  ]
})
export class TasksModule { }
