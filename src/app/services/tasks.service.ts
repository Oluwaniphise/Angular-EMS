import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../task.interface';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SupabaseService } from './supabase.service';
import { Employee } from '../employee.interface';
import { TaskItemComponent } from '../components/dashboard/admin/task-list/task-item/task-item.component';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      apikey: environment.supabaseKey,
    }),
  };

  constructor(private supabase: SupabaseService) {}

  async getTasks(): Promise<Task[]> {
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .select('*');
    if (error) {
      return error as unknown as Task[];
    }

    return data as Task[];
  }

  async setToInProgress(task: Task): Promise<Task> {
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .update({ status: 'in_progress' })
      .eq('id', task.id);
    if (error) {
      return error as unknown as Task;
    }

    return data as unknown as Task;
  }

  async backToPending(task: Task): Promise<Task> {
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .update({ status: 'pending' })
      .eq('id', task.id);
    if (error) {
      return error as unknown as Task;
    }

    return data as unknown as Task;
  }

  async setToDone(task: Task): Promise<Task> {
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .update({ status: 'done' })
      .eq('id', task.id);
    if (error) {
      return error as unknown as Task;
    }

    return data as unknown as Task;
  }

  async backToInProgress(task: Task): Promise<Task> {
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .update({ status: 'in_progress' })
      .eq('id', task.id);
    if (error) {
      return error as unknown as Task;
    }

    return data as unknown as Task;
  }

  async addTask(task: Task): Promise<Task> {
    const { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .insert([
        { task: task.task, created_at: task.created_at, status: task.status, employee: task.employee },
      ]);

    if (error) {
      return error as unknown as Task;
    }

    return data as unknown as Task;
  }
  async getEmployees(): Promise<Employee[]> {
    const { data, error } = await this.supabase.supabaseClient

      .from('profiles')
      .select('*');

    if (error) {
      return error as unknown as Employee[];
    }

    return data as unknown as Employee[];
  }
}
