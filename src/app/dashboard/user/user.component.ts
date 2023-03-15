import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  constructor(private userService: UsersService, private activateRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.activateRoute.snapshot.paramMap.get("id")
  }
@Input() user: User ={
  name: '',
  email: '',
  status: '',
  gender:'',
  id: 0
}
@Output() updateUser: EventEmitter<number> = new EventEmitter<number>()
sendUserData(){
  this.userService.selectedUser = this.user
}

deleteUser(){
  // aggiungi una dialog di conferma
  this.userService.deleteUser(this.user.id).subscribe({
    next: () => {
      this.updateUser.emit(this.user.id)
      alert('Utente Eliminato')
    },
    error: err => {
      console.error(`Delete user error: ${err.message}`)
    }
  })
}
}
