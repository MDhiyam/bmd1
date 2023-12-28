import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required , Validators.email])],
      password : ['' , Validators.required]
    });
  }

  login(){
    console.log(this.loginForm.value);
  }

}
