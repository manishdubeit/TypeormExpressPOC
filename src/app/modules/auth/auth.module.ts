import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import * as AuthComponents from "./components";

@NgModule({
  declarations: [
    AuthComponents.LoginComponent,
    AuthComponents.NotFoundComponent,
    AuthComponents.SetPasswordComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule]
})
export class AuthModule {}
