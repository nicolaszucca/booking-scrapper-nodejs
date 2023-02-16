require('dotenv').config();

const ParserHandler = require('./scripts/parser');

(async function () {

    const parserHandler = new ParserHandler();
    //date format:  year-month-day
    let checkin = '';
    let checkout = '';
    let destiny = '';

    await parserHandler.init(destiny, checkin, checkout);
    const data = await parserHandler.startParser();
    console.log(data)
    parserHandler.exit();
})();

//25 deptos x pag
//offset pagina 2 (offset=25); -> offset + 25 


