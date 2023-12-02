import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAccountService } from 'src/app/services/user-account.service';
type AOA = any[][];

@Component({
  selector: 'app-investment-declaration-upload-by-admin',
  templateUrl: './investment-declaration-upload-by-admin.component.html',
  styleUrls: ['./investment-declaration-upload-by-admin.component.css']
})
export class InvestmentDeclarationUploadByAdminComponent {
  title: string = 'Employees List';
  data: AOA = [];
  datax: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  headData: any;
  headDatax: any;
  userId: any;
  [x: string]: any;
  insvestmentdecleration!: FormGroup;
  selectedFile!: File;
  users: any[] = [];
  event: any;
  name: any;
  investmentDeclaration: any;
  myFile!: Observable<any>;
  selectedUser: any;
  filterText: string = '';
  errorMessage: string | null = null;
  instvestmentDeclarationflle: any;
  filePath: any;
  User: any[] = [];

  @ViewChild('container')
  container!: ElementRef;
  @ViewChild('content', { static: false }) modalContent: any;
  @ViewChild('content') popupview !: ElementRef;

  constructor(
    private accountService: UserAccountService,
    private formBuilder: FormBuilder,
    private sant: DomSanitizer,
    private modalService: NgbModal

  ) {

    this.insvestmentdecleration = formBuilder.group({
      'filePath': [null],
      'file': [null],
    });
  }

  onFileSelected(files: FileList): void {
    this.selectedFile;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.accountService.getAllInvestmentDeclarationByUsers().subscribe(users => {
      console.log("users data", users);
      this.users = users;
      this.name = this.users[0].name;
      console.log("name ", this.name);
      for (let i = 0; i <= this.users.length; i++) {
      }
    },
      error => alert("Faild to featch users"))
  }

  convertToBase64(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    this.insvestmentdecleration.patchValue
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

  submit(formValue: any) {
    if (!formValue.file) {
      Swal.fire({
        icon: 'error',
        text: 'Please select a file .',
      });
      formValue.reset();
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

        this.accountService.uploadInvestmentDecByAdmin(formObj).subscribe(
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

  deleteInvestmentDecaration() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this declaration!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.deleteInvestmentDecaration().subscribe(
          () => {
            window.location.reload();
            Swal.fire('Deleted!', 'Investment Declaration Deleted successfully!', 'success');
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

  viewFileinvestmentDeclaration() {
    const url = `/assets/investmentdeclaration/InvestmentDeclaration/InvestmentDeclaration.xlsx`;
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, true);

    xhr.onload = () => {
      if (xhr.status === 200) {
        this.loadExcelFilex(url);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Investment Declaration not uploaded yet.'
        });
      }
    };

    xhr.onerror = () => {
      console.error('Error loading the file: Network error');
    };

    xhr.send();
  }

  loadExcelFilex(filePath: string) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = (e) => {
      const arrayBuffer = xhr.response;
      const datax = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(datax, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.headData = this.data[0]; // Set the column headers based on the first row of the data
      this.data.splice(0, 1); // Remove the first row (column headers) from the data

      this.renderTablex();
    };

    xhr.send();
  }

  renderTablex() {
    const table = this.container.nativeElement;
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    const header = table.createTHead();
    const headerRow = header.insertRow();

    for (const headValue of this.headData) {
      const th = document.createElement('th');
      th.textContent = headValue;
      headerRow.appendChild(th);
    }

    const tbody = table.createTBody();
    for (const row of this.data) {
      const tr = tbody.insertRow();
      for (let i = 0; i < this.headData.length; i++) {
        const td = tr.insertCell();
        td.textContent = row[i] || ' ';
      }
    }
  }

  openModal() {
    const modalRef = this.modalService.open(this.modalContent, { size: 'lg' });
    this.viewFileinvestmentDeclaration();
  }

  deleteUserInvestmentDeclaration(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this declaration!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('userId from delete', user.userId);
        this.accountService.deleteInvestmentDeclarationOfUser(user.userId).subscribe(
          () => {
            window.location.reload();
            Swal.fire('Deleted!', 'Investment Declaration uploaded by employee has been deleted.', 'success');
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              text: 'Error deleting Investment Declaration uploaded by employee',
            });
          }
        );
      }
    });
  }

  viewFile(user: any) {
    if (user.filePath && user.id) {
      this.selectedUser = user;
      const urlx = user.dataURI;
      this.loadExcelFile(urlx);
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
    const header = table.createTHead();
    const headerRow = header.insertRow();
    for (const headValuex of this.headDatax) {
      const th = document.createElement('th');
      th.textContent = headValuex;
      headerRow.appendChild(th);
    }

    const tbody = table.createTBody();
    for (const rowx of this.datax) {
      const tr = tbody.insertRow();
      for (let i = 0; i < this.headDatax.length; i++) {
        const td = tr.insertCell();
        td.textContent = rowx[i] || ' ';
      }
    }
  }

}
