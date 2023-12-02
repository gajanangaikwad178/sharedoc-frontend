import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-personal-details',
  templateUrl: './user-personal-details.component.html',
  styleUrls: ['./user-personal-details.component.css']
})
export class UserPersonalDetailsComponent implements OnInit{

  activeTab: string = 'tab1';
  showTab(tab1: string): void {
    this.activeTab = tab1;
  }
  employeeForm!: FormGroup;
  orderForm!: FormGroup;
  jobForm!: FormGroup;
  educationArray: any[] = [];
  userDetails: any;
  isEmployeeFormValid: boolean = false;
  isEducationalDetails: boolean = true;
  name: any;
  userId: any;
  sscName: any;
  sscSchoolName: any;
  sscStartDate: any;
  sscEndDate: any;
  sscPercentage: any;
  hscName: any;
  hscSchoolName: any;
  hscStartDate: any;
  hscEndDate: any;
  hscPercentage: any;
  ugName: any;
  ugUniversityName: any;
  ugStartDate: any;
  ugEndDate: any;
  ugPercentage: any;
  pgName: any;
  pgUniversityName: any;
  pgStartDate: any;
  pgEndDate: any;
  pgPercentage: any;
  diplomaName: any;
  diplomaStartDate: any;
  diplomaEndDate: any;
  diplomaPercentage: any;
  diplomaUniversityName: any;
  companyName: any;
  companyDesignation: any;
  companyFromDate: any;
  companyTodate: any;

  //ssc1: any;
  sscname1: any;
  sscSchoolName1: any;
  sscStartDate1: any;
  sscEndDate1: any;
  sscPercentage1: any;
  hscName1: any;
  hscSchoolName1: any;
  hscEndDate1: any;
  hscStartDate1: any;
  hscPercentage1: any;
  ugGraduation1: any;
  ugUniversityName1: any;
  ugStartDate1: any;
  ugEndDate1: any;
  ugPercentage1: any;
  pgName1: any;
  pgUniversityName1: any;
  pgStartDate1: any;
  pgEndDate1: any;
  pgPercentage1: any;
  diplomaUniversityName1: any;
  diplomaName1: any;
  diplomaStartDate1: any;
  diplomaEndDate1: any;
  diplomaPercentage1: any;
  date: any;

  constructor(private formBuilder: FormBuilder,
    private accountService: UserAccountService,
    private route: ActivatedRoute,
    private dataService: DataServiceService) {

  }

