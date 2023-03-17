import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserBody } from 'src/app/interface';
import { MyErrorStateMatcher } from 'src/app/my-errorstatematcher';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit{
  constructor(private userService: UsersService){}
  loading: boolean = false
  newUserForm!: FormGroup
  matcher = new MyErrorStateMatcher()
  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(8), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('')
    })
  }

  onSubmitNewUser(){
    this.loading = true
    const user: UserBody = {
      name: this.newUserForm.value.name,
      email: this.newUserForm.value.email,
      gender: this.newUserForm.value.gender,
      status: 'active'
    }
    this.userService.newUser(user).subscribe({
      next: ()=> {
        this.loading = false
        this.newUserForm.reset()
        Object.keys(this.newUserForm.controls).forEach(key => {
          this.newUserForm.get(key)?.setErrors(null)
        })
        alert(`Nuovo utente creato con successo`)
      },
      error: err => {
        this.loading = false
        if(err.status = 422){
          alert('Dati mancanti')
          return
        }
        console.error(`Creating new user: ${err.message}`)
        alert(`Qualcosa è andato storto...`)
      }
    })
  }
}

