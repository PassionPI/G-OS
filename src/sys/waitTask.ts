import Sys from './sys';

export class WaitTask extends Sys {

    TID: number;

    constructor(TID: number) {
        super();
        this.TID = TID;
    }

    handle() {
        const result = this.sched.waited(this.task, this.TID);
        this.task.send = result;

        if (!result) {
            this.sched.schedule(this.task);
        }
    }
}

export default (TID: number) => new WaitTask(TID)
