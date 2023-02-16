function generateUrl(destiny, checkin, checkout, count) {
    // TODO: modify the offset to change pages..
    (!checkin || checkin == undefined || checkin === null || checkin === '') ? checkin = getDefoultCheckinDate() : checkin;
    (!checkout || checkout == undefined || checkout === null || checkout === '') ? checkout = getDefoultCheckoutDate() : checkout;
    (!destiny || destiny == undefined || destiny === null || destiny === '') ? destiny = 'Buenos+Aires' : destiny;
    (!count || count == undefined || count === null || count === '') ? count = 0 : count;

    const url = `https://www.booking.com/searchresults.es-ar.html?label=gen173nr-1FCAQoggJCFHNlYXJjaF9tYXIgZGVsIHBsYXRhSCxYBGgMiAEBmAEsuAEXyAEM2AEB6AEB-AEDiAIBqAIDuALrt-6cBsACAdICJGVmMTFmOTg2LTFlMTQtNDY4OS04OGE5LWMyMDcwMmMyOTEzYdgCBeACAQ&aid=304142&lang=es-ar&ss=${destiny}&sb_travel_purpose=leisure&group_adults=2&sb=1&checkout=${checkout}&checkin=${checkin}&group_children=0&no_rooms=1&src=searchresults&src_elem=sb&offset=${count}`;

    return url;
}


function getDefoultCheckinDate() {

    const date = new Date();
    date.setDate(date.getDate() + 15);


    const day = ('0' + date.getDate()).slice(-2)//fecha exacta de hoy; 
    const month = ('0' + (date.getMonth() + 1)).slice(-2);//retorna un mes menos (start from 0)
    const year = date.getFullYear();

    return `${year}-${month}-${day}`
}

function getDefoultCheckoutDate() {
    const date = new Date();
    date.setDate(date.getDate() + 20);

    const day = ('0' + date.getDate()).slice(-2)
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${year}-${month}-${day}`
}




module.exports = {
    generateUrl,
}