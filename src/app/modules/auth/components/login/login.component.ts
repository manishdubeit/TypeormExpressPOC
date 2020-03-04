import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { style, animate, transition, trigger } from "@angular/animations";
import { UserDataService } from "../../../../shared/services/user-data.service";
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
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
export class LoginComponent implements OnInit {
  @ViewChild("password", { static: false })
  passwordInput: ElementRef;
  public loginForm: FormGroup;
  public resetForm: FormGroup;
  public loginSubmitted: boolean = false;
  public loginFormDisabled = false;
  public resetFormDisabled = false;
  public showPassword = false;
  public toggleForm = false;
  public resetLink = false;
  public usernotPresent: string = "";
  public resetNotFound: string = "";
  public toggleShow: boolean = false;
  public lmsLogo: string = "";

  constructor(
    private _authService: AuthService,
    private _userData: UserDataService,
    private _router: Router
  ) {
    try {
      if (this._userData.LS.get("bawUserData")) {
        this._router.navigate(["/home"]);
      }
    } catch (e) {}
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required)
    });

    this.resetForm = new FormGroup({
      username: new FormControl(null, [Validators.required])
    });

    const href = window.location.href.split("/");
    if (href[href.length - 1].includes("forgot")) {
      this.toggleForm = true;
      this.resetLink = false;
    }

    if (href[href.length - 1].includes("reset-link")) {
      this.toggleForm = false;
      this.resetLink = true;
    }
  }

  onEye() {
    if (this.showPassword) {
      this.showPassword = false;
      this.passwordInput.nativeElement.type = "password";
    } else {
      this.showPassword = true;
      this.passwordInput.nativeElement.type = "text";
    }
  }

  public obj: any = {};

  onSubmit(): void {
    this.loginSubmitted = true;
    console.log("loginForm value", this.loginForm);
    if (this.loginForm.valid) {
      this._authService.onLogin(this.loginForm.value).subscribe(
        data => {
          console.log(data);
          this.loginSubmitted = false;
          if (data.success) {
            const loginData = data;
            this._userData.setUserData = loginData;
            this.usernotPresent = "";
            this.loginFormDisabled = true;
            this._router.navigate(["/home"]);
          } else if (!data.success) {
            this.usernotPresent = data.error;
            setTimeout(() => {
              this.usernotPresent = "";
            }, 2500);
            this.loginForm.get("password").reset();
            this.loginForm.updateValueAndValidity();
          }
        },
        error => {
          console.log(error);
          this.loginSubmitted = false;
        }
      );
    }
  }

  onResetSubmit(): void {
    if (this.resetForm.valid) {
      //   this._router.navigate(["/auth/reset-link"]);
      //   this._authService.onForgotPassword(this.resetForm.value).subscribe(
      //     data => {
      //       if (data.success) {
      //         this.resetFormDisabled = true;
      //         this._router.navigate(["/auth/reset-link"]);
      //       } else if (!data.success) {
      //         this.resetNotFound = data.message;
      //       }
      //     },
      //     error => {
      //       console.log(error);
      //     }
      //   );
    }
  }

  onResetPassword(): void {
    this._router.navigate(["/auth/forgot"]);
  }

  onLogin(): void {
    this.resetLink = false;
    this.toggleForm = false;
    this.loginFormDisabled = false;
    this._router.navigateByUrl("/auth/login");
  }

  takeToDestination(destination?: string) {
    if (destination === "crm") {
      window.open(this.obj.crm_url, "_blank");
    } else {
      // this._userData.setUserData = this.obj;
      this._router.navigate(["/home"]);
    }
  }
}
