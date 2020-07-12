import Sys from './sys';

export class GetID extends Sys {

    handle() {
        this.task.send = this.task.TID;
        this.sched.schedule(this.task);
    }
}

export default () => new GetID()