
app.service('Event', function($resource) {
    var Event = $resource('/api/event/:id');
    var EventList = $resource('/api/event/list');
    var EventHelper = $resource('/api/event/:id/register');
    return {
        save: Event.save,
        get: Event.get,
        list: EventList.query,
        register: EventHelper.save,
        unregister: EventHelper.delete
    }
});

app.service('Organization', function($resource) {
    return $resource('/api/organization/:id');
});


app.service('MyData', function($resource) {

    var Personal = $resource('/api/mydata/personal', null, {
        'update': { method:'PUT' }
    });

    var Availability = $resource('/api/mydata/availability', null, {
        'update': { method:'PUT' }
    });


    return {
        personal: Personal,
        availability: Availability
    };
});