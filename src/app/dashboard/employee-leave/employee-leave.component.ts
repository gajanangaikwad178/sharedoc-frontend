import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit{

  [x: string]: any;
  ​
    @ViewChild('LeaveModel', { static: false })
    modal!: ElementRef<any>; 
    
    options: string[] = ['', 'approved', 'rejected'];
    selectedItem: any;
    user: User = new User
    allLeaveRequests:any ={};
    users: any[] = [];
    userId: any;
    formValue !: FormGroup;
    activeTab: string = '';
    pendingList: any[] = [];
    approvedList: any[] = [];
    rejectedList: any[] = [];
    
    
    constructor(
      private accountService : UserAccountService,
       private router: Router, private formBuilder: FormBuilder){
        this.formValue = formBuilder.group({
          'userId': [null],
          'employeeReason': [null],
          'hrReason': [null],
          'status':[null],
        });
       }
  ​
    showTab(tab: string): void {
      this.activeTab = tab;
    }
  ​
    ngOnInit(): void {
      this.getAllLeaveRequests();
    }
  ​
    uploadsalaryslips: boolean = false
    createholidays: boolean = false
    employeeleave: boolean = false
  ​
  ​
    employeeLeaveclick() {
      this.employeeleave = true;
      this.createholidays = false;
      this.uploadsalaryslips = false;
    }
  ​
    getAllLeaveRequests(){
      this.accountService.getAllLeaveRequests().subscribe(users =>{
         /*this.users = users;*/
         this.pendingList = users.filter(user => user.status === 'pending');
         this.approvedList = users.filter(user => user.status === 'approved');
         this.rejectedList = users.filter(user => user.status === 'rejected');
      })
    }
    
    onEdit(users: any){
      debugger
      this.userId = users.userId;
        this.formValue.controls['hrReason'].setValue(users.hrReason); 
        this.formValue.controls['status'].setValue(users.status); 
        
    }
  ​
    /*updateStatus() {
      const status = this.formValue.value.status;
      const hrReason = this.formValue.value.hrReason;
      debugger;
      console.log('update employee', this.users);
      this.registerService.updateStatus(this.userId, status, hrReason).subscribe(
        (response: HttpResponse<any> | HttpErrorResponse) => {
          console.log('Response status:', response.status);
          try {
            if (response instanceof HttpResponse) {
              if (response.status === 200) {
                try {
                  const responseBody = JSON.parse(response.body); // Parse the response body
                  console.log('Leave updated:', responseBody);
                  alert('Leave updated');
                  this['modalRef'].hide();
                  this.getAllLeaveRequests();
                } catch (parseError) {
                  console.error('Error parsing response body:', parseError);
                  // Handle the parsing error here
                }
              } else {
                console.log('Error:', response);
              }
            } else {
              console.log('HTTP error:', response);
              // Handle the HTTP error here
            }
          } catch (error) {
            // Handle any other processing errors
            console.error('Error processing response:', error);
          }
        },
        (error: any) => {
          console.log('HTTP error:', error);
          // Handle the HTTP error here
        }
      );
    }*/
  ​
  //   onEdit(tasks: any){
  //     this.myForm.controls['id'].setValue(tasks.id); 
  //     this.myForm.controls['userId'].setValue(tasks.userId); 
  //     this.myForm.controls['taskStatus'].setValue(tasks.taskStatus);   
  // }
  ​
    updateStatus() {
      const status = this.formValue.value.status;
      const hrReason = this.formValue.value.hrReason;
      console.log("avinash " ,this.userId)
      this.accountService.updateStatus(this.userId, status, hrReason).subscribe(response => {
        debugger
            console.log('Data updated successfully', response);
            Swal.fire({
              text: 'Leave update successfull!',
            });
            this.getAllLeaveRequests();
            // Handle the response or perform any other operations
          },error=>{
            Swal.fire({
              icon: 'error',
              text: 'Leave update fail',
            });
          }
        );
    }
  ​
  ​
  ​
   }
  ​
