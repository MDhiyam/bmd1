import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../validators/confirm-password.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  visible:boolean = true;
  visible1:boolean = true;
  changetype:boolean = true;
  changetype1:boolean = true;


  viewPass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  viewPass1(){
    this.visible1 = !this.visible1;
    this.changetype1 = !this.changetype1;
  }

  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  toastr = inject(ToastrService);
  authService = inject(AuthService);
  resetForm !: FormGroup;
  token !: string;

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password : ['' , Validators.required , Validators.minLength(8)],
      confirmPassword : ['' , Validators.required]
    },
    {
      validator : confirmPasswordValidator('password' , 'confirmPassword')
    }
    );
    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token'];
      console.log(this.token);
    })
  }

  reset(){
    let resetObj = {
      token : this.token,
      password : this.resetForm.value.password
    }
    this.authService.resetPasswordService(resetObj)
    .subscribe({
      next:(res)=>{
        this.toastr.success('Password changed successfully kindly login with your new password!');
        this.resetForm.reset();
        this.router.navigate(['/']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
