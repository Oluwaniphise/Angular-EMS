import { Profile } from "./profile.interface";

export interface Task{
    id: number;
    task: string;
    user_id: string;
    status: string;
    created_at: Date;
    description: string;
    deadline: Date
    profiles: Profile

}
export interface AddTask{
    id: number;
    status: string;
    created_at: Date;
    task: string;
    employee: string;
    description:  string;
    deadline: Date,

}
