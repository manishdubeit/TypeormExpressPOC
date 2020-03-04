import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TodoServiceService } from "../../service/todo-service.service";
import { todoValidation } from "../../service/validation";
import { CanComponentDeactivate } from "./../../../../shared/services/form-guard.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-manage-todo",
  templateUrl: "./manage-todo.component.html",
  styleUrls: ["./manage-todo.component.scss"]
})
export class ManageTodoComponent implements OnInit, CanComponentDeactivate {
  todoForm: FormGroup;
  public validationList = todoValidation;
  todoID: number;
  todoData: any = {};
  formSubmit = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _todoServiceService: TodoServiceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(val => {
      this.todoID = +val.get("id");
    });
    this.todoForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required)
    });

    if (this.todoID && this.todoID > 0) {
      this.todoData = this._todoServiceService.getByID(this.todoID);
      console.log(this.todoData, "todoData");
      if (
        this.todoData &&
        Array.isArray(this.todoData) &&
        this.todoData.length > 0
      ) {
        this.todoForm.patchValue(this.todoData[0]);
      }
    }
  }

  addTodo() {
    this.formSubmit = true;
    console.log(this.todoForm.status);
    if (this.todoForm.valid) {
      if (this.todoID <= 0) {
        this._todoServiceService.addTodo(this.todoForm.value);
        this.router.navigate(["../../list"], {
          relativeTo: this.activatedRoute
        });
      } else {
        this._todoServiceService.editTodo(this.todoForm.value, this.todoID);
        this.router.navigate(["../../../list"], {
          relativeTo: this.activatedRoute
        });
      }
      this.formSubmit = false;
    }
  }

  resetForm(): void {
    this.formSubmit = false;
    this.todoForm.reset();
  }

  cancelForm() {
    this.todoForm.reset();
    if (this.todoID <= 0) {
      this.router.navigate(["../../list"], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(["../../../list"], {
        relativeTo: this.activatedRoute
      });
    }
  }

  validationTodo(type: string, field: string) {
    return (
      this.todoForm.get(`${field}`).hasError(type) &&
      (this.todoForm.get(`${field}`).dirty ||
        this.todoForm.get(`${field}`).touched ||
        this.formSubmit)
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.todoForm.dirty && !this.formSubmit) {
      return confirm("Do you want to discard your changes?");
    }
    return true;
  }
}
