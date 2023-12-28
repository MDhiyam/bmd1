import { Component , OnInit , inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  authService = inject(AuthService);
  forgotForm !: FormGroup;

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required , Validators.email])]
    });
  }

  submit(){
    this.authService.forgotPasswordService(this.forgotForm.value)
    .subscribe({
      next:(res)=>{
        this.toastr.success('Email sent successfully kindly check your email!');
        this.forgotForm.reset();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
