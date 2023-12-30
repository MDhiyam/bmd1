import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  visible:boolean = true;
  changetype:boolean = true;

  viewPass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  loginForm !: FormGroup;
  toastr = inject(ToastrService);
  router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required , Validators.email])],
      password : ['' , Validators.required]
    });
  }

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        this.toastr.success('User logged in Successfully!');
        localStorage.setItem("user_id", res.data_id);
        // this.authService.isLoggeIn$.next(true);
        this.loginForm.reset();
        this.router.navigate(['home']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
