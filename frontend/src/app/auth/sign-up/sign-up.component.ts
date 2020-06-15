import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,  } from '@angular/forms';
import { HttpService } from '../../sevices/http.service';
import { EApiUrls } from '../../core/enums/api-urls.enums';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService
  ) {
      this.signUpForm = this.fb.group({
        name :  [''],
        email :  [''],
        password : [''],
        retype_password : [''],
      });
    }

  ngOnInit() {
  }

  onSubmitForm() {
    const controls = this.signUpForm
    var data = new FormData();
    data.append('username', controls.value.name)
    data.append('email', controls.value.email)
    data.append('password', controls.value.password)

    this.http.post(EApiUrls.AUTH_SIGNUP,data).subscribe((value: string) =>{
      console.log(value) 
      controls.reset()

    },
    error => {
      // error - объект ошибки
    });
  }
}
