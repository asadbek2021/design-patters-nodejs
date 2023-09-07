import EventEmitter from "events";
import { createServer } from "http";
import { parse } from "url";


type QueueItem = [string, string];

class Queue {
    private queue: QueueItem[] = [];
    private eventEmitter = new EventEmitter();

    constructor(enqueue: (list: QueueItem[], event: EventEmitter) => void) {
        enqueue(this.queue, this.eventEmitter);
    }

    public async deQueue(): Promise<QueueItem> {
        if(this.queue.length == 0) {
            const promise = new Promise((res, rej)=>{
                this.eventEmitter.once('enqueue', () => {
                    console.log('Event Triggered');
                    console.log('Internal queue state1: ', this.queue)
                    res(this.queue.pop());

                    console.log('Internal queue state2: ', this.queue)
                })
            });
            
            return promise as Promise<QueueItem>;
        }
        return Promise.resolve(this.queue.pop()!);
    }
}


function enqueue(queue: QueueItem[], evenEmitter: EventEmitter) {
    const server = createServer((req, res) => {
        const query = parse(req.url!).query;
        const parsedQuery = parseQuery(query ?? '');
        // push items on internal queue
        queue.push(...parsedQuery);
        //trigger event to active waiting dequeue
        evenEmitter.emit('enqueue');
        res.end('Thanks' + JSON.stringify(parsedQuery) )
    });

    server.listen(3000,'localhost');
}

function parseQuery(queryString: string): QueueItem[] {
    const queryArr = queryString.split('&');
    const query: QueueItem[] = [];

    queryArr.forEach(item => {
        const [key, value]: string[] = item.split('=');
        query.push([key,value]);
    })

    return query;
}


const queue = new Queue(enqueue);

queue.deQueue().then(data => console.log('DATA: ',data));


