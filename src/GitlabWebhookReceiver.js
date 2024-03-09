class GitlabWebhookReceiver {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    receive(action) {
        this.observers.forEach(observer => {
            observer.update(action);
        });
    }
}

class KanbanBoardHandler {
    constructor(kanbanBoardType) {
        this.kanbanBoardType = kanbanBoardType;
    }

    update(action) {
        console.log(`Updating ${this.kanbanBoardType} board for action: ${action}`);
    }
}

module.exports = { GitlabWebhookReceiver, KanbanBoardHandler };
