const ParserHandler = require('./scripts/parser');


(async function () {

    const parserHandler = new ParserHandler();
    await parserHandler.init();

    //date format:  year-month-day
    const checkin = '2023-01-05';
    const checkout = '2023-01-09';
    const destiny = 'Bariloche';

    const data = await parserHandler.startParser(destiny, checkin, checkout);
    console.log(data);

    parserHandler.exit();
})();

//25 deptos x pag
//offset pagina 2 (offset=25); -> offset + 25 


