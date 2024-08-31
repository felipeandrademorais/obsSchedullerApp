import { scheduleJob, Job, RecurrenceRule } from 'node-schedule';
import { Task, CustomJob } from '../types';

interface ScheduleOptions {
  date: Date | RecurrenceRule;
  task: () => void | Promise<void>;
  type: string;
}

class ScheduleService {
  private jobs: Map<string, CustomJob>;

  constructor() {
    this.jobs = new Map();
  }

  /**
   * Schedules a new job.
   * @param name A unique name for the job.
   * @param options The scheduling options.
   */
  createSchedule(name: string, options: ScheduleOptions): void {
    const job = scheduleJob(options.date, async () => {
      try {
        await options.task();
      } catch (error) {
        console.error(`Error executing task '${name}':`, error);
      }
    });

    const customJob: CustomJob = {
      job: job,
      name: name,
      type: options.type,
      scheduledTime: options.date.toString(),
    };

    this.jobs.set(name, customJob);
    console.log(`Job '${name}' scheduled.`);
  }

  /**
   * Executes a job immediately.
   * @param name The name of the job to execute.
   */
  executeSchedule(name: string): void {
    const job = this.jobs.get(name);
    if (!job) {
      throw new Error('Job not found.');
    }
    job.job.invoke();
    console.log(`Job '${name}' executed.`);
  }

  /**
   * Deletes a scheduled job.
   * @param name The name of the job to delete.
   */
  deleteSchedule(name: string): void {
    const job = this.jobs.get(name);
    if (!job) {
      throw new Error('Job not found.');
    }
    job.job.cancel();
    this.jobs.delete(name);
    console.log(`Job '${name}' deleted.`);
  }

  /**
   * lists all scheduled jobs.
   */
  listUpcomingJobs(): Task[] {
    return Array.from(this.jobs.values())
      .filter((job) => job.job.nextInvocation())
      .map((job) => ({
        id: job.job.name,
        name: job.name,
        type: job.type,
        scheduledTime: job.scheduledTime,
      }));
  }
}

export default new ScheduleService();
