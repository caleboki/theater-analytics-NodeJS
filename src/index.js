const readline = require('readline');
const database = require('./database');
const TheaterAnalytics = require('./theater-analytics');

async function main() {
    const db = await database.initialize();
    const analytics = new TheaterAnalytics(db);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const promptUser = () => {
        rl.question('\nEnter date (YYYY-MM-DD or MM/DD/YYYY) or \'q\' to quit: ', async (answer) => {
            if (answer.toLowerCase() === 'q') {
                await database.close();
                rl.close();
                return;
            }

            try {
                const result = await analytics.getTopPerformingTheater(answer);
                console.log('\nTop performing theater on', answer);
                console.log('Theater:', result.theater_name);
                console.log('Location:', result.location);
                console.log('Total Sales: $', result.total_daily_sales.toFixed(2));
                console.log('Tickets Sold:', result.total_tickets_sold);
            } catch (error) {
                console.error('Error:', error.message);
            }

            promptUser();
        });
    };

    promptUser();
}

main().catch(console.error);