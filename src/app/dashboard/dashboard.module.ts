import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
// Material
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
  ]
})
export class DashboardModule { }
