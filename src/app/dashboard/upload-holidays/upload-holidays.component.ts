import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';
import { Subscriber } from 'rxjs';
@Component({
  selector: 'app-upload-holidays',
  templateUrl: './upload-holidays.component.html',
  styleUrls: ['./upload-holidays.component.css']
})
export class UploadHolidaysComponent implements OnInit{
  uploadholidays!: FormGroup;
  holidaysForm!: FormGroup;
  user: User = new User;
  event: any;
  holidays: any[] = [];
  bulkHolidayResponse: any;

  constructor(
    private accountService : UserAccountService,
    public formBuilder: FormBuilder 

  ) {

    this.holidaysForm = formBuilder.group({
      fileName : [''],
      userBulkFileExcel : ['', Validators.required],
    });
  }
  
  ngOnInit(): void {

    this.getUpcomingHolidays();
  }

  getUpcomingHolidays(){
    this.accountService.getUpcomingHolidays().subscribe(holidays=>{
      this.holidays = holidays;
    },
    error => {
      console.error('failed to fetch holidays', error);
    }
    );
  }

   createHolidays(holidayForm: NgForm) {
    if (holidayForm.valid) {
      debugger
      this.accountService.createHolidays(this.user).subscribe(
        response => {
          debugger
          if(response!= null){
          Swal.fire('Holiday added!');
          console.log('Holiday created:', this.user);
          holidayForm.resetForm(); // Clear form after successful submission.
          } else{
            Swal.fire({
              icon: 'error',
              text: 'Holidays not Saved',
            });
          }
        }, error => {
          Swal.fire({
            icon: 'error',
            text: 'Error creating holidays',
          });
        }
      );
    } else {
      Object.keys(holidayForm.controls).forEach(controlName => {
        holidayForm.controls[controlName].markAsTouched();
      });
    }
  }
  
   convertToBase64(event: any): Promise<any> {
    let file =  event.target.files[0]; 
     this.event =  event;
    this.holidaysForm.patchValue
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false); 
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);
    
      reader.readAsDataURL(file);
    });
    console.log(" base 64 file" ,  future);
    return future;
    }
  
  readFile(file :File, Subscriber : Subscriber<any>){
    const filereader = new FileReader();
  
    filereader.readAsDataURL(file)
  
    filereader.onload = () =>{
      Subscriber.next(filereader.result);
  
      Subscriber.complete();
    }
    filereader.onerror = () =>{
      Subscriber.error()
      Subscriber.complete()
    }
  }

  submitBulkHoliday(formValue: any, users: any) {

    if (!formValue.userBulkFileExcel) {
      Swal.fire({
        icon: 'error',
        text: 'Please select File.',
      });
      return;
    }
    console.log("form value", formValue);
    console.log("users value", users);
    console.log("event", this.event);
    this.convertToBase64(this.event)
      .then((data) => {
        console.log(" data", data);
        const formObj = {
          userBulkFileExcel: data,
          fileName: 'kbc'
        };
        this.accountService.uploadBulkHolidayFile(formObj).subscribe(data => {
          this.bulkHolidayResponse = data;

          if (this.bulkHolidayResponse.message === 'Excel file data is null or empty') {
            Swal.fire({
              icon: 'error',
              text: 'Excel file data is null or empty',
            });
          }
          if (this.bulkHolidayResponse.message === 'All holidays in the bulk file are already present in the database.') {
            Swal.fire({
              icon: 'error',
              text: 'All holidays in the bulk file are already present in the database.',
            });
          }
          if (this.bulkHolidayResponse.message === 'Holidays list not provided.') {
            Swal.fire({
              icon: 'error',
              text: 'Holidays list not provided.',
            });
          }
          if (this.bulkHolidayResponse.message === 'bulk file uploded') {
            Swal.fire('Bulk Holiday Uploaded!');
          }
        }
          , error => {
            Swal.fire({
              icon: 'error',
              text: 'Bulk Holiday Uploade failed',
            });
          }
        )
      })
  }


  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

