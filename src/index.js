const express = require('express');
const bodyParser = require('body-parser');
const { GitlabWebhookReceiver } = require('./GitlabWebhookReceiver');
const {KanbanBoardHandlerFactory} = require('./factories/KanbanBoardFactory');
const {processBodyData} = require("../ultils");
const dotenv = require('dotenv')
const app = express();
const webhookReceiver = new GitlabWebhookReceiver();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config()
const KANBAN = 'Nulab';

const kanbanHandler = KanbanBoardHandlerFactory.createHandler(process.env.KANBAN);
webhookReceiver.addObserver(kanbanHandler)
app.post('/webhook', (req, res) => {
    try {
        console.log(process.env.NULAB_SPACE_ID)
        const event = processBodyData(req.body)
        webhookReceiver.receive(event)
        return res.status(200).json(KANBAN);
    } catch (err) {
        res.json(err)
    }
});

// Example usage
// const trelloHandler = KanbanBoardHandlerFactory.createHandler('Trello');
// const backlogHandler = KanbanBoardHandlerFactory.createHandler('Backlog');
//
// webhookReceiver.addObserver(trelloHandler);
// webhookReceiver.addObserver(backlogHandler);
//
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
