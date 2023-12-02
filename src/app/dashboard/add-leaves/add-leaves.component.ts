import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-leaves',
  templateUrl: './add-leaves.component.html',
  styleUrls: ['./add-leaves.component.css']
})
export class AddLeavesComponent implements OnInit {
  leaveForm!: FormGroup;
  user: User = new User;
  users: any[] = [];
  name: any;

  constructor(
    private accountService: UserAccountService,
    private formBuilder: FormBuilder,
  ) {

    this.leaveForm = formBuilder.group({
      'userId': [null, Validators.required],
      'casualLeave': [null, Validators.required],
      'sickLeave': [null, Validators.required],
      'otherLeave': [null, Validators.required]
    });

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.accountService.getAllUsers().subscribe(users => {
      this.users = users;
    },
      error => alert("Faild to featch users"))
  }

  addLeaves() {
    if (this.leaveForm.valid) {
      console.log('leaveform', this.leaveForm.value);
      this.accountService.addLeave(this.leaveForm.value).subscribe(data => {
        Swal.fire('leave updated!');
        this.leaveForm.reset();
      },
        error => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Updating leaves.',
        }));

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields and ensure that leave counts are non-negative.',
      });
    }
  }

}
