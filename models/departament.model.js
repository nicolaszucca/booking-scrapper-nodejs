const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const departamentShema = Schema({
    title: {
        type: String,
        require: true,
    },
    rooms: {
        type: Object,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },

    facilities: {
        type: Array,
        require: false,
    },
    ratings: {
        type: Array,
        require: true,
    },
    pets: {
        type: Boolean,
        require: true,
    },
    views: {
        type: Boolean,
        require: true,
    },

});

const Departament = mongoose.model('Departament', departamentShema);

module.exports = Departament; 