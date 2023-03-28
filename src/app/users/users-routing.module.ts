import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { PersonalProfileComponent } from './components/personal-profile/personal-profile.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'profile', component: PersonalProfileComponent , canActivate: [AuthGuard]},
  {path: 'user/:id', component: UserDataComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
