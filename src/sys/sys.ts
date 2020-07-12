import Task from '../tsak';
import Scheduler from '../scheduler';

export interface SysCall {
    task: Task
    sched: Scheduler
}

export default class Sys {

    task!: Task;
    sched!: Scheduler;

    link({ task, sched }: SysCall): void{
        this.task = task;
        this.sched = sched;
    }
    
    attach({ task, sched }: SysCall): void {
        this.link({ task, sched })
        this.handle();
    }

    handle() {}

}
