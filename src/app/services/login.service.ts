import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  // token: string = 'd11e8e040d7e2cb88ff136e0f80d4057b11811393f419fb0f962023acc2d2489'
  isLogginIn!: boolean

// check if user is logged
  isLogginInCheck(){
    return this.isLogginIn
  }


}
