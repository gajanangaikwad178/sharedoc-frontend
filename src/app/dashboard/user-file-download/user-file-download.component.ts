import { Component } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-file-download',
  templateUrl: './user-file-download.component.html',
  styleUrls: ['./user-file-download.component.css']
})
export class UserFileDownloadComponent {

  users: any[] = [];
  list: any;
  userId: any
  userRole!: any;
  role!:any;
  filePath = '';

  constructor(private accountService: UserAccountService){
    
  }

  ngOnInit(): void {
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);
    this.userId = localStorage.getItem('userId');
    console.log('adminId', this.userId);
    this.role = uservalue.Role;
    this.userRole = this.role;


    this.getDocumentList();
  }

  getDocumentList() {
    debugger
    this.accountService.getUserDocumentList(this.userId).subscribe(
      (users: any) => {
        debugger
        if (users === null) {
          this.showFileNotAvailablePopup();
        }
        this.users = users.Content;
        console.log(this.users);
      },
      error => {
        Swal.fire({

          icon: 'info',
          text: 'No files available',
          // icon: 'error',
          // text: 'Failed to fetch users',
        });
      }
    );
  }

  showFileNotAvailablePopup() {
    Swal.fire({
      icon: 'info',
      text: 'No files available',
    });
  }

 
  viewFile(fileName: string){
    debugger
    this.accountService.downlodShareFile(fileName).subscribe((response: any) => {
      debugger
      this.filePath = response;
    });
  }

  downloadFile(fileName: string) {
    debugger
    this.accountService.downlodShareFile(fileName).subscribe((response: any) => {
      debugger
      this.saveFile(response, fileName);
    });
  }

  private saveFile(data: any, fileName: string) {
    debugger
    const blob = new Blob([data], { type: 'application/octet-stream' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  }
}
