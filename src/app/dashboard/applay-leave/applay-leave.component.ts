import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applay-leave',
  templateUrl: './applay-leave.component.html',
  styleUrls: ['./applay-leave.component.css']
})
export class ApplayLeaveComponent implements OnInit {

  leaveForm!: FormGroup;
  user: User = new User;
  userId: any;
  formSubmitted = false;
  userArray: any;
  users:any;

  constructor(private accountService: UserAccountService, public fb: FormBuilder) {
    this.userArray = localStorage.getItem('userId');
    console.log("userArray", this.userArray)
    this.userId = this.userArray;

    this.leaveForm = fb.group({
      "userId": [this.userId, Validators.required],
      'startDate': [null, Validators.required],
      'endDate': [null, Validators.required],
      'leaveType': [null, Validators.required],
      'employeeReason': [null, Validators.required],
    }, { validators: this.endDateValidator });
  }

  ngOnInit(): void {
    this.getAllLeaves();
  }

  endDateValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      formGroup.get('endDate')?.setErrors({ endDateBeforeStartDate: true });
    } else {
      formGroup.get('endDate')?.setErrors(null);
    }
  }

  applayleave(leaveform: any) {
    if (this.leaveForm.valid) {
      console.log('leaveForm', this.leaveForm.value);
      this.accountService.applayLeave(leaveform).subscribe((
        response: any) => {
          if(response.message ==='Leave applied successfully'){
            console.log('Leave submitted successfully:', response);
           Swal.fire(response.message);
            } else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.message,
              });
            }
      },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error  leave application:',
          });
        }
      );

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields and ensure that the end date is not before the start date.',
      });
    }
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
getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
}