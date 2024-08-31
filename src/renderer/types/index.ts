import { Job } from 'node-schedule';

export interface Task {
  id: string;
  name: string;
  type: string;
  scheduledTime: string;
}

export interface CustomJob {
  job: Job;
  name: string;
  type: string;
  scheduledTime: string;
}
