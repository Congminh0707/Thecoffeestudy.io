import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  roles;
  constructor() { }

  ngOnInit(): void {
    this.roles = window.localStorage.getItem('roles');
  }

}
