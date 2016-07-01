class Handler {

    constructor(private messageType, private callback) {
    }

    handle(message) {
        if (message instanceof this.messageType) {
            this.callback.call(null, message);
        }
    }

}

export class EventAggregator {

//    private eventLookup: Map<any, any> = new Map<any, any>();
    private eventLookup = {};
    private messageHandlers = [];

    publish(event, data) {
        let subscribers = undefined;
        let i = undefined;

        if (!event) {
            throw new Error('Event was invalid.');
        }

        if (typeof event === 'string') {
            subscribers = this.eventLookup[event];
            if (subscribers) {
                subscribers = subscribers.slice();
                i = subscribers.length;

                while (i--) {
                    subscribers[i](data, event);
                }
            }
        } else {
            subscribers = this.messageHandlers.slice();
            i = subscribers.length;

            while (i--) {
                subscribers[i].handle(event);
            }
        }
    }

    subscribe(event, callback: Function) {
        let handler = undefined;
        let subscribers = undefined;

        if (!event) {
            throw new Error('Event channel/type was invalid.');
        }

        if (typeof event === 'string') {
            handler = callback;
            subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
        } else {
            handler = new Handler(event, callback);
            subscribers = this.messageHandlers;
        }

        subscribers.push(handler);

        return {
            dispose: function () {
                var idx = subscribers.indexOf(handler);
                if (idx !== -1) {
                    subscribers.splice(idx, 1);
                }
            }
        };
    }

    subscribeOnce(event, callback) {
        var sub = this.subscribe(event, function (a, b) {
            sub.dispose();
            return callback(a, b);
        });

        return sub;
    }

}