import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalProfileComponent } from './components/personal-profile/personal-profile.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: PersonalProfileComponent,
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'login-signup',
    loadChildren: () =>
      import('./login-signup/login-signup.module').then(
        (m) => m.LoginSignupModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
