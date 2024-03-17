import KanbanBoard from "./KanbanBoard";
import 'module-alias/register';
import {NulabAxios} from "../utils/axios";
import {STATUS} from '@enums/index';

class Nulab extends KanbanBoard {
    processWebhookAction(action: string): void {
        this.updateTask(action, {});
        return
    }

    // @ts-ignore
    async updateTask(action: string, payload: any): Promise<number> {
        try {
            /**
             * open
             * close
             * reopen
             * update
             * approved
             * unapproved
             * approval
             * unapproval
             * merge
             */
            const issueKey: string = 'TEST-1';
            console.log(issueKey)
            switch (action) {
                case 'open':
                case 'merge_request':
                    await this.changeStatus(STATUS.IN_PROGRESS, issueKey);
                    break;
                case 'close':
                    await this.changeStatus(STATUS.CLOSE, issueKey);
                    break;
                case 'update':
                    await this.changeStatus(STATUS.IN_PROGRESS, issueKey);
                    break;
                case 'merge':
                    await this.changeStatus(STATUS.RESOLVED, issueKey);
                    break;
                default:
                    throw new Error('Unsupported kanban board type');
            }

            return 1; // Return some value
        } catch (e) {
            console.log(e)
        }
    }

    private async changeStatus(status: number, issueKey: string): Promise<any> {
        try {
            const response = await NulabAxios.patch(`/issues/${issueKey}`, {
                statusId: status
            });
            return response.data;
        } catch (error) {
            console.log(error)
            // throw new Error(`Error getting issue types for project`);
        }
    }
}

export default Nulab;
