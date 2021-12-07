import { ClassDetail } from './../../models/class-detail';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Class } from 'app/models/Class.model';
import { Level } from 'app/models/Level-class.model';
import { ClassService } from 'app/Services/class.service';
import { HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.css']
})
export class ClassScheduleComponent implements OnInit {

  form: FormGroup;
  roles;
  id;
  User;
  class: Class[];
  level: Level[];
  classDetail: ClassDetail[];
  selectedView: string;
  idTeacher;
  userId;
  classId;
  qty: number;
  status = false;
  statusClass = false;
  myFile: File

  constructor(
    private classService: ClassService,
    //private http: HttpRequest
  ) { }

  ngOnInit(): void {
    this.roles = window.localStorage.getItem('roles');//Get roles từ local Storage
    this.userId = window.localStorage.getItem("userId");//get userId từ local Storage
    this.id = window.localStorage.getItem('id');//
    // this.classService.getLecturers().subscribe(Lecturers =>{//Get các user có roles là lecturers
    //   console.log(Lecturers);
    // })
    this.classService.getLevel().subscribe((level: any[]) => {//gọi hàm get level của khóa học mỗi khi reload
      this.level = level;//gán res cho mảng level
      //console.log(level);
    });
    this.getClassDetail();//gọi hàm getClassdetail mỗi khi reload;
  }
  //Đây là đăng kí của học viên
  SignupToLearn(classId) {//Tham số truyền vào là class Id
    this.classDetail.forEach(element => {//chạy vòng lạp để xác định class deatil của class cần signup
      if (element._classId == classId) {//true/false
        //console.log(element)
        this.qty = element.qty; // Gán số lượng
        this.qty--; //Giảm 1
        //console.log(this.qty);
        //Gọi hàm signup post to server tham số truyền vào userId, status là trạng thái đóng tiền(T/F, Rồi/Chưa) và classID
        if (this.qty >= 0) {//nếu sốlượng sau khi trừ >=0 thì mới thực hiện
          this.classService.signupToLearn(this.userId, this.status, this.qty, classId).subscribe((res: HttpResponse<any>) => {
            console.log(res);
            window.alert(res.body.message);//Thông báo đăng kí thành công
            //window.location.reload();//Reload để cập nhật dữ liệu
          }, (error) => {//Trả về lỗi từ server nếu fail
            console.log(error.error);
          })
        }
        else {//return nếu lớp đã đủ học viên;
          window.alert("Lớp học đã đủ học viên!");//Thông báo lớp đã đủ học viên
        }
        //console.log(classId);
      }
    })

  }
  //Đây là đăng kí của giảng viên
  SignupToTeach(classId) {
    //console.log(classId)
    this.classService.updateTeacher(classId, this.userId).subscribe(data => {
      //console.log(data);
      window.location.reload();//Tải lại trang web để update dữ liệu.
    }, (error) => {
      if (error.status === 401) {
        window.alert("Không được phép!");//Thông báo lỗi
      }
    });
  }
  //Hiển thị danh sác lớp theo level
  clickClass() {
    //gọi hàm getClass theo id level = selectedView được lấy từ [ngModel]
    this.classService.getClass(this.selectedView).subscribe((classs: any[]) => {
      this.class = classs;//gán res cho mảng class
      //this.check();
    }, (error) => {
      if (error.status === 401) {
        window.alert("Không được phép!");//Thông báo lỗi
      }
    });
  }
  //get chi tiết lớp học
  getClassDetail() {//get chi tiết lớp học
    this.classService.getClassDetail().subscribe((classDetail: []) => {
      this.classDetail = classDetail;
      //console.log(this.classDetail);
    }, (error) => {
      if (error.status === 401) {
        window.alert("Không được phép!");//Thông báo lỗi
      }
    });
  }
  //Hủy dạy học.
  cancel(classId) {
    this.classService.updateTeacher(classId, null).subscribe((response: any) => {
      console.log(response);
      window.location.reload();
    }, (error) => {
      if (error.status === 401) {
        window.alert("Không được phép!");//Thông báo lỗi
      }
    });
  }
  //Check xem teac
  check() {
    this.class.forEach(element => {
      console.log(element)
      this.idTeacher = element._teacherId;
      //console.log(this.idTeacher);
    })
  }
  
}
