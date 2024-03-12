import express from 'express';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import GitlabWebhookReceiver from './GitlabWebhookReceiver.js';
import KanbanBoardHandlerFactory from './factories/KanbanBoardFactory.js';
import { processBodyData } from "../ultils/index.js";
import { config } from 'dotenv';
config()
const app = express();
const webhookReceiver = new GitlabWebhookReceiver();

import { getIssueType } from '../ultils/axios.js';

app.use(urlencoded({ extended: false }));
app.use(json());
config()

const kanbanHandler = KanbanBoardHandlerFactory.createHandler(process.env.KANBAN);
webhookReceiver.addObserver(kanbanHandler)
app.post('/webhook', (req, res) => {
    try {
        // console.log(process.env.NULAB_SPACE_ID)
        const event = processBodyData(req.body)
        webhookReceiver.receive(event)
        return res.status(200).json(KANBAN);
    } catch (err) {
        res.json(err)
    }
});
//
app.listen(3001, async () => {
    console.log(await getIssueType())
});
