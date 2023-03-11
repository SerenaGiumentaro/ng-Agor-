import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ]
})
export class PostsModule { }
