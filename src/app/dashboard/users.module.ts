import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserComponent } from './components/user/user.component';
// Material
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UserDataComponent } from './components/user-data/user-data.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PostsModule } from '../posts/posts.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserDataComponent,
    NewUserComponent,
    UsersListComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    PostsModule,
    MatExpansionModule,
    MatDialogModule,
    SharedModule
  ],
  exports: [
    UserCardComponent,
  ]
})
export class UsersModule { }
