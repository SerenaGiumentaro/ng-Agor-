import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDataComponent } from './components/user-data/user-data.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'user/:id', component: UserDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
