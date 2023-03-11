import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from '../interface';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostService) {}
  allPosts: Post[] = [
    {
      id: 0,
      user_id: 0,
      title: '',
      body: '',
    },
  ];
  lenghtPosts!: string | null;
  loading!: boolean;
  pageIndex: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 25, 50];
  pageEvent!: PageEvent;
  ngOnInit(): void {
    // get the total number of posts
    this.postService.getAllPostSize().subscribe((res) => {
      this.lenghtPosts = res.headers.get('x-pagination-total');
    });
    this.getAllPost(this.pageIndex, this.pageSize);
  }
  getAllPost(pageIndex: number, pageSize: number) {
    this.loading = true;
    this.postService.getAllPosts(pageIndex, pageSize).subscribe({
      next: (res) => {
        this.allPosts = [...res];
        this.loading = false;
      },
    });
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllPost(this.pageIndex, this.pageSize);
  }
}
