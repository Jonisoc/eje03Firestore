import { Component, ViewChild } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Complete, Task } from '../models/task';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public tasks: Task[];
  public task:string;

  @ViewChild('entrada', {static: false}) ionInput: { setFocus: () => void; };
  
  constructor(private taskService:TasksService) {
    this.taskService.getTasks().subscribe(res =>{
      this.tasks = res;
    });
  }

  public addTasks(){
    this.taskService.addTask(this.task);
    // this.tasks = this.taskService.getTasks();
    // this.task="";
    this.ionInput.setFocus();
  }

  public removeTask(id:string){
    this.taskService.removeTask(id);
  }

  public completeTask(id:string, task:string){
    this.taskService.completeTask(id, task);
  }

}
