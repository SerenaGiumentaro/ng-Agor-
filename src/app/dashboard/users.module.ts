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
import { UserDataComponent } from './components/new-user/user-data/user-data.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PostsModule } from '../posts/posts.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserDataComponent,
    NewUserComponent,
    UsersListComponent,
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
  ]
})
export class UsersModule { }
