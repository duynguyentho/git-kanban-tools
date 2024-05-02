abstract class KanbanBoard {
    protected constructor() {
        if (new.target === KanbanBoard) {
            throw new Error('Abstract class cannot be instantiated');
        }
    }

    // Method to process webhook action and update kanban board
    abstract processWebhookAction(action: string, payload: any, issueKey?: string): void;
}

export default KanbanBoard;
