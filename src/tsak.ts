export default class Task {

    static TID: number = 0;

    send: any;
    target: Generator;
    TID: number = Task.TID;

    constructor(target: Generator) {
        if (Task.TID > 2147483647) {
            Task.TID = 0;
        }
        else {
            Task.TID++;
        }
        this.target = target;
    }

    run(): IteratorResult<any> {
        return this.target.next(this.send);
    }
}