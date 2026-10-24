import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDo } from './models/todo.model';
import { NgStyle } from '@angular/common';

@Component({
  imports: [FormsModule, NgStyle],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  inputValue = signal<string>("");
  tasks = signal<ToDo[]>([]);
  totalTasks = signal<number>(this.tasks().length);

  addTask()
  {
    if(this.inputValue().trim().length > 0)
    {
      this.tasks.update(tasks => [...tasks, {id: this.tasks().length + 1, task: this.inputValue()}]);
      this.totalTasks.update(value => value + 1);
      this.inputValue.set("");
    }
  }

  delTask(taskID: number){
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskID));
    this.totalTasks.update(value => value - 1);
  }
}
