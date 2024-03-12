class KanbanBoard {
    constructor() {
        if (this.constructor === KanbanBoard) {
            throw new Error('Abstract class cannot be instantiated');
        }
    }

    // Method to process webhook action and update kanban board
    processWebhookAction(action) {
        throw new Error('Method "processWebhookAction" must be implemented');
    }

    updateTask(action, payload) {
        return;
    }
}

export default KanbanBoard;