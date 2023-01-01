const puppeteer = require('puppeteer');

//input
const destiny = 'Bariloche';

const urlToParse = `https://www.booking.com/searchresults.es-ar.html?label=gen173nr-1FCAQoggJCFHNlYXJjaF9tYXIgZGVsIHBsYXRhSCxYBGgMiAEBmAEsuAEXyAEM2AEB6AEB-AEDiAIBqAIDuALrt-6cBsACAdICJGVmMTFmOTg2LTFlMTQtNDY4OS04OGE5LWMyMDcwMmMyOTEzYdgCBeACAQ&aid=304142&lang=es-ar&ss=${destiny}&sb_travel_purpose=leisure&group_adults=2&sb=1&checkout=2023-01-10&checkin=2023-01-03&group_children=0&no_rooms=1&src=searchresults&src_elem=sb&offset=0`;



(async function () {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    //voy a la url



    // get all 25 post deptos
    const publicationsLinks = async () => {
        await page.goto(urlToParse);

        return await page.$$eval((".da89aeb942"), publications => {

            function getLink(items) {
                return items.querySelector('div.c90a25d457 > a').href;
            }

            return publications.map(e => getLink(e));
        })

    }

    // get all data from each depto
    const parserDepartament = async (url) => {
        await page.goto(url);
        await page.screenshot({ path: './screenshots/booking-1.png' });
        return await page.evaluate(() => {
            let linksDepartamentViews = 0;
            const title = document.querySelector('.pp-header__title').textContent;
            const address = document.querySelector('.hp_address_subtitle').innerText;
            const roomsTr = Array.from(document.querySelectorAll('tbody')[4].querySelectorAll('tr')).filter(e => e.children.length > 4);


            function getPictures() {
                document.querySelectorAll('.bh-photo-grid-thumb-more-inner-2')[0].click();
                return Array.from(document.querySelectorAll('.bh-photo-modal-masonry-grid-item > a')).map(e => e.href)
            };

            function getGeneralFacilities() {
                let allFacilities = document.querySelectorAll('.hp_desc_important_facilities')[0]; //div
                return Array.from(allFacilities.querySelectorAll('.important_facility')).map(e => e.innerText);
            };


            function getRoom(room) {
                // const url = window.location.href;
                const title = room.querySelector('.hprt-roomtype-icon-link').innerText;
                const numberTxt = room.querySelector('.prco-valign-middle-helper').innerText;
                const price = new Intl.NumberFormat('es-ar', { style: 'currency', currency: 'ARS', maximumSignificantDigits: 7 }).format(numberTxt);
                const capacity = room.querySelectorAll('.c-occupancy-icons__adults > i').length;
                const characteristics = Array.from(room.querySelectorAll('.bui-badge--outline')).map(e => e.textContent);
                const facilities = Array.from(room.querySelectorAll('.other_facility_badge--default_color')).map(e => e.textContent);

                if (title.includes("vistas") || title.includes("vista")) {
                    linksDepartamentViews++;
                }

                return {
                    title,
                    price,
                    capacity,
                    characteristics,
                    facilities
                }
            };

            function getRooms() {
                return roomsTr.map(room => getRoom(room));
            };

            function getRatings() {
                const ratings = document.querySelectorAll('.bui-spacer--larger')[1];
                return Array.from(ratings.querySelectorAll('.a1b3f50dcd.b2fe1a41c3.a1f3ecff04.e187349485.d19ba76520'))
                    .map(e => {
                        let category = e.querySelector('.d6d4671780').innerText;
                        let ratingNumber = e.querySelector('.ee746850b6.b8eef6afe1').innerText;

                        return {
                            [category]: ratingNumber,
                        }
                    });
            }

            function allowsPets() {
                const tableData = document.querySelector('.descriptionsContainer.clearfix.hp-section.hp-policies-block');
                const petsIcon = tableData.querySelector('.-streamline-pawprint');
                const petResponse = petsIcon.parentNode.parentNode.parentNode.querySelectorAll('p')[1].innerText.toUpperCase();

                return !petResponse.includes('NO');
            }

            function views() {
                return linksDepartamentViews != 0;
            }

            return {
                title: title,
                rooms: {
                    available: roomsTr.length,
                    rooms: getRooms()
                },
                address: address,
                facilities: getGeneralFacilities(),
                ratings: getRatings(),
                pets: allowsPets(),
                views: views(),
                pictures: getPictures(),
            }
        })

    };


    //get 25 results in search departament
    const publications = await publicationsLinks();

    //get firsts 5 publications 
    for (let i = 0; i < 5; i++) {

        const deptos = await parserDepartament(publications[i]);
        console.log(`parser apartament ${i + 1} \n`);
        console.log(deptos);
    }


    await browser.close();

})()

//25 deptos x pag
//offset pagina 2 (offset=25); -> offset + 25 


