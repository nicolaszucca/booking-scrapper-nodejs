const puppeteer = require("puppeteer");
const { HousePreviewParser, HousePageParser } = require("./controllerFunctions");
const { generateUrl } = require("./url");

class BookingData {
    //Inicializa el navegador de puppeteer
    async initBrowser(destiny, checkin, checkout) {
        this.browser = await puppeteer.launch({ headless: false });
        this.page = await this.browser.newPage();
        this.pageUrl = generateUrl(destiny, checkin, checkout);
    };

    //Obtiene los links de los apartamentos
    async getApartamentLinks() {

        try {
            await this.page.goto(this.pageUrl);

            const housePreview = new HousePreviewParser();

            const apartmentsElements = await this.page.$$(".da89aeb942");

            let links = [];
            for (let apartamentElement of apartmentsElements) {
                const houseData = await housePreview.getLink(apartamentElement);
                const link = houseData.link;
                links.push(link);
            }
            return links;
            //REFERENCE: previous function in evaluate method
            //function getLink(items) {
            //    return items.querySelector('div.c90a25d457 > a').href;
            //} 

        } catch (error) {
            throw new Error('Cannot access', error);
        }
    };

    async parserDepartamentData(url) {
        try {
            await this.page.goto(url);
            const housePage = new HousePageParser();
            const data = await housePage.parserDepartamentPage(this.page);

            return data;

        } catch (error) {
            throw new Error('Cannot access', error);
        }

    };

    async stopBrowser() {
        await this.browser.close();
    };
}



module.exports = BookingData;