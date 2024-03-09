const KanbanBoard = require("./KanbanBoard");

class Nulab extends KanbanBoard {

    processWebhookAction(action) {
        console.log(`Updating Nulab board for action: ${action}`);
        // Code to update Backlog board


    }
}

module.exports = Nulab;