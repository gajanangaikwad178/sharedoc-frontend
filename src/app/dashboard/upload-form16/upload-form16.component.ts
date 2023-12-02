import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-upload-form16',
  templateUrl: './upload-form16.component.html',
  styleUrls: ['./upload-form16.component.css']
})
export class UploadForm16Component implements OnInit {

  [x: string]: any;
  uploadform16!: FormGroup;
  selectedFile!: File;
  users: any[] = [];
  event: any;
  myFile!: Observable<any>;
  years: number[] = [];
  currentYear: any;
  pdfUrl!: string;
  pdfUrlx = '';
  showPdf = false;
  isDeleteDisabled: boolean = false;
  errorMessage: string | null = null;
  showViewer: Boolean = false;
  data1: any
  noDataFoundd: string = ''

  constructor(
    private accountService: UserAccountService,
    private formBuilder: FormBuilder,
    private sant: DomSanitizer,
    private modalservice: NgbModal

  ) {

    this.currentYear = new Date().getFullYear();
    console.log('currentYear', this.currentYear)
    const startYear = this.currentYear - 100; // Change the range as per your requirement
    for (let year = this.currentYear; year >= startYear; year--) {
      this.years.push(year);
    }

    this.uploadform16 = formBuilder.group({
      'name': [null, Validators.required],
      'userId': [null, Validators.required],
      'year': [null],
      'fileName': [null],
      'contentType': [null],
      'filePath': [null],
      'file': [null],
    });

  }


  @ViewChild('content') popupview !: ElementRef;

  onFileSelected(files: FileList): void {
    this.selectedFile;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.accountService.getAllUsers().subscribe(users => {
      this.users = users;
      this.data1 = users;
    },
      error => alert("Faild to featch users"))
  }

  convertToBase64(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    this.uploadform16.patchValue
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

    if (!formValue.year || !formValue.file) {
      Swal.fire({
        icon: 'error',
        text: 'Please select a file or a year.',
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
          'request': {
            name: users.name,
            userId: users.userId,
            year: formValue.year,
            fileName: '',
            contentType: '',
            filePath: ''
          },
          file: data
        };
        this.accountService.uploadForm16(formObj).subscribe(
          response => {
            window.location.reload();
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
            if (error.status === 500 && error.error.message === 'File already exists') {
              Swal.fire({
                icon: 'error',
                text: 'please select file or year',
              });
            } else {
              Swal.fire({
                icon: 'error',
                text: 'File already exists.',
              });
            }
          }
        );

      }, error => {
        Swal.fire({
          icon: 'error',
          text: 'please select file or year',
        });
      }
      );
  }


  disableDeleteButton() {
    this.isDeleteDisabled = true;
    setTimeout(() => {
      this.isDeleteDisabled = false;
    }, 0); // 2 minutes (2 min = 120000 milliseconds)
  }

  viewPdf(userid: any, year: any) {
    console.log('userid', userid);
    console.log('year', year);

    this.accountService.getFile(userid, year).subscribe(
      (response: any) => { // Adjust the type to match the response type from getFile
        console.log("response", response);
        const foldername = userid + year;

        if (Array.isArray(response) && response.length > 0 && response[0].path) {
          this.showPdf = true;
          this.pdfUrl = response[0].path;
          this.showViewer = true;
          this.pdfUrlx = response[0].dataURI;
          console.log("pdfURl", this.pdfUrlx);
          // this.modalservice.open(this.popupview, { size: 'lg' });
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Form not uploaded',
          });
        }

      },
      (error) => {
        Swal.fire({
          icon: 'error',
          text: 'Form not uploaded',
        });
      }
    );
  }



  // viewPdf(userid: any, year: any) {
  //   console.log('userid', userid);
  //   console.log('year', year);

  //   this.accountService.getFile(userid, year).subscribe(
  //     (response: any[]) => { // Type annotation for response as an array
  //       console.log("response", response);
  //       const foldername = userid + year;

  //       if (response.length > 0 && response[0].path) { // Check if response has elements and the 'path' property
  //         this.showPdf = true;
  //         this.pdfUrl = response[0].path;
  //         this.pdfUrlx = `/assets/Form16/${foldername}/${foldername}.pdf`;

  //         console.log("pdfURl", this.pdfUrlx);
  //         this.modalservice.open(this.popupview, { size: 'lg' });
  //       }

  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         text: 'Form not uploaded',
  //       });
  //     }
  //   );
  // }


  deletePdf(userId: any, year: any) {
    console.log('userId from delete', userId);
    console.log('year from delete', year);

    this.accountService.deleteForm16(userId, year).subscribe(
      () => {
        // console.log('response', );
        window.location.reload();
        Swal.fire('Form 16 deleted successfully ');
      }, error => {
        Swal.fire({
          icon: 'error',
          text: 'Error deleting Form 16 ',
        });
      }
    );
  }

  search(serachValue: any, column: any) {
    console.log("serachValue", serachValue);
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
}