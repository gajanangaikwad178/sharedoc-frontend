import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.css']
})
export class RegisterCandidateComponent implements OnInit {

  registerCandidate!: FormGroup;
  event: any;
  name: any;
  errorMessage: string | null = null;
  photo!: string;
  CV!: string;
  base64Data: string | null = null;



  constructor(
    private accountService : UserAccountService,
    private formBuilder: FormBuilder,

  ) {

    
  }

  ngOnInit(): void {
    this.registerCandidate = this.formBuilder.group({
      candidate_Name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required,Validators.minLength(10),
         Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
      qualification: ['', Validators.required],
      address: [''],
      photoFilePath: [''],
      cvFilePath: ['', Validators.required],
    });
  }

  async onFileInputChange(event: any) {
    try {
      this.base64Data = await this.convertToBase64Photo(event);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }

  convertToBase64Photo(event: any): Promise<string> {
    const file = event.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        resolve(reader.result as string); // Cast the result to string
      }, false);

      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);

      reader.readAsDataURL(file);
    });
  }


  convertToBase64CV(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    this.registerCandidate.patchValue
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
    console.log(" base 64 file pdf", future);
    return future;
  }

  async submit() {
debugger
    const cvData = await this.convertToBase64CV(this.event);

    const formObj = {
      candidate_Name: this.registerCandidate.value.candidate_Name,
      email: this.registerCandidate.value.email,
      mobileNumber: this.registerCandidate.value.mobileNumber,
      qualification: this.registerCandidate.value.qualification,
      address: this.registerCandidate.value.address,
      photoFilePath: this.base64Data,
      cvFilePath: cvData

    };

    console.log("formObj", formObj);

    this.accountService.registerCandidate(formObj).subscribe(
      response => {
debugger
        console.log(response);
        this.errorMessage = null;
        Swal.fire({
          text: 'Candidate registration successful!',
        });
        // alert("Candidate registration successful!");
        window.location.reload();
      }, error => {
        Swal.fire({
          icon: 'error',
          text: 'Candidate registration failed',
        });
        // alert("Candidate registration failed");
      }

    );
  }

  reset() {
    this.base64Data = null;
  }

}
