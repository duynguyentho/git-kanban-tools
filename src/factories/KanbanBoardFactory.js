import Trello from "./Trello.js";
import Nulab from "./Nulab.js";

class KanbanBoardHandlerFactory {
     createHandler(boardType) {
        switch (boardType) {
            case 'Trello':
                return new Trello();
            case 'Nulab':
                return new Nulab();
            default:
                throw new Error('Unsupported kanban board type');
        }
    }
}

export default { KanbanBoardHandlerFactory };
