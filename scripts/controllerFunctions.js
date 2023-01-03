class HousePreviewParser {

    async getLink(item) {

        const houseLinks = {};
        houseLinks["link"] = await item.$eval('div.c90a25d457 > a', data => data.href);

        return houseLinks;
    }
}

class HousePageParser {
    async parserDepartamentPage(page) {

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
                return Array.from(allFacilities.querySelectorAll('.important_facility')).map(e => e.innerText.trim());
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
    }
}

module.exports = {
    HousePreviewParser,
    HousePageParser,
}