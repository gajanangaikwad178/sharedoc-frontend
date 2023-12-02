import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  user: User = new User
  activeTab: string = '';
  notStartedList: any[] = [];
  inProgressList: any[] = [];
  completedList: any[] = [];
  tasks: any[] = [];
  users: any[] = [];
  myForm!: FormGroup;
  myFirstForm!: FormGroup;
  userId: any;
  name: any;
  controlName: any;
  selectedUser: any;
  // name:any[] =[]
  closeResult = '';
  showAddTaskForm: boolean = false;
  cancelAddTask:any;

  constructor(private accountService: UserAccountService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    ​this.myFirstForm = this.formBuilder.group({
          'taskStatus':[''],
          'userId':[''],
          'id':['']
        })

    this.myForm = this.formBuilder.group({
      'projectName': ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z@.-]+[A-Za-z@.-\\s]*$')]],
      'taskName': ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z@.-]+[A-Za-z@.-\\s]*$')]],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'department': ['', Validators.required],
      'remark': [''],
      'priority': ['', Validators.required],
      'tags': [''],
      'description': ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z@.-]+[A-Za-z@.-\\s]*$')]],
      'checkList': [''],
      'followers': [''],
      'taskStatus':['', Validators.required],
      'userId':['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllTask();
    this.getAllUsers();
  }

  // onEdit(tasks: any) {
  //   this.myForm.patchValue(tasks);
  // }

  showTab(tab: string): void {
    this.activeTab = tab;
  }

  get profileVal() {
    return this.myForm.controls;
  }

  getAllTask() {
    this.accountService.getAllTask().subscribe(users => {
      this.notStartedList = users.filter(user => user.taskStatus === 'Not started');
      this.inProgressList = users.filter(user => user.taskStatus === 'In progress');
      this.completedList = users.filter(user => user.taskStatus === 'completed');
    })
  }

  onEdit(tasks: any) {
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
          // this.closeModal();
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
      // Handle form validation errors
    }
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // addTask(myForm: any) {
  //   debugger
  //   console.log('myForm', myForm)
  //   return this.accountService.addTask(myForm).subscribe(data => {
  //     console.log(data.status);
  //     if (data.status == true) {
  //       console.log(data.status);
  //       Swal.fire("Task added successfully!");
  //       console.log("task created", Response);
  //       this.myForm.reset();
  //       // this.matDialogRef.close('save');
  //     }
  //     else {
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
  


  // addTask() {
  //   debugger
  //   if (this.myForm.valid) {
  //     const formData = this.myForm.value;
  //     this.accountService.addTask(formData).subscribe(data => {
  //       if (data.status === true) {
  //         Swal.fire("Task added successfully!");
  //         this.myForm.reset();
  //         this.getAllTask();
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Add Task failed!',
  //         });
  //       }
  //     }, error => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Error creating task in addTask',
  //       });
  //     });
  //   } else {
  //     // Handle form validation errors here, e.g., display an error message.
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Validation Error',
  //       text: 'Please fill in all required fields correctly.',
  //     });
  //   }
  // }

  getAllUsers() {
    this.accountService.getAllUsers().subscribe(users => {
      console.log("users data", users);
      this.users = users;
      // for (var i = 0; i < users.length; i++) {
      // this.users.push(users[i].name)
      // }
      console.log(this.users,"this.users org");
      
      this.name = this.users[0].name;
      console.log("name ", this.name);
    },
      error => alert("Faild to featch users"))
  }

  submitForm() {
    if (this.myForm.valid) {
      console.log("Selected user:", this.selectedUser);
      console.log("Form value:", this.myForm.value);
    } else {
      // Handle form validation errors
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.myForm.patchValue({ userId: user.userId });
  }

  reset(){
    this.myForm.reset()
  }
}
