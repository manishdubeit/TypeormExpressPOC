import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  public todoList = [
    { id: 1, title: 'First TODO', status: 1 },
    { id: 2, title: 'Second TODO', status: 1 },
    { id: 3, title: 'Third TODO', status: 1 },
    { id: 4, title: 'Fourth TODO', status: 1 },
    { id: 5, title: 'Fifth TODO', status: 1 },
    { id: 6, title: 'sixth TODO', status: 1 },
  ]
  constructor() { }

  getAll() {
    return this.todoList;
  }

  getByID(id: number) {
    return this.todoList.filter(row => row.id == id);
  }

  addTodo(data: any) {
    this.todoList.push(data);
  }

  editTodo(data: any, id) {
    this.todoList.push(data);
    let index = this.todoList.findIndex(val => val.id == id);
    // console.log('index', index);
    this.todoList.splice(index, 1, data);

  }

  deleteTodo(id: any) {
    let index = this.todoList.findIndex(val => val.id == id);
    this.todoList.splice(index, 1);
  }

  updateTodo(data) {

  }

}
