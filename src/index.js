import conectDB from './database';
import createServer from './server';
 
async function main() {
    try { await conectDB();
        createServer();
    } catch (error) {
        console.log(error);
    }
}

main();