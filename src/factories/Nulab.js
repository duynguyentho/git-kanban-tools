import KanbanBoard from "./KanbanBoard.js";
import { NulabAxios } from "../../ultils/axios.js";
import { STATUS } from '../../enums/enums.js';

class Nulab extends KanbanBoard {

    processWebhookAction(action) {
        console.log(`Updating Nulab board for action: ${action}`);
        // Code to update Backlog board
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

        const issueKey = 'TEST-1';
        switch (action) {
            case 'open':
            case 'reopen':
                this.changeStatus(STATUS.OPEN, issueKey)
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

        return 1;
    }

    async changeStatus(status, issueKey) {
        try {
            const response = await NulabAxios.patch(`/issues/${issueKey}`, {
                statusId: status
            })
            return response.data
        } catch (error) {
            console.log(`Failed API`, error)
            throw new Error(`Error getting issue types for project`);
        }
        
    }
    
}

export default Nulab;