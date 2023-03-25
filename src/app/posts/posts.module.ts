import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './components/post/post.component';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommentComponent } from './components/comment/comment.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NewPostComponent } from './components/new-post/new-post.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    CommentComponent,
    NewPostComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    SharedModule
  ],
  exports: [
    PostComponent,
    CommentComponent,
  ]
})
export class PostsModule { }
