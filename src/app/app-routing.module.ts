import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },

  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
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
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  { path: '**', redirectTo: 'login-signup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
