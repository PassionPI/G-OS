import Task from './tsak';
import Queue from './queue';
import { Sys } from './sys';

type TaskMap = Map<number, Task>;
type WaitMap = Map<number, Task[]>;

export default class Scheduler {

    ready = new Queue<Task>();
    taskMap: TaskMap = new Map();
    waitMap: WaitMap = new Map();

    add(target: Generator): number {
        const newTask = new Task(target);
        this.taskMap.set(newTask.TID, newTask);
        this.schedule(newTask);
        return newTask.TID;
    }

    schedule(...task: Task[]): void {
        this.ready.push(...task);
    }

    exit(task: Task): void {
        console.log(`Task ${task.TID} terminated.`);
        this.taskMap.delete(task.TID);

        const tasks = this.waitMap.get(task.TID) || [];
        this.waitMap.delete(task.TID);
        this.schedule(...tasks);
    }

    waited(task: Task, waitedID: number): boolean {
        if (this.taskMap.has(waitedID)) {
            const tasks = this.waitMap.get(waitedID) || [];
            tasks.push(task);
            this.waitMap.set(waitedID, tasks);
            return true;
        }
        else {
            return false;
        }
    }

    loop(): void {
        while (this.taskMap.size) {
            const task = this.ready.shift()!;
            const iter = task.run();
            const call = iter.value;
    
            if (call instanceof Sys) {
                call.attach({ task, sched: this });
                continue;
            }

            if (iter.done) {
                this.exit(task);
            }
            else {
                this.schedule(task);
            }
        }
    }
}