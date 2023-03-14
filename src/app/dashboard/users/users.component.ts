import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UsersService) {}
  haveUser: boolean = true;
  loading: boolean = false;
  searchUserForm!: FormGroup;
  users!: User[] | null;
  // pagination
  lenghtUsers!: string | null;
  pageIndex: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 25, 50];
  pageEvent!: PageEvent;
  ngOnInit(): void {
    this.loading = true;
    this.searchUserForm = new FormGroup({
      keyword: new FormControl(),
      typeOfSearch: new FormControl('name'),
    });
    this.userService.getAllUsers(this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        this.loading = false;
        this.users = res.body;
        this.lenghtUsers = res.headers.get('x-pagination-total');
      },
    });
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  onSearchUserSubmit() {
    this.loading = true
    const params = new HttpParams().set(
      this.searchUserForm.value.typeOfSearch,
      this.searchUserForm.value.keyword
    );
    this.userService.getUserFromSearch(params).subscribe({
      next: (res) => {
        if (res.body?.length === 0) {
          this.haveUser = false;
          this.loading = false;
          return;
        }
        this.loading = false;
        this.users = res.body;
        this.lenghtUsers = res.headers.get('x-pagination-total');
      },
      error: (err) => {
        console.error(`Search user error: ${err.message}`);
      },
    });
  }
}
