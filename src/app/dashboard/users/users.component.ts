import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UsersService) {}
  loading: boolean = false;
  users!: User[];
  ngOnInit(): void {
    this.loading = true
    this.userService.getAllUsers(1).subscribe({
      next: (res) => {
        this.loading = false
        this.users = [...res];
      },
    });
  }
}
