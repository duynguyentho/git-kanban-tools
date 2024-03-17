import express, { Express, Request, Response } from "express";
import 'module-alias/register';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {KanbanBoardHandlerFactory} from "@factories/KanbanBoardFactory";
import {GitlabWebhookReceiver} from "./observers/GitlabWebhook";
import {processBodyData} from "./utils/parse";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const kanbanHandler =  KanbanBoardHandlerFactory.createHandler(process.env.KANBAN || '');
const webhookReceiver = new GitlabWebhookReceiver()
webhookReceiver.addObserver(kanbanHandler);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook', (req, res, next) => {
    try {
        const event : string = processBodyData(req.body);

        webhookReceiver.receive(event)
        console.log(event)
        return res.status(200).json({});
    } catch (err) {
        res.json(err)
    }
});

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running http://localhost:${port}`);
});