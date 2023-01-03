const BookingData = require("./bookingGetData");


class ParserHandler {
    async init() {
        this.bookingData = new BookingData();
        await this.bookingData.initBrowser();
    }

    async getLinks(destiny, checkin, checkout) {
        const apartamentLink = await this.bookingData.getApartamentLinks(destiny, checkin, checkout);

        return apartamentLink;
    }

    async startParser(destiny, checkin, checkout) {
        const apartaments = await this.getLinks(destiny, checkin, checkout);

        let results = [];
        for (let apartament = 0; apartament < 5; apartament++) {
            const apartamentData = await this.bookingData.parserDepartamentData(apartaments[apartament]);
            results.push(apartamentData);
        }
        return results;
    }

    async exit() {
        await this.bookingData.stopBrowser();
    }
}

module.exports = ParserHandler;