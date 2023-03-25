import { Component , OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginService } from './login-signup/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private loginService: LoginService){}
  // isLoggedIn!: boolean
    // isLoggedIn: Observable<boolean> = of(true)

ngOnInit(): void {
  // this.isLoggedIn = this.loginService.isLoggedIn()
}



}
