const BookingData = require("./bookingGetData");
const Departament = require('../models/departament.model');
const DB = require('./DB/config');
//const { generateUrl } = require("./url");

class ParserHandler {
    async init(destiny, checkin, checkout) {
        this.bookingData = new BookingData();
        this.db = new DB();
        await this.bookingData.initBrowser(destiny, checkin, checkout);
    }

    async getLinks() {
        const apartamentLink = await this.bookingData.getApartamentLinks();

        return apartamentLink;
    }

    async startParser() {
        const apartaments = await this.getLinks();

        let results = [];
        for (let apartament = 0; apartament < apartaments.length; apartament++) {
            const apartamentData = await this.bookingData.parserDepartamentData(apartaments[apartament]);
            results.push(apartamentData);
            this.saveDepartamentData(apartamentData, apartament)
        }
        //let newUrl = generateUrl(this.destiny, this.checkin, this.checkout, index);
        return results;
    }

    async saveDepartamentData(data, indexDepartament) {
        try {
            const departament = await new Departament(data);
            console.log(`Save apartament Nº: ${indexDepartament + 1}`);
            console.log(departament)
            departament.save();
        } catch (error) {
            console.log(`Problems with departament Nº: ${indexDepartament + 1}`);
            throw new Error(error);
        }
    }

    async exit() {
        await this.bookingData.stopBrowser();
    }
}

module.exports = ParserHandler;