import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Complete } from '../models/task';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public compl:Complete[];
  
  constructor(private taskService:TasksService) {
    this.taskService.getComplete().subscribe(res =>{
      this.compl = res;
    });
  }

  public uncompleteTask(id:string, task:string){
    this.taskService.uncompleteTask(id, task);
  }

  public remCompleteTask(id:string){
    this.taskService.remCompleteTask(id);
  }

}
