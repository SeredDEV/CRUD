import conectDB from './database';
import dotenv from 'dotenv';
import createServer from './server';

async function main() {
    try {
        dotenv.config();
        await conectDB();
        createServer();
    } catch (error) {
        console.log(error);
    }
}

main();