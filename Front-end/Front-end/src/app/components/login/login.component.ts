import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService){}
  loginForm = new FormGroup({
    email: new FormControl ('', [Validators.required , Validators.email]),
    password: new FormControl ('', Validators.required)

  })
  get email(){
    return this.loginForm.controls['email']
  }
  get password(){
    return this.loginForm.controls['password']
  }


  login() {
    if (this.loginForm.valid) {
      let user:any = this.loginForm.value;
      this.authService.login(user);
    }
  }

  logout() {
    this.authService.logout();
  }
}
