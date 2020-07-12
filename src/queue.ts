type MapFn<T, M> = (elem: T, index?: number) => M

class Item<T> {

    elem: T;
    next: Item<T> | null;

    constructor(
        elem: T,
        next: Item<T> | null = null
    ) {
        this.elem = elem;
        this.next = next;
    }
}

export default class Queue<T> {

    head: Item<T> | null = null;
    foot: Item<T> | null = null;
    size: number = 0;

    shift(): T | null {
        let value = null;
        if (this.size > 0) {
            const { elem, next } = this.head!;
            value = elem;
            this.size -= 1;
            this.head = next;
            if (next == null) {
                this.foot = null;
            }
        }
        return value
    }

    push(...elems: T[]): number {
        for (const elem of elems) {
            const item = new Item<T>(elem);
            const footer = this.foot;
            if (footer) {
                footer.next = item;
            } else {
                this.head = item;
            }
            this.foot = item;
            this.size++;
        }
        return this.size
    }

    each(fn: MapFn<T, any>): void {
        let index = 0;
        let item = this.head;
        while (item) {
            fn(item.elem, index++);
            item = item.next;
        }
    }

    map<M>(fn: MapFn<T, M>): M[] {
        let index = 0;
        let arr: M[] = [];
        let item = this.head;
        while (item) {
            arr.push(fn(item.elem, index++));
            item = item.next;
        }
        return arr
    }
  
}
