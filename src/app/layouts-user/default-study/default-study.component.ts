import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-study',
  templateUrl: './default-study.component.html',
  styleUrls: ['./default-study.component.css']
})
export class DefaultStudyComponent implements OnInit {

  roles = null;
  status;

  constructor() { }

  ngOnInit(): void {
    this.roles = window.localStorage.getItem('roles');
    if (!this.roles) {
      this.status = 'null';
    }
    console.log(this.status)
  }

}
