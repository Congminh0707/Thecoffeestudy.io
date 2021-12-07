import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
   
  constructor(private http: HttpClient) { 
    // this.ROOT_URL = 'http://52.237.98.177:1337';
    this.ROOT_URL = 'http://localhost:1337';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  put(uri: string, payload: Object) {
    return this.http.put(`${this.ROOT_URL}/${uri}`,payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(identifier: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/auth/local`, {
      identifier,
      password
    }, {
        observe: 'response'
      });
  }
  signup(username: string,email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/auth/local/register`, {
      username,
      email,
      password
    }, {
        observe: 'response'
      });
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.ROOT_URL}/auth/forgot-password`, {
      email,
    }, {
        observe: 'response'
      });
  }

  newPassword(code: string, password: string, passwordConfirmation: string) {
    return this.http.post(`${this.ROOT_URL}/auth/reset-password`, {
      code,
      password,
      passwordConfirmation
    }, {
        observe: 'response'
      });
  }
}
