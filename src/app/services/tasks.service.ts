import { Injectable } from '@angular/core';
import { AddTask, Task } from '../task.interface';
import { SupabaseService } from './supabase.service';
import { Profile } from '../profile.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
 
  userProfile!: Profile;
  constructor(private supabase: SupabaseService) {
  this.userProfile = this.supabase.Profile
  }


  async getUserTasksByProfile(): Promise<Task[]> {

    let supabaseUser: any = localStorage.getItem('supabaseUser')

    if(supabaseUser){
      supabaseUser = JSON.parse(supabaseUser)
    }
 
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .select('*').eq('user_id', supabaseUser.id);

    if (error) {
      return error as unknown as Task[];
    }

    return data as Task[];
  }
  async getUserTasksByEmployeeID(user_id: string): Promise<Task[]> {
 
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .select('*').eq('user_id', user_id);

    if (error) {
      return error as unknown as Task[];
    }

    return data as Task[];
  }
  
  async getTasks(): Promise<Task[]> {
    
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .select('*, profiles(username)');

      console.log(data)

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

  async updateTask(task: AddTask): Promise<Task> {
    let { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .update({
        task: task.task,
        status: task.status,
        created_at: task.created_at,
        user_id: task.employee,
        description: task.description,
      })
      .eq('id', task.id);
    if (error) {
      return error as unknown as Task;
    }

    return data as unknown as Task;
  }


  async addTask(task: AddTask): Promise<Task> {
    const date = new Date().toISOString()
    const { data, error } = await this.supabase.supabaseClient
      .from('todos')
      .insert([
        {
          task: task.task,
          created_at: date,
          status: 'pending',
          user_id: task.employee,
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
