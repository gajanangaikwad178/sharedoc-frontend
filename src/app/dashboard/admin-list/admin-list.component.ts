import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {

  users: any[] = [];
  adminPermission!: FormGroup;
  data1: any;
  token:any;
  userForms: FormGroup[] = [];
viewChange?:boolean;
uploadChange?:boolean;
downloadChange?:boolean;
updateResponse:any;

  constructor(private accountService: UserAccountService,private formBuilder: FormBuilder,private http: HttpClient){
    this.adminPermission = this.formBuilder.group({
      userId: [''],
      view: [],
      upload: [],
      download: []
    });
  }

  

  ngOnInit(): void {

    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.token = uservalue.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${this.token}`
    });

    const requestOptions = { headers: headers };
  console.log(requestOptions);
    this.getAllAdminList();
  }

  toggleViewPermission(user: any, view:any) {
    if(view !=true){
      view =true;
      this.viewChange = view;
      this.uploadChange = user.upload;
      this.downloadChange = user.download;
    }else{
      view = false;
      this.viewChange = view;
      this.uploadChange = user.upload;
      this.downloadChange = user.download;
    }
  }

  toggleUploadPermission(user: any, upload: any) {
    if(upload !=true){
      upload =true;
      this.uploadChange = upload;
      this.downloadChange = user.download;
      this.viewChange = user.view;
    }else{
      upload = false;
      this.uploadChange = upload;
      this.downloadChange = user.download;
      this.viewChange = user.view;
    }
  }

  toggleDownloadPermission(user: any, download: any) {
    if(download !=true){
      download =true;
      this.downloadChange = download;
      this.viewChange = user.view;
      this.uploadChange = user.upload;
    }else{
      download = false;
      this.downloadChange = download;
      this.viewChange = user.view;
      this.uploadChange = user.upload;
    }
  }
  
  getAllAdminList() {
    debugger
    this.accountService.getAllAdminList().subscribe(
      (users:any) => {
        debugger
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

  submit(formValue: any, users: any) {
    console.log('Form Value:', formValue);
    debugger

    const updateRequest = {
        id:users.id,
        userId: users.userId,
        name: users.name,
        view: this.viewChange, 
        upload:  this.uploadChange,
        download: this.downloadChange,
        password:users.password,
        role:users.role,
        email:users.email,
        phone:users.phone,
        gender:users.gender
    }
    this.accountService.updateAdminPermission(updateRequest).subscribe(
      response => {
        debugger
        console.log(response);
        this.updateResponse = response;
        if(response){
          Swal.fire(this.updateResponse.message);
          formValue.resetForm();
        }else{
          Swal.fire(this.updateResponse.message); 
        }
      })
    // }
  }

}
