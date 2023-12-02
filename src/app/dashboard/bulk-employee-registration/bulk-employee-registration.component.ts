import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';
import { Subscriber } from 'rxjs';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-bulk-employee-registration',
  templateUrl: './bulk-employee-registration.component.html',
  styleUrls: ['./bulk-employee-registration.component.css']
})
export class BulkEmployeeRegistrationComponent implements OnInit {

  bulkemployeeuploadForm!: FormGroup;
  user: User = new User;
  event: any;
  holidays: any[] = [];

  constructor(private accountService: UserAccountService, public formBuilder: FormBuilder) {

    this.bulkemployeeuploadForm = formBuilder.group({
      file: [''],
      userBulkFileExcel: ['', Validators.required],
    });

  }
  ngOnInit(): void {

  }

  convertToBase64(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    this.bulkemployeeuploadForm.patchValue
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


  submitBulk(bulkemployeeuploadForm: any, users: any) {
    if (!bulkemployeeuploadForm.file) {
      Swal.fire({
        icon: 'error',
        text: 'Please select a file .',
      });
      bulkemployeeuploadForm.reset();
      return;
    }

    console.log("form value", bulkemployeeuploadForm);
    console.log("users value", users);
    console.log("event", this.event);
    this.convertToBase64(this.event)
      .then((data) => {
        console.log(" data", data);
        const formObj = {
          userBulkFileExcel: data,
          fileName: 'kbc'
        };
        this.accountService.uploadBulkUserRegistationFile(formObj).subscribe(data => {
          console.log(data);
          Swal.fire('Bulk Employee Uploaded!');
        }
          , error => {
            Swal.fire({
              icon: 'error',
              text: 'Bulk Employee Uploade Failed',
            });
            // alert("Candidate registration failed");
          }
        )
      })
  }
}