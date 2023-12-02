import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dms } from 'src/app/models/dms';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-file-upload',
  templateUrl: './admin-file-upload.component.html',
  styleUrls: ['./admin-file-upload.component.css']
})
export class AdminFileUploadComponent {

  event: any;
  SalarySlips!: FormGroup;
  users: any[] = [];
  data1: any
  userId: any

  dms: Dms = new Dms

  file:any;
  role:any;

  constructor(private accountService: UserAccountService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.SalarySlips = this.formBuilder.group({
      adminId: ['', Validators.required], // Default value for adminId
      userId: ['', Validators.required],  // Default value for userId
      file: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.role = uservalue.Role;

    this.userId = localStorage.getItem('userId');
    if(this.role == 'Super ADMIN'){
      this.getAllUsers();
    }
    if(this.role == 'ADMIN'){
    this.getAllUserList()
    }
    
  }

  getAllUsers() {
    this.accountService.getAllAdminList().subscribe(
      (users: any) => {
        this.users = users.Content;
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



  getAllUserList() {
    debugger
    this.accountService.getAllUserList().subscribe(
      (users: any) => {
        this.users = users.Content;
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

  OnChangeFileField(event: any) {

    this.file = event.target.files[0]
    this.dms.fileName = this.file.name;
    // this.dms.adminId= this.userId;
   
    console.log( this.file);
    console.log('file name',this.dms.fileName);
  }

  submit(formValue: any, users: any) {
    debugger
    const formData = new FormData();
    // this.dms.userId = users.userId;
    formData.append('file ', this.file);
    formData.append('model', JSON.stringify(this.dms));

    console.log('Form Data', formData);

    this.accountService.fileUplaod(formData).subscribe(
      response => {
        debugger
        console.log(response);
        Swal.fire({
          text: 'File uploaded successfully!',
        });
      }, error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          text: 'Error uploading file',
        });
      }

    );
  }
}
