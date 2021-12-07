import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private webReqService: WebRequestService,
    private http: HttpClient
  ) { }

  
}
