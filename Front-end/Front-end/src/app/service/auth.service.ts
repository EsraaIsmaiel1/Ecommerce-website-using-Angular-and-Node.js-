import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Iuser } from '../models/iuser';
import { CookieService } from 'ngx-cookie-service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient , private cookieService : CookieService ,private toastr: ToastrService) { }

  login(user: Iuser) {
      this.http.post<any>('http://localhost:8000/auth/login', user)
        .pipe(
          tap(response => {
              if (response.email && response.password) {
                this.cookieService.set('token', response.token, { expires: 1 });
                this.loggedIn.next(true);
                this.toastr.success('Login successful','success' , {timeOut: 2000});
                this.router.navigate(['/products']);
              }else {
                this.toastr.error('Invalid email or password', 'Error', { timeOut: 2000 });
              }
          })
        )
        .subscribe();
    
  }

  logout() {
    this.cookieService.delete('token');
    this.loggedIn.next(false);
    this.toastr.success('Logout successful','success' , {timeOut: 2000})
    this.router.navigate(['/login']);
  }
}
