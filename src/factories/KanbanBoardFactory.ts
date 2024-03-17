// import Trello from "./Trello";
import Nulab from "./Nulab";

class KanbanBoardHandlerFactory {
    static createHandler(boardType: string): Nulab {
        switch (boardType) {
            case "Trello":
            // @ts-ignore
            // return new Trello();
            case "Nulab":
                // @ts-ignore
                return new Nulab();
            default:
                throw new Error('Unsupported kanban board type');
        }
    }
}

export {KanbanBoardHandlerFactory};
