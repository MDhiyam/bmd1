import { Component, OnInit , inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../validators/confirm-password.validators';

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

  registerForm !: FormGroup;

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
    console.log(this.registerForm.value);
  }  

}
