import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthguardService } from "./shared/services/auth-guard.service";

import { BlankComponent } from "./modules/layout/blank/blank.component";
import { FullComponent } from "./modules/layout/full/full.component";
const AppRoutes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      {
        path: "home",
        // canActivate: [AuthguardService, roleGuardService],
        canActivate: [AuthguardService],
        loadChildren: () =>
          import("./modules/home/home.module").then(m => m.HomeModule)
      },
      {
        path: "about",
        canActivate: [AuthguardService],
        loadChildren: () =>
          import("./modules/about/about.module").then(m => m.AboutModule)
      },
      {
        path: "contact",
        canActivate: [AuthguardService],
        loadChildren: () =>
          import("./modules/contact/contact.module").then(m => m.ContactModule)
      },
      {
        path: "todos",
        canActivate: [AuthguardService],
        loadChildren: () =>
          import("./modules/todos/todo.module").then(m => m.TODOModule)
      }
    ]
  },
  {
    path: "",
    component: BlankComponent,
    children: [
      {
        path: "auth",
        loadChildren: () =>
          import("./modules/auth/auth.module").then(m => m.AuthModule)
      }
    ]
  }
  // { path: "**", redirectTo: "/auth/404" }
];
@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes, {
      // preloadingStrategy: PreloadAllModules
      // enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
