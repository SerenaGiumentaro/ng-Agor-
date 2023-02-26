import { Component, Input } from '@angular/core';
import { User } from 'src/app/interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
@Input() user: User ={
  name: '',
  email: '',
  status: '',
  gender:'',
  id: 0
}


}
