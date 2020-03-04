import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TodoComponent } from "./components/todo/todo.component";
import { ManageTodoComponent } from "./components/manage-todo/manage-todo.component";
import { FormGuardService } from "../../shared/services/form-guard.service";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full"
      },
      {
        path: "list",
        component: TodoComponent
      },
      {
        path: "todo/add",
        component: ManageTodoComponent,
        canDeactivate: [FormGuardService]
      },
      {
        path: "todo/:id/edit",
        component: ManageTodoComponent,
        canDeactivate: [FormGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TODORoutingModule {}
