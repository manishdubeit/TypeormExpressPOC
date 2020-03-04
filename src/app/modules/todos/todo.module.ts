import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TODORoutingModule } from "./todo.routing";
import { TodoComponent } from './components/todo/todo.component';
import { ManageTodoComponent } from './components/manage-todo/manage-todo.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TODORoutingModule
  ],
  declarations: [
    TodoComponent,
    ManageTodoComponent
  ]
})
export class TODOModule { }
