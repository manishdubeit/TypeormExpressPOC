import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import * as AuthComponents from "./components/index";

const authRoute: Routes = [
  {
    path: "",
    children: [
      { path: "login", component: AuthComponents.LoginComponent },
      { path: "forgot", component: AuthComponents.LoginComponent },
      { path: "reset-link", component: AuthComponents.LoginComponent },
      { path: "set-password", component: AuthComponents.SetPasswordComponent },
      { path: "404", component: AuthComponents.NotFoundComponent },
      {
        path: "**",
        redirectTo: "login"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoute)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
