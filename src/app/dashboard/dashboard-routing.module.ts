import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserDataComponent } from './user-data/user-data.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'user/:id', component: UserDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
