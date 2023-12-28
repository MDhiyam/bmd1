import { Component, OnInit , inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../validators/confirm-password.validators';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

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
  authservice = inject(AuthService);
  registerForm !: FormGroup;
  toastr = inject(ToastrService);
  router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name : ['' , Validators.required],
      email : ['' , Validators.compose([Validators.required , Validators.email])],
      password : ['' , Validators.required , Validators.minLength(8)],
      confirmPassword : ['' , Validators.required]
    },
    {
      validator : confirmPasswordValidator('password' , 'confirmPassword')
    }
    
    );
  }

  register(){
    this.authservice.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
        this.toastr.success('User Created Successfully!');
        this.registerForm.reset();
        this.router.navigate(['/']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }  

}
