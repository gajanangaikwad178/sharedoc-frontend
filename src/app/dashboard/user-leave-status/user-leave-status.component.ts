import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-user-leave-status',
  templateUrl: './user-leave-status.component.html',
  styleUrls: ['./user-leave-status.component.css']
})
export class UserLeaveStatusComponent implements OnInit{

  currentTab: string = 'pending';
  pendingLeaves: any[] = [];
  approvedLeaves: any[] = [];
  rejectedLeaves: any[] = [];
  userId: any ; 
  leavestatus: any[] = [];

  constructor(private accountService: UserAccountService) { }

  ngOnInit(): void {
    const userobject = localStorage.getItem('userloggedData') || '';
    const uservalue = JSON.parse(userobject);

    console.log("uservaluexjhcjkcjck,", uservalue);
    this.fetchLeaves(uservalue.userId);
  }

  fetchLeaves(id: any) {
    this.accountService.getLeaveStatus(id).subscribe(data => {
      console.log("status", data)
      this.leavestatus = data;
    });
  }

}
