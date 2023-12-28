import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../validators/confirm-password.validators';


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

  resetForm !: FormGroup;

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password : ['' , Validators.required , Validators.minLength(8)],
      confirmPassword : ['' , Validators.required]
    },
    {
      validator : confirmPasswordValidator('password' , 'confirmPassword')
    }
    );
  }

  reset(){
    console.log(this.resetForm.value);

    //Kindly add toastr message as password changed successfully kindly login with your new password
  }

}
