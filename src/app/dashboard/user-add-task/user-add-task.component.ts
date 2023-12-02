import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add-task',
  templateUrl: './user-add-task.component.html',
  styleUrls: ['./user-add-task.component.css']
})
export class UserAddTaskComponent {

  user: User = new User
  activeTab: string = '';
  notStartedList: any[] = [];
  inProgressList: any[] = [];
  completedList: any[] = [];
  tasks: any[] =[];
  users: any[] = [];
  myFirstForm!: FormGroup;
  myForm!: FormGroup;
  userId: any;
  closeResult = '';
  name: any;
  showAddTaskForm: boolean = false;
  cancelAddTask:any;

  constructor(private accountService: UserAccountService, private formBuilder: FormBuilder, private modalService: NgbModal){
    this.myFirstForm = this.formBuilder.group({
      'taskStatus':[''],
      'userId':[''],
      'id':['']
    })

    this.myForm = this.formBuilder.group({
      'userId': ['', Validators.required],
      'projectName': ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z@.-]+[A-Za-z@.-\\s]*$')]],
      'taskName': ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z@.-]+[A-Za-z@.-\\s]*$')]],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'department': ['', Validators.required],
      'assignee': ['', Validators.required],
      'taskStatus':['', Validators.required],
      'remark': [''],
      'priority': ['', Validators.required],
      'tags': [''],
      'description': ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z@.-]+[A-Za-z@.-\\s]*$')]],
      'checkList': [''],
      'followers': ['']
    })
  }

  ngOnInit(): void {
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    console.log("uservalue", uservalue.userId);
    this.userId = localStorage.getItem('userId');
    this.getAllTask();
    this.getUserTask(this.userId);
    this.getAllUsers();
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }

  showTab(tab: string): void {
    this.activeTab = tab;
  }

  get profileVal() {
    return this.myForm.controls;
  }

  onEdit(tasks: any){
    this.myFirstForm.controls['id'].setValue(tasks.id); 
    this.myFirstForm.controls['userId'].setValue(tasks.userId); 
    this.myFirstForm.controls['taskStatus'].setValue(tasks.taskStatus);   
  }

  updateTaskStatus() {
    console.log("Hello");
    if (this.myFirstForm.valid) {
    const formValue = this.myFirstForm.value;
    const updatedTask = {
      id: formValue.id,
      userId: formValue.userId,
      taskStatus: formValue.taskStatus
    };
    
    this.accountService.updateTaskStatus(updatedTask).subscribe(
      response => {
        console.log('Task status updated successfully', response);
        Swal.fire('Task Status updated');
        this.getAllTask();
        this.closeModal();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error in updating task status'
        });
      }
    );
    } else {
    }
    }

    closeModal() {
      this.myFirstForm.reset();
      this.userId = null;
      }

      getAllTask(){
        this.accountService.getAllTask().subscribe(users =>{
           this.users = users;
        })
      }

      getUserTask(userId: any) {
        console.log("userId", userId);
          this.accountService.getUserTask(userId).subscribe(
            t => {
              console.log("user List", t);
              this.notStartedList = t.filter(user => user.taskStatus === 'Not started');
              this.inProgressList = t.filter(user => user.taskStatus === 'In progress');
               this.completedList = t.filter(user => user.taskStatus === 'completed');
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error in fetching particular user tasks',
              });
            }
          );
    }

    getAllUsers() {
      this.accountService.getAllUsers().subscribe(users => {
        console.log("users data", users);
        this.users = users;
        this.name= this.users[0].name;
        console.log("name ", this.name);
  
      },
        error => alert("Faild to featch users"))
    }

    // addTask(myForm:any) {
    //   console.log('myForm', myForm)
    //   return this.accountService.addTask(myForm).subscribe(data => {
    //     console.log(data.status);
    //     if (data.status==true) {
    //     console.log(data.status);
    //     Swal.fire("Task added successfully!");
    //     console.log("task created", Response);
    //     this.myForm.reset();
    //     // this.matDialogRef.close('save');
    //     }
    //     else{
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'add Task fail!',
    //       });
    //     }
    //   }, error => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Error creating in addTask',
    //     });
    //   }
    //   );
    // }


    addTask() {
      debugger
      console.log('myForm', this.myForm.value);
      if (this.myForm.valid) {
        return this.accountService.addTask(this.myForm.value).subscribe(data => {
          console.log(data.status);
          if (data.status == true) {
            console.log(data.status);
            Swal.fire("Task added successfully!");
            console.log("task created", Response);
            this.myForm.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'add Task fail!',
            });
          }
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error creating in addTask',
          });
        });
      } else {
        console.log('Form is not valid. Please check for validation errors.');
        Object.keys(this.myForm.controls).forEach((key) => {
          this.myForm.get(key)?.markAsTouched();
        });
         return ({ error: 'Form is not valid' });
      }
    }
    
    reset() {
      this.myForm.reset();
     }
}
