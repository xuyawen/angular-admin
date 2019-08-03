import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Token } from '../login/login.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {}
  loginForm: FormGroup;

  submitForm(): void {
    const LOGIN_FORM = this.loginForm;
    for (const i in LOGIN_FORM.controls) {
      if (LOGIN_FORM.controls.hasOwnProperty(i)) {
        LOGIN_FORM.controls[i].markAsDirty();
        LOGIN_FORM.controls[i].updateValueAndValidity();
      }
    }
    if (LOGIN_FORM.valid) {
      const { userName: username, password } = LOGIN_FORM.value;
      this.loginService.login({
        username,
        password
      }).subscribe((res: Token) => {
        localStorage.setItem('Token', res.token);
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      });
    } else {
      console.log('提交失败');
    }
  }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      password: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,10}$/)]]
    });
  }
}
