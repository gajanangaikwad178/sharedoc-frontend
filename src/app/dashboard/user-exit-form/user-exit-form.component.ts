import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-exit-form',
  templateUrl: './user-exit-form.component.html',
  styleUrls: ['./user-exit-form.component.css']
})
export class UserExitFormComponent  implements OnInit{
  
  exitFormByUser!: FormGroup;
  event: any;
  userId: any
  filePath = '';
  name: any;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder,private router: Router,private accountService: UserAccountService,private route : ActivatedRoute){
    this.exitFormByUser = this.formBuilder.group({
      file: ['']
    });
  }

  ngOnInit(): void {
    
    const userobject = localStorage.getItem('userloggedData');
    if (userobject) {
      const uservalue = JSON.parse(userobject);
      this.name = uservalue?.name;
      this.userId = localStorage.getItem('userId');
    }
  }

  downloaddocFile() {
    debugger
        this.accountService.downloadExitForm().pipe(first())
        .subscribe(response => {
          debugger
          if (response.dataURI !== null) {
            const fileUrl = response.dataURI;
            if (fileUrl != null) {
              const a = document.createElement('a');
              a.href = fileUrl;
              a.download = 'ExitForm.docx';
              a.click();
            }
          } else{
            Swal.fire({
              icon: 'error',
              title: 'Exit Form Not Available',
              text: 'The employee exit form has not been uploaded by the admin.',
            });
          }
        })
      }

  submit(formValue: any) {
    if (!formValue.file) {
      Swal.fire({
        icon: 'error',
        text: 'Please select a file .',
      });
      return;
    }
    console.log("form value", formValue);
    console.log("event", this.event);
    this.convertToBase64(this.event)
      .then((data) => {
        console.log(" data", data);
        const formObj = {
          userId: this.userId,
          name: this.name,
          filePath: '',
          file: data
        };
        this.accountService.uploadExitFormByUser(formObj).subscribe(
          response => {
            debugger
            // Handle successful upload
            console.log(response);
            this.errorMessage = null;
            Swal.fire({
              text: 'File uploaded successfull!',
            });
          },
          (error: HttpErrorResponse) => {
            // Handle upload error
            console.error(error);
            if (error.error.message === 'File already exists') {
              this.errorMessage = ' An error occurred during file upload.';
            } else {
              this.errorMessage = 'File already exists.';
            }
          }
        );
      }, error => {
        Swal.fire({
          icon: 'error',
          text: 'please select file',
        });
      }
      );
  }

  convertToBase64(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    this.exitFormByUser.patchValue
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
  
  // exitFormByUser!: FormGroup;
  // event: any;
  // userId: any
  // filePath = '';
  // name: any;
  // errorMessage: string | null = null;

  // constructor(private formBuilder: FormBuilder,private router: Router,private accountService: UserAccountService,private route : ActivatedRoute){
  //   this.exitFormByUser = this.formBuilder.group({
  //     file: ['']
  //   });
  // }

  // ngOnInit(): void {
    
  //   const userobject = localStorage.getItem('userloggedData');
  //   if (userobject) {
  //     const uservalue = JSON.parse(userobject);
  //     this.name = uservalue?.name;
  //     this.userId = localStorage.getItem('userId');
  //   }
  // }

  // downloaddocFile() {
  //   const fileUrl = 'assets/Exit_Form/ExitForm.docx';
  //   if (fileUrl != null) {
  //     const a = document.createElement('a');
  //     a.href = fileUrl;
  //     a.download = 'ExitForm.docx';
  //     a.click();
  //   }
  // }

  // submit(formValue: any) {
  //   if (!formValue.file) {
  //     Swal.fire({
  //       icon: 'error',
  //       text: 'Please select a file .',
  //     });
  //     return;
  //   }
  //   console.log("form value", formValue);
  //   console.log("event", this.event);
  //   this.convertToBase64(this.event)
  //     .then((data) => {
  //       console.log(" data", data);
  //       const formObj = {
  //         userId: this.userId,
  //         name: this.name,
  //         filePath: '',
  //         file: data
  //       };
  //       this.accountService.uploadExitFormByUser(formObj).subscribe(
  //         response => {
  //           debugger
  //           // Handle successful upload
  //           console.log(response);
  //           this.errorMessage = null;
  //           Swal.fire({
  //             text: 'File uploaded successfull!',
  //           });
  //         },
  //         (error: HttpErrorResponse) => {
  //           // Handle upload error
  //           console.error(error);
  //           if (error.error.message === 'File already exists') {
  //             this.errorMessage = ' An error occurred during file upload.';
  //           } else {
  //             this.errorMessage = 'File already exists.';
  //           }
  //         }
  //       );
  //     }, error => {
  //       Swal.fire({
  //         icon: 'error',
  //         text: 'please select file',
  //       });
  //     }
  //     );
  // }

  // convertToBase64(event: any): Promise<any> {
  //   let file = event.target.files[0];
  //   this.event = event;
  //   this.exitFormByUser.patchValue
  //   const reader = new FileReader();
  //   const future = new Promise((resolve, reject) => {
  //     reader.addEventListener('load', function () {
  //       resolve(reader.result);
  //     }, false);
  //     reader.addEventListener('error', function (event) {
  //       reject(event);
  //     }, false);

  //     reader.readAsDataURL(file);
  //   });
  //   console.log(" base 64 file", future);
  //   return future;
  // }

}
