import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  token: string = 'd11e8e040d7e2cb88ff136e0f80d4057b11811393f419fb0f962023acc2d2489'
  apiUsersUrl:string = 'https://gorest.co.in/public/v2/users'
  isLogginIn!: boolean


  isLogginInCheck(){
    return this.isLogginIn
  }

  
}
