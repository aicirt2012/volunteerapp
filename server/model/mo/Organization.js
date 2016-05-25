var mongoose = require('mongoose');


var organizationSchema = new mongoose.Schema({
    name: String,
    zip: String,
    city: String,
    street: String,
    tel: String,
    email: String
});

organizationSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

organizationSchema.set('toJSON', {
    virtuals: true
});

var Organization = mongoose.model('organization', organizationSchema);


module.exports = Organization;
