import { Component , OnInit , inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  fb = inject(FormBuilder);

  forgotForm !: FormGroup;

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required , Validators.email])]
    });
  }

  submit(){
    console.log(this.forgotForm.value);

    //Kindly add toastr message as email sent successfully please check your email
  }

}
