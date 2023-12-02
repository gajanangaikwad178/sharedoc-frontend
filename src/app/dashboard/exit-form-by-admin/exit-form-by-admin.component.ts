import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { UserAccountService } from 'src/app/services/user-account.service';

type AOA = any[][];
@Component({
  selector: 'app-exit-form-by-admin',
  templateUrl: './exit-form-by-admin.component.html',
  styleUrls: ['./exit-form-by-admin.component.css']
})

export class ExitFormByAdminComponent {
  exitform!: FormGroup;
  event: any;
  myFile!: Observable<any>;
  errorMessage: string | null = null;
  title: string = 'Employees List';
  filterText: string = '';
  users: any[] = [];
  selectedUser: any;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  data: AOA = [];
  datax: AOA = [];
  headData: any;
  headDatax: any;
  userData!: FormGroup;
  filteredUsersname: any[] | undefined;

  @ViewChild('container')
  container!: ElementRef;
  name: any;

  constructor(private accountService: UserAccountService, private formBuilder: FormBuilder, private modalService: NgbModal, private http: HttpClient) {
    this.exitform = formBuilder.group({
      'filePath': [null],
      'file': [null],
    });

    this.userData = this.formBuilder.group({
      userId: [''], // Initial value for userId
      selectedAction: [''], // Initial value for selectedAction
      lastWorkingDate: [null], // Initial value for lastWorkingDate
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.accountService.getAllExitFormByUsers().subscribe(users => {
      console.log("users data", users);
      this.users = users;
      this.name = this.users[0].name;
      console.log("name ", this.name);
      for (let i = 0; i <= this.users.length; i++) {
      }
    },
      error => alert("Faild to featch users"))
  }

  onActionChange(user: any) {
  }

  onSubmit(formValue: any, user: any) {
    debugger
    var userD = {
      "userId": user.userId,
      "date": formValue.lastWorkingDate,
      "exitStatus": formValue.selectedAction
    }
    this.accountService.ExitFormConfirm(userD).subscribe(
      (response: any) => {
        debugger
        if (response && response.message) {
          // Display the message from the API response in an alert
          Swal.fire("Success!", response.message, "success");
          // alert(response.message);
        } else {
          Swal.fire('API request was successful, but no message received.');
        }

      }
    );
  }

  convertToBase64(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    this.exitform.patchValue
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
          file: data
        };

        this.accountService.uploadExitFormByAdmin(formObj).subscribe(response => {
          // Handle successful upload
          debugger
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
      text: 'You want to delete the exit form',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.deleteExitForm().subscribe(
          () => {
            Swal.fire('Deleted!', 'Exit Form has been deleted successfully.', 'success');
          },
          (error) => {
            Swal.fire('Error', "File does not exist for delete", 'error');
          }
        );
      }
    });
  }

  get filteredUsersByname() {
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(this.filterText.toLowerCase()
        //  && user.userId.toLowerCase().includes(this.filterText.toLowerCase())
      )
    );
  }

  viewFile(user: any) {
    debugger
    if (user.filePath && user.id) {
      if (user.dataURI !== null) {
        const urlx = user.dataURI;
        if (urlx != null) {
          const a = document.createElement('a');
          a.href = urlx;
          a.download = `${user.userId}ExitFormByUser.docx`;
          a.click();
        }
      }else {
        Swal.fire({
          icon: 'error',
          text: 'File not found',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Invalid user data or missing properties.',
      });
    }
  }

  loadExcelFile(filePath: string) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = (e) => {
      const arrayBuffer = xhr.response;
      const datax = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(datax, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      this.datax = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.headDatax = this.datax[0];
      this.datax.splice(0, 1);
      this.renderTable();
    };

    xhr.send();
  }

  renderTable() {
    const table = this.container.nativeElement;
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }

  deleteUserExitForm(user: any) {
    console.log('userId from delete', user.userId);

    this.accountService.deleteExitFormOfUser(user.userId).subscribe(
      () => {
        Swal.fire('Investment Declaration uploaded by employee deleted successfully');
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          text: 'Error deleting Investment Declaration uploaded by employee',
        });
      }
    );
  }
}
