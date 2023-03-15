import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private userService: UsersService){}
@Input() user: User ={
  name: '',
  email: '',
  status: '',
  gender:'',
  id: 0
}
@Output() updateUser: EventEmitter<number> = new EventEmitter<number>()
haveUserData(){

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
