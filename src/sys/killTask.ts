import Sys from './sys';

export class KillTask extends Sys {

    TID: number;

    constructor(TID: number) {
        super();
        this.TID = TID;
    }

    handle() {
        const task = this.sched.taskMap.get(this.TID);
        if (task) {
            task.target.return(true);
            this.task.send = true;
        }
        else {
            this.task.send = false;
        }
        this.sched.schedule(this.task);
    }
}

export default (TID: number) => new KillTask(TID)