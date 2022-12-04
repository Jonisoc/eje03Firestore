import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Complete } from '../models/task';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[];
  private compl: Complete[];
  
  constructor(private firestore: AngularFirestore) { 
    // this.tasks.push("Tarea 1");
    // this.tasks.push("Tarea 2");
    // this.compl.push("Completada 1");
    // this.compl.push("Completada 2");
    this.tasks = [];
    this.compl = [];
  }

  public getTasks(){
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return{ id, ...data};
        })
      })
    )
  }

  public getComplete(){
    return this.firestore.collection('complete').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return{ id, ...data};
        })
      })
    )
  }

  public addTask(task:string){
    let insertado = new Task;
    insertado = {
      tarea: task
    }
    this.firestore.collection('tasks').add(insertado);
  }

  public removeTask(id:string){
    this.firestore.collection('tasks').doc(id).delete();
  }

  public completeTask(id:string, task:string){
    let insertado = new Complete;
    insertado = {
      tarea: task
    }
    this.firestore.collection('complete').add(insertado);
    this.firestore.collection('tasks').doc(id).delete();
  }

  public uncompleteTask(id:string, task:string){
    let insertado = new Task;
    insertado = {
      tarea: task
    }
    this.firestore.collection('tasks').add(insertado);
    this.firestore.collection('complete').doc(id).delete();
  }

  public remCompleteTask(id:string){
    this.firestore.collection('complete').doc(id).delete();
  }

  public getTaskById(id: string){
    let result = this.firestore.collection("tasks").doc(id).valueChanges();
    return result;
  }

  public getCompleteById(id: string){
    let result = this.firestore.collection("complete").doc(id).valueChanges();
    return result;
  }
}