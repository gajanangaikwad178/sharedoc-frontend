import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form16-for-user',
  templateUrl: './form16-for-user.component.html',
  styleUrls: ['./form16-for-user.component.css']
})
export class Form16ForUserComponent implements OnInit {
  ​
    currentYear: any;
    years: number[] = [];
    pdfUrl!: string;
    pdfUrlx = '';
    userArray: String | null;
    userId: any;
    isYearSelected: boolean = false;
    showPdf = false;
    showViewer: Boolean = false;
  
    constructor(private accountService: UserAccountService) {
      this.userArray = localStorage.getItem('userId');
      console.log("userArray", this.userArray)
      this.userId = this.userArray;
      this.currentYear = new Date().getFullYear();
      console.log('currentYear', this.currentYear)
      const startYear = this.currentYear - 100; // Change the range as per your requirement
      for (let year = this.currentYear; year >= startYear; year--) {
        this.years.push(year);
      }
    }
  
    ngOnInit(): void {
      
    }
  
    viewPdf(userid: any, year: any) {
      console.log('userid', userid);
      console.log('year', year);
  
      this.accountService.getFilex(userid, year).subscribe(response => {
        console.log("response", response)
        const foldername = userid + year;
  
        if (response[0].path) {
          this.showPdf = true;
          this.pdfUrl = response[0].path;
              this.showViewer=true;
          this.pdfUrlx = response[0].dataURI;
          console.log("pdfURl", this.pdfUrlx)
          // this.modalservice.open(this.popupview,{size:'lg'})
        }
      }
        ,error=>{
          Swal.fire({
            icon: 'error',
            text: 'Form not uploaded',
          });
        }
      );
    }

    downloadexcelForm16(userid: any, year: any) {
      this.accountService.downlodform16(userid, year).subscribe(response => {
        console.log("response", response)
        const foldername = userid + year;
  
        if (response[0].path) {
          this.showPdf = true;
          this.pdfUrl = response[0].path;
          this.pdfUrlx = response[0].dataURI;
  
          if (this.pdfUrlx != null) {
            const a = document.createElement('a');
            a.href = this.pdfUrlx;
            a.download = 'Form16.pdf';
            a.click();
          }
        }
  
      }, error => {
        Swal.fire({
          icon: 'error',
          text: 'Form not uploaded',
        });
      }
      );
    }
  
  }