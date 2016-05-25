var mongoose = require('mongoose');


var organizationSchema = new mongoose.Schema({
    name: String,
    zip: String,
    city: String,
    street: String,
    tel: String,
    email: String
});

var Organization = mongoose.model('organization', organizationSchema);



module.exports = Organization;
