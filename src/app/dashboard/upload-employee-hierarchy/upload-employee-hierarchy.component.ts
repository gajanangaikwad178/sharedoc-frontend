import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-employee-hierarchy',
  templateUrl: './upload-employee-hierarchy.component.html',
  styleUrls: ['./upload-employee-hierarchy.component.css']
})
export class UploadEmployeeHierarchyComponent {

  employeeHierarchy!: FormGroup;
  event: any;
  myFile!: Observable<any>;
  errorMessage: string | null = null;
  title: string = 'Employees List';
  filterText: string = '';
  users: any[] = [];
  selectedUser: any;

  headData: any;
  headDatax: any;

  @ViewChild('container')
  container!: ElementRef;
  name: any;

  constructor(private accountService: UserAccountService,
    private formBuilder: FormBuilder,

  ) {
    this.employeeHierarchy = formBuilder.group({
      'filePath': [null],
      'file': [null],
    });
  }

  ngOnInit(): void {

  }

  convertToBase64(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    this.employeeHierarchy.patchValue
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
          filePath: '',
          file: data,
          pdfType:'employeeHierarchy'
        };

        this.accountService.uploadEmployeeHierarchy(formObj).subscribe(response => {
          // Handle successful upload
          console.log(response);
          this.errorMessage = null;
          Swal.fire({
            icon: 'success',
            text: 'File uploaded successfull!',
          });
        },
          (error: HttpErrorResponse) => {
            // Handle upload error
            console.error(error);
            if (error.status === 500 && error.error.message === 'File already exists') {
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

  deleteExitForm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover the Exit Form!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.deleteEmpoyeeHierarchy().subscribe(
          () => {
            Swal.fire({
              icon: 'success', // Add the icon property here
              title: 'Deleted!',
              text: 'Exit Form Deleted successfully!'
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error', // Add the icon property here
              title: 'Error',
              text: 'File does not exist for delete'
            });
          }
        );
      }
    });
  }

}
