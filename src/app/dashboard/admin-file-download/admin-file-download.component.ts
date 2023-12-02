import { Component } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-file-download',
  templateUrl: './admin-file-download.component.html',
  styleUrls: ['./admin-file-download.component.css']
})
export class AdminFileDownloadComponent {

  users: any[] = [];
  list: any;
  userId: any
  userRole!: any;
  role!:any;

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

  isADMIN(): boolean {
    return this.userRole === 'ADMIN'
  }

  isUser(): boolean {
    return this.userRole === 'User'
  }

  getDocumentList() {
    debugger
    this.accountService.getDocumentList(this.userId).subscribe(
      (users: any) => {
        debugger
        this.users = users.Content;
        // this.data1 = users;
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

  // download(fileName:any){
  //   debugger
  //   this.accountService.downlodFile(fileName).subscribe((response:any) => {
  //     debugger
  //     const a = document.createElement('a');
  //     a.href = response;
  //     a.download = response;
  //     a.click();
    
  //   })
  // }

  downloadFile(fileName: string) {
    debugger
    this.accountService.downlodFile(fileName).subscribe((response: any) => {
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
  filePath = '';
  viewFile(fileName: string){
    this.accountService.downlodFile(fileName).subscribe((response: any) => {
      debugger
      this.filePath = response;
    });
  }
}
