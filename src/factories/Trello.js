const KanbanBoard = require("./KanbanBoard");

class Trello extends KanbanBoard {
    processWebhookAction(action) {
        console.log(`Updating Trello board for action: ${action}`);
        // Code to update Trello board
    }
}

module.exports = Trello;