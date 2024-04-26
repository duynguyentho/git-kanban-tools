import {Queue} from "bullmq";
import {redisConnection} from "./redis";

export const jobQueue = new Queue('processKanbanBoard', {
    connection: redisConnection
})



jobQueue.on('waiting', (jobId) => {
    console.log('job is waiting')
})


export const addJob = async (job: any) => {
    console.log(1212121)
    await jobQueue.add(job.type, job);
}

