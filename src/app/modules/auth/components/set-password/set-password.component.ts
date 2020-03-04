// import { ApiListingService } from './../../../core/services/api-listing.service';
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { style, animate, transition, trigger } from "@angular/animations";

type ISetpassword = { password: string; token: string };
@Component({
  templateUrl: "./set-password.component.html",
  styleUrls: ["./../login/login.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(":leave", [animate(500, style({ opacity: 0 }))])
    ])
  ]
})
export class SetPasswordComponent implements OnInit {
  public setPasswordForm: FormGroup;
  public hasPasswordset = false;
  private setPassword: ISetpassword;
  private tokenStr: string;
  public resetPasswordError: string = "";
  public setFormDisabled = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) // private _api: ApiListingService
  {}

  ngOnInit(): void {
    this.setPasswordForm = new FormGroup({
      passwordMatch: new FormGroup(
        {
          newPassword: new FormControl(null, [Validators.required]),
          confirmPassword: new FormControl(null, [Validators.required])
        },
        { validators: this.passwordMatchValidator }
      )
    });

    const key = this._route.snapshot.queryParamMap.get("key");
    if (key) {
      this.tokenStr = key;
    }
  }

  passwordMatchValidator(
    t: AbstractControl
  ): { [key: string]: boolean } | null {
    const npassword = t.get("newPassword");
    const cpassword = t.get("confirmPassword");

    if (npassword.pristine || cpassword.pristine) {
      return null;
    }
    if (npassword.value !== cpassword.value) {
      return { passwordNotMatched: true };
    }
    return null;
  }

  onSetPassword(): void {
    this.setPassword = {
      password: this.setPasswordForm.value.passwordMatch.confirmPassword,
      token: this.tokenStr
    };
    this._router.navigate(["/auth/login"]);
  }
}
