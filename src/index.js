import createServer from './server';

function main() {
    try {
        createServer();
    } catch (error) {
        console.log(error);
    }
}

main();