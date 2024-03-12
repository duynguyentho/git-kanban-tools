export default class GitlabWebhookReceiver {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    receive(action) {
        this.observers.forEach(observer => {
            observer.processWebhookAction(action);
        });
    }
}


