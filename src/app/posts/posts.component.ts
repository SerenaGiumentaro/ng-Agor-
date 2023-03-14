import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { postsUrl } from '../api.config';
import { Post } from '../interface';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostService) {}
  searchForm!: FormGroup;
  hideNewPost: boolean = true
  havePost: boolean = true
  allPosts: Post[] | null= [
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
    // set up search form
    this.searchForm = new FormGroup({
      keyword: new FormControl(),
      typeOfSearch: new FormControl('title')
    });
    this.getPostsSize();
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
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllPost(this.pageIndex, this.pageSize);
  }
  getPostsSize() {
    // get the total number of posts
    this.postService.getAllPostSize(postsUrl).subscribe((res) => {
      this.lenghtPosts = res.headers.get('x-pagination-total');
    });
  }

  onSearchSubmit() {
    this.loading = true
console.log(this.searchForm.value)
   const params = new HttpParams().set(
      this.searchForm.value.typeOfSearch,
      this.searchForm.value.keyword
    );
    this.postService.getAllPostsBySearch(params, this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        if(res.body?.length === 0){
          this.havePost = false
          this.loading = false
          return
        }
        this.loading = false
        this.allPosts = res.body
        this.lenghtPosts = res.headers.get('x-pagination-total')
        console.log( res.headers.get('x-pagination-total'))
      },
      error: err => {
        console.error(err)
      }
    });

  }
}
