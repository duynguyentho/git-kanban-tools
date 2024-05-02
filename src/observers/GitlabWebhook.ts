import KanbanBoard from "../factories/KanbanBoard";

class GitlabWebhookReceiver {
    private observers: KanbanBoard[];

    constructor() {
        this.observers = [];
    }

    addObserver(observer: KanbanBoard): void {
        this.observers.push(observer);
    }

    removeObserver(observer: KanbanBoard): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    receive(action: string, payload: any, issueKey: string): void {
        this.observers.forEach(observer => {
            observer.processWebhookAction(action, payload, issueKey);
        });
    }
}

export {GitlabWebhookReceiver};
