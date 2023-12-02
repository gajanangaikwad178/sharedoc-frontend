import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-user-investment-declaration',
  templateUrl: './user-investment-declaration.component.html',
  styleUrls: ['./user-investment-declaration.component.css']
})
export class UserInvestmentDeclarationComponent {
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  headData: any;
  [x: string]: any;
  insvestmentdeclerationByUser!: FormGroup;
  selectedFile!: File;
  userId: string | null;
  event: any;
  name: any;
  myFile!: Observable<any>;
  fileSelected: boolean = false;
  errorMessage: string | null = null;

  constructor(public fb: FormBuilder, private accountService: UserAccountService, private sant: DomSanitizer) {

    this.userId = localStorage.getItem('userId');
    console.log("userid of user", this.userId)
    this.insvestmentdeclerationByUser = fb.group({
      'filePath': [null],
      'file': [null],
    });
  }

  onFileSelected(files: FileList): void {
    this.selectedFile;
  }

  ngOnInit(): void {
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.name = uservalue.name;
  }

  // downloadexcelFile() {
  //   const fileUrl = 'assets/InvestmentDeclaration/InvestmentDeclaration.xlsx';
  //   if (fileUrl != null) {
  //     const a = document.createElement('a');
  //     a.href = fileUrl;
  //     a.download = 'InvestmentDeclaration.xlsx';
  //     a.click();
  //   }
  //   else {
  //     Swal.fire({
  //       icon: 'error',
  //       text: 'InvestmentDeclaration not uploaded from admin',
  //     });
  //   }
  // }

  downloadexcelFile() {
    this.accountService.getInvestmentDeclarationFormat().subscribe(
      response => {
        if (response.dataURI != null) {
          const fileUrl = response.dataURI;
          if (fileUrl != null) {
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = 'InvestmentDeclaration.xlsx';
            a.click();
          }
        }
        else {
          Swal.fire({
            icon: 'error',
            text: 'InvestmentDeclaration not uploaded from admin',
          });
        }
      }
    )
  }

  onChange = ($event: Event) => {
    const targat = $event.target as HTMLInputElement;
    const file: File = (targat.files as FileList)[0];
    console.log(file)
    this.convertToBase64(file)
  }

  convertToBase64(event: any): Promise<any> {
    let file = event.target.files[0];
    this.event = event;
    this.insvestmentdeclerationByUser.patchValue
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

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);

    const reader: FileReader = new FileReader();
    if (target.files[0]) {
      reader.readAsBinaryString(target.files[0]);
    } else {
      // File is deleted, reset data
      this.data = [];
      this.headData = [];
    }
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, range: 0 }));
      console.log(this.data[1]);

      this.headData = this.data[0];
      this.data = this.data.slice(1); // remove first header record

      const ws2: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[1]];
      this.readDataSheet(ws2, 10);
    };
  }

  private readDataSheet(ws: XLSX.WorkSheet, startRow: number) {
    /* save data */
    let datas = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, range: startRow }));
    console.log(datas[1]);
    let headDatas = datas[0];
    datas = datas.slice(1); // remove first header record

    for (let i = 0; i < this.data.length; i++) {
      this.data[i][this.headData.length] = datas.filter(x => x[12] == this.data[i][0])
    }
    console.log(this.data[1]);
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
          userId: this.userId,
          name: this.name,
          filePath: '',
          file: data
        };
        this.accountService.uploadInvestmentDecByUSer(formObj).subscribe(
          response => {
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
      }
        , error => {
          Swal.fire({
            icon: 'error',
            text: 'please select file',
          });
        }
      );
  }
}
