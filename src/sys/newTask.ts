import Sys from './sys';

export class NewTask extends Sys {

    target: Generator;

    constructor(target: Generator) {
        super();
        this.target = target;
    }

    handle() {
        const TID = this.sched.add(this.target);
        this.task.send = TID;
        this.sched.schedule(this.task);
    }
}

export default (target: Generator) => new NewTask(target)