import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoServiceService } from '../../service/todo-service.service'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList: any = <any>[];
  todoID: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _todoServiceService: TodoServiceService
  ) {

  }


  ngOnInit(): void {
    this.todoList = this._todoServiceService.getAll();
  }

  addTodo() {
    this.router.navigate(['../todo/add'], { relativeTo: this.activatedRoute });
  }

  editTodo(todo: any) {
    this.router.navigate(['../todo', todo.id, 'edit'], { relativeTo: this.activatedRoute });
  }

  deleteTodo(todo: any) {
    this._todoServiceService.deleteTodo(todo.id);
  }

}