  ngOnInit() {

    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([]) // Initialize with an empty form array
    });

    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createItemFormGroup()]) // Add an empty form group initially
    });

    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.name = uservalue.name;
    this.userId = localStorage.getItem('userId');

    var user = {
      userId: this.userId
    }

    this.accountService.postPersonalData(user).subscribe(data => {
      console.log('user Data', data);
      this.userDetails = data;
      this.populateForm(); // Populate the form fields after receiving the user details
    });

    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-z@.-]*$/)]],
      email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      bloodGroup: [''],
      maritalStatus: [''],
      address: [''],
      userId: ['']
    });

    this.employeeForm.valueChanges.subscribe(() => {
      this.isEmployeeFormValid = this.employeeForm.valid;
    });

    this.jobForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyDesignation: ['', Validators.required],
      companyFromDate: ['', Validators.required],
      companyTodate: ['', Validators.required],
    });

  }

  populateForm() {
    const user = JSON.parse(this.userDetails);
    this.employeeForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      bloodGroup: user.bloodGroup,
      maritalStatus: user.maritalStatus,
      address: user.address
    });

    this.jobForm.patchValue({
      companyName: user.companyName,
      companyDesignation: user.companyDesignation,
      companyFromDate: user.companyFromDate,
      companyTodate: user.companyTodate
    });

    this.sscname1 = user.sscName;
    this.sscSchoolName1 = user.sscSchoolName;
    this.sscStartDate1 = user.sscStartDate;
    this.sscEndDate1 = user.sscEndDate;
    this.sscPercentage1 = user.sscPercentage;

    this.hscName1 = user.hscName;
    this.hscSchoolName1 = user.hscSchoolName;
    this.hscStartDate1 = user.hscStartDate;
    this.hscEndDate1 = user.hscEndDate;
    this.hscPercentage1 = user.hscPercentage;

    this.ugGraduation1 = user.ugName;
    this.ugUniversityName1 = user.ugUniversityName;
    this.ugStartDate1 = user.ugStartDate;
    this.ugEndDate1 = user.ugEndDate;
    this.ugPercentage1 = user.ugPercentage;

    this.pgName1 = user.pgName;
    this.pgUniversityName1 = user.pgUniversityName;
    this.pgStartDate1 = user.pgStartDate;
    this.pgEndDate1 = user.pgEndDate;
    this.pgPercentage1 = user.pgPercentage;

    this.diplomaName1 = user.diplomaName;
    this.diplomaUniversityName1 = user.diplomaCollegeName;
    this.diplomaStartDate1 = user.diplomaStartDate;
    this.diplomaEndDate1 = user.diplomaEndDate;
    this.diplomaPercentage1 = user.diplomaPercentage;

    this.isEducationalDetails = !(
      this.sscname1 || this.hscName1 || this.ugGraduation1 ||
      this.pgName1 || this.diplomaName1
    );
  }

  get profileVal() {
    return this.employeeForm.controls;
  }

  submit(employee: any, job: any) {
    debugger
    const educationArrayItems = this.orderForm.get('items') as FormArray;
    const educationalDetails = educationArrayItems.value;
    if (educationArrayItems.length === 0) {
      educationArrayItems.push(this.createItemFormGroup());
    }
    console.log(educationArrayItems, "educationArrayItems");

    const formArray = this.orderForm.get('items') as FormArray;
    educationArrayItems.controls.forEach((control) => {
      this.educationArray.push(control.value);
    });
    console.log('educationalArry', this.educationArray);
    const sscItem = this.educationArray.find((item: any) => item.standard === 'SSC');
    const hscItem = this.educationArray.find((item: any) => item.standard === 'HSC');
    const ugItem = this.educationArray.find((item: any) => item.standard === 'UgGraduation');
    const pgItem = this.educationArray.find((item: any) => item.standard === 'pgGraduation');
    const diplomaItem = this.educationArray.find((item: any) => item.standard === 'Diploma');
    if (sscItem) {
      this.sscPercentage = sscItem.percentage;
      this.sscStartDate = sscItem.startDate;
      this.sscEndDate = sscItem.endDate;
      this.sscName = sscItem.standard;
      this.sscSchoolName = sscItem.universityName;
    }
    if (hscItem) {
      this.hscPercentage = hscItem.percentage;
      this.hscStartDate = hscItem.startDate;
      this.hscEndDate = hscItem.endDate;
      this.hscName = hscItem.standard;
      this.hscSchoolName = hscItem.universityName;
    }
    if (ugItem) {
      this.ugPercentage = ugItem.percentage;
      this.ugStartDate = ugItem.startDate;
      this.ugEndDate = ugItem.endDate;
      this.ugName = ugItem.standard;
      this.ugUniversityName = ugItem.universityName;
    }
    if (pgItem) {
      this.pgPercentage = pgItem.percentage;
      this.pgStartDate = pgItem.startDate;
      this.pgEndDate = pgItem.endDate;
      this.pgName = pgItem.standard;
      this.pgUniversityName = pgItem.universityName;
    }
    if (diplomaItem) {
      this.diplomaPercentage = diplomaItem.percentage;
      this.diplomaStartDate = diplomaItem.startDate;
      this.diplomaEndDate = diplomaItem.endDate;
      this.diplomaName = diplomaItem.standard;
      this.diplomaUniversityName = diplomaItem.universityName;
    }
    const obj = {

      userId: this.userId || null,
      name: employee.name || null,
      email: employee.email || null,
      phone: employee.phone || null,
      dob: employee.dob || null,
      gender: employee.gender || null,
      bloodGroup: employee.bloodGroup || null,
      maritalStatus: employee.maritalStatus || null,
      address: employee.address || null,

      sscName: this.sscName || null,
      sscSchoolName: this.sscSchoolName || null,
      sscStartDate: this.sscStartDate || null,
      sscEndDate: this.sscEndDate || null,
      sscPercentage: this.sscPercentage || null,

      hscSchoolName: this.hscSchoolName || null,
      hscName: this.hscName || null,
      hscStartDate: this.hscStartDate || null,
      hscEndDate: this.hscEndDate || null,
      hscPercentage: this.hscPercentage || null,

      ugUniversityName: this.ugUniversityName || null,
      ugName: this.ugName || null,
      ugStartDate: this.ugStartDate || null,
      ugEndDate: this.ugEndDate || null,
      ugPercentage: this.ugPercentage || null,

      pgUniversityName: this.pgUniversityName || null,
      pgName: this.pgName || null,
      pgStartDate: this.pgStartDate || null,
      pgEndDate: this.pgEndDate || null,
      pgPercentage: this.pgPercentage || null,

      diplomaCollegeName: this.diplomaUniversityName || null,
      diplomaName: this.diplomaName || null,
      diplomaStartDate: this.diplomaStartDate || null,
      diplomaEndDate: this.diplomaEndDate || null,
      diplomaPercentage: this.diplomaPercentage || null,

      companyName: job.companyName || null,
      companyDesignation: job.companyDesignation || null,
      companyFromDate: job.companyFromDate || null,
      companyTodate: job.companyTodate || null,
    }
    console.log('object', obj);
    this.accountService.postEmployeeData(obj).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data updated successfully',
      });
      console.log('data', data);
      // Reset the forms and other properties after successful API call
      this.employeeForm.reset();
      this.orderForm.reset();
      this.jobForm.reset();
      this.educationArray = [];
    },
      (error) => {
        // API call resulted in an error, show error message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update data. Please try again later.',
        });
        console.error('Error occurred:', error);
      }
    );
  }


  createItemFormGroup(): FormGroup {
    return this.formBuilder.group({
      standard: ['', Validators.required],
      universityName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      percentage: ['', Validators.required],
    });
  }

  get itemsFormArray(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem(educationItem?: any) {
    const itemFormGroup = this.formBuilder.group({
      standard: [educationItem ? educationItem.standard : null, Validators.required],
      universityName: [educationItem ? educationItem.universityName : null],
      startDate: [educationItem ? educationItem.startDate : null],
      endDate: [educationItem ? educationItem.endDate : null],
      percentage: [educationItem ? educationItem.percentage : null]
    });
    this.itemsFormArray.push(itemFormGroup);
  }

  removeGroup(index: number) {
    this.itemsFormArray.removeAt(index);
  }


}