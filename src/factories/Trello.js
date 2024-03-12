import KanbanBoard from "./KanbanBoard.js";

class Trello extends KanbanBoard {
    processWebhookAction(action) {
        console.log(`Updating Trello board for action: ${action}`);
        // Code to update Trello board
    }

    updateTask(action, payload) {
        /**
         * open
            close
            reopen
            update
            approved
            unapproved
            approval
            unapproval
            merge
         */
        switch (action) {
            case 'open':
            case 'reopen':
                // BACKLOG update task to inprogress, setup task description,
                break;
            case 'close':
                // BACKLOG update task to CLOSE
                break;
            case 'update':
                // Backlog update task description
                break;
            case 'merge':
                // Backlog update task notify it was merged, update to resolved
            default:
                throw new Error('Unsupported kanban board type');
        }

        return;
    }
}

export default Trello;