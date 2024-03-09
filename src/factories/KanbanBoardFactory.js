const Trello = require("./Trello");
const Nulab = require("./Nulab");


class BacklogHandler extends TrelloHandler {
}

class KanbanBoardHandlerFactory {
    static createHandler(boardType) {
        switch (boardType) {
            case 'Trello':
                return new Trello();
            case 'Backlog':
                return new Nulab();
            default:
                throw new Error('Unsupported kanban board type');
        }
    }
}

module.exports = KanbanBoardHandlerFactory;
//
// const trelloHandler = KanbanBoardHandlerFactory.createHandler('Trello');
// const backlogHandler = KanbanBoardHandlerFactory.createHandler('Backlog');
//
// trelloHandler.processWebhookAction('CREATE');
// backlogHandler.processWebhookAction('UPDATE');
