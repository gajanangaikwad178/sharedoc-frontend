import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-balance-leave',
  templateUrl: './user-balance-leave.component.html',
  styleUrls: ['./user-balance-leave.component.css']
})
export class UserBalanceLeaveComponent {

  user: User = new User
  users: any
  userId: any
  userArray: any

  constructor(private accountService: UserAccountService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.userArray = localStorage.getItem('userId');
    console.log("userArray", this.userArray)
    this.userId = this.userArray;
    this.getAllLeaves();
  }

  getAllLeaves() {
    var json={
      "userId":this.userId
  }
  debugger
  this.accountService.getAllLeaves(json).subscribe(response  => {
    this.users = response[0];
  },
    error => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Leaves not upldated yet!',
      })
      );
}
}
