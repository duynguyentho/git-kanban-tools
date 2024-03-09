const express = require('express');
const bodyParser = require('body-parser');
// const { GitlabWebhookReceiver } = require('./GitlabWebhookReceiver');
// const { KanbanBoardHandlerFactory } = require('./KanbanBoardHandlerFactory');

const app = express();
// const webhookReceiver = new GitlabWebhookReceiver();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    // webhookReceiver.receive(req.body);
    res.sendStatus(200);
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
