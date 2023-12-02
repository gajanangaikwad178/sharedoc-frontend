import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-uploadsalary-slips',
  templateUrl: './uploadsalary-slips.component.html',
  styleUrls: ['./uploadsalary-slips.component.css']
})
export class UploadsalarySlipsComponent implements OnInit {
  years: number[] = [];
  currentYear: any;
  SalarySlips!: FormGroup;
  base64File: any;
  users: any[] = [];
  event: any;

  months: { id: number, name: string }[] = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ];
  selectedMonth!: string;
  data1: any
  noDataFoundd: string = ''

  constructor(
    private accountService: UserAccountService,
    private formBuilder: FormBuilder,

  ) {
    this.currentYear = new Date().getFullYear();
    console.log('currentYear', this.currentYear)
    const startYear = this.currentYear - 100; // Change the range as per your requirement
    for (let year = this.currentYear; year >= startYear; year--) {
      this.years.push(year);
    }
    this.SalarySlips = this.formBuilder.group({
      userId: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      fileName: [''],
      filePath: ['', Validators.required],
      file: [''],
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.accountService.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.data1 = users;
        console.log(this.users, " this.users ");
      },
      error => {
        Swal.fire({
          icon: 'error',
          text: 'Failed to fetch users',
        });
      }
    );
  }

  search(serachValue: any, column: any) {
    if (serachValue.length >= 3) {
      switch (column) {
        case 'name':
          var filterData = []
          for (const item of this.data1) {
            if (item.name?.toLocaleLowerCase().includes(serachValue.toLocaleLowerCase())) {
              filterData.push(item);
            } else {
              this.noDataFoundd = "No Data Found"
            }
          }
          this.users = filterData
          break;

        case 'userID':
          var filterData = []
          for (const item of this.data1) {
            if (item.userId?.toLocaleLowerCase().includes(serachValue.toLocaleLowerCase())) {
              filterData.push(item);
            } else {
              this.noDataFoundd = "No Data Found"
            }
          }
          this.users = filterData
          break;
      }
    } else if (serachValue.length == 0) {
      this.users = this.data1
      this.noDataFoundd = ""
    }
  }

  convertToBase64(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    this.SalarySlips.patchValue
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
    console.log(" base 64 file", future);
    return future;
  }

  readFile(file: File, Subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      Subscriber.next(filereader.result);
      Subscriber.complete();
    }
    filereader.onerror = () => {
      Subscriber.error()
      Subscriber.complete()
    }
  }

  submit(formValue: any, users: any) {
    console.log("form value", formValue);
    console.log("users value", users);
    console.log("event", this.event);

    // Validate form fields
    if (!formValue.month || !formValue.year || !formValue.file) {
      // Display an alert for each null field
      if (!formValue.month) {
        Swal.fire({
          icon: 'error',
          text: 'Month is required.',
        });
      }
      if (!formValue.year) {
        Swal.fire({
          icon: 'error',
          text: 'Year is required.',
        });
      }
      if (!formValue.file) {
        Swal.fire({
          icon: 'error',
          text: 'file is required.',
        });
      }
      return; // Stop further execution
    }

    this.convertToBase64(this.event)
      .then((data) => {
        console.log(" data", data);
        const formObj = {
          'request': {
            userId: users.userId,
            month: formValue.month,
            year: formValue.year,
            fileName: '',
            filePath: '',
          },
          file: data
        };

        this.accountService.uploadSalarySlips(formObj).subscribe(
          response => {
            // Handle successful upload
            // window.location.reload();
            console.log(response);
            Swal.fire({
              text: 'Payment Slips uploaded successfully!',
            });
          }, error => {
            window.location.reload();
            Swal.fire({
              icon: 'error',
              text: 'Error uploading Payment Slips',
            });
          }
        );
      });
  }

}
