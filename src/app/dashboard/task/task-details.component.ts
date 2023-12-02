import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: []
})
export class TaskDetailsComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

}
