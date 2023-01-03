function generateUrl(destiny = 'Buenos Aires', checkin = getDefoultCheckinDate(), checkout = getDefoultCheckoutDate()) {
    // TODO: modify the offset to change pages..
    const url = `https://www.booking.com/searchresults.es-ar.html?label=gen173nr-1FCAQoggJCFHNlYXJjaF9tYXIgZGVsIHBsYXRhSCxYBGgMiAEBmAEsuAEXyAEM2AEB6AEB-AEDiAIBqAIDuALrt-6cBsACAdICJGVmMTFmOTg2LTFlMTQtNDY4OS04OGE5LWMyMDcwMmMyOTEzYdgCBeACAQ&aid=304142&lang=es-ar&ss=${destiny}&sb_travel_purpose=leisure&group_adults=2&sb=1&checkout=${checkout}&checkin=${checkin}&group_children=0&no_rooms=1&src=searchresults&src_elem=sb&offset=0`;

    return url;
}

// TODO: defoult-date-functions are incompletes. Need validations (next month (+1) when day > 30 || day > 31. etc).
// TODO: need to check validation of days and months when they change. 

function getDefoultCheckinDate() {
    const date = new Date();

    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`
}

function getDefoultCheckoutDate() {
    const date = new Date();

    const day = date.getDate() + 7;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`
}




module.exports = {
    generateUrl,
}