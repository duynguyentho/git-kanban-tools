import KanbanBoard from "./KanbanBoard";
import 'module-alias/register';
import {NulabAxios} from "../utils/axios";
import {STATUS} from '@enums/index';


class Nulab extends KanbanBoard {
    processWebhookAction(action: string, payload: any, issueKey: string): void {
        this.updateTask(action, payload, issueKey);
        return
    }

    // @ts-ignore
    async updateTask(action: string, payload: any, issueKey): Promise<number> {
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
            switch (action) {
                case 'open':
                    await this.changeStatus(STATUS.IN_PROGRESS, issueKey);
                    await this.updateIssue(issueKey, payload);
                    break;
                case 'close':
                    await this.changeStatus(STATUS.CLOSE, issueKey);
                    break;
                case 'reopen':
                    if (await this.handleDraftIssue(payload?.object_attributes?.draft, issueKey)) {
                        break;
                    }

                    await this.changeStatus(STATUS.IN_PROGRESS, issueKey);
                    break;
                case 'update':
                    this.handleDraftIssue(payload?.object_attributes?.draft, issueKey)
                    await this.updateIssue(issueKey, payload);
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
            // console.log(error)
            // throw new Error(`Error getting issue types for project`);
        }
    }

    private async updateIssue(issueKey: string, payload: any) {
        try {
            const response = await NulabAxios.patch(`/issues/${issueKey}`, {
                comment: `#${payload?.object_attributes?.title}\n${payload?.object_attributes?.description}`,
            });

            console.log(`Updating task ${issueKey}`)
            return response.data;
        } catch (err) {
            // console.log('updateIssue', err);
        }
    }

    private async handleDraftIssue(isDraft: boolean | undefined | null, issueKey: string): Promise<boolean>
    {
        if (isDraft === undefined) {
            return false;
        }

        if (isDraft) {
            await this.changeStatus(STATUS.OPEN, issueKey);
        } else {
            await this.changeStatus(STATUS.IN_PROGRESS, issueKey);
        }

        return true;
    }
}

export default Nulab;
