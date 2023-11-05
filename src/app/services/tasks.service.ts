import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../task.interface';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SupabaseService } from './supabase.service';
import { Employee } from '../employee.interface';
import { Profile } from '../profile.interface';
import jwtDecode from 'jwt-decode';

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

  async getUserTasks(): Promise<Task[]> {
    const userProfile = localStorage.getItem('UserProfile');
    let user_profile: any = userProfile
    if(user_profile) {
      JSON.parse(user_profile)
    }
    console.log(user_profile)
    
    
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .select('*').eq('employee', user_profile?.username);

    if (error) {
      return error as unknown as Task[];
    }

    return data as Task[];
  }
  async getTasks(): Promise<Task[]> {
    const userProfile = localStorage.getItem('UserProfile');
    let user_profile: any = userProfile
    if(user_profile) {
      JSON.parse(user_profile)
    }
    
    
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

  async updateTask(task: Task): Promise<Task> {
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .update({
        task: task.task,
        status: task.status,
        created_at: task.created_at,
        employee: task.employee,
        description: task.description,
      })
      .eq('id', task.id);
    if (error) {
      return error as unknown as Task;
    }

    return data as unknown as Task;
  }


  async addTask(task: Task): Promise<Task> {
    const date = new Date().toISOString()
    const { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .insert([
        {
          task: task.task,
          created_at:date,
          status: 'pending',
          employee: task.employee,
          deadline: task.deadline,
          description: task.description,

        },
      ]);

    if (error) {
      return error as unknown as Task;
    }

    return data as unknown as Task;
  }

  async deleteTask(task: Task): Promise<Task> {
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .delete()
      .eq('id', task.id);
    if (error) {
      return error as unknown as Task;
    }

    return data as unknown as Task;
  }

}
