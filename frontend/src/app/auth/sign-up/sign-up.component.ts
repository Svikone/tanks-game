import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { HttpService } from "../../sevices/http.service";
import { EApiUrls } from "../../core/enums/api-urls.enums";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
        retype_password: ["", [Validators.required]],
      },
      { validator: this.passwordEqualityCheck }
    );
  }

  ngOnInit() {}

  get _name() {
    return this.signUpForm.get("name");
  }
  get _email() {
    return this.signUpForm.get("email");
  }
  get _password() {
    return this.signUpForm.get("password");
  }
  get _retype_password() {
    return this.signUpForm.get("retype_password");
  }

  passwordEqualityCheck(group: FormGroup) {
    let pass = group.get("password").value;
    let confirmPass = group.get("retype_password").value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmitForm() {
    const controls = this.signUpForm;
    var data = new FormData();
    data.append("name", controls.value.name);
    data.append("email", controls.value.email);
    data.append("password", controls.value.password);

    this.http.post(EApiUrls.AUTH_SIGNUP, data).subscribe(
      (value: string) => {
        this.router.navigate(["auth/signin"]);
        controls.reset();
      },
      (error) => {
        // error - объект ошибки
      }
    );
  }
}
