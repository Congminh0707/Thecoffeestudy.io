import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ClassService } from 'app/Services/class.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';      

const uri = 'http://localhost:3000/api/upload';
@Component({
  selector: 'app-classroom-management',
  templateUrl: './classroom-management.component.html',
  styleUrls: ['./classroom-management.component.css']
})
export class ClassroomManagementComponent implements OnInit {
  
  uploader: FileUploader = new FileUploader({url:uri});
  attachmentList: any = [];
  constructor(
    private classService: ClassService,
    private title: Title
  ) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
      this.upload(item);
    }
  }
   upload(item){
    this.classService.postFilePoint(item).subscribe(data =>{
      console.log(data);
    })
   }
  download(index) {
    var filename = this.attachmentList[index].uploadname;

    this.classService.downloadFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }

  ngOnInit(): void {
    this.title.setTitle("Up Load");

  }

}
