import Redis from "ioredis";


export const redisConnection = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(String(process.env.REDIS_PORT)),
})
