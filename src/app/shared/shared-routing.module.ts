import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalProfileComponent } from '../users/components/personal-profile/personal-profile.component';
import { SharedComponent } from './shared.component';

const routes: Routes = [
  { path: '', component: SharedComponent },
  { path: 'profile', component: PersonalProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
