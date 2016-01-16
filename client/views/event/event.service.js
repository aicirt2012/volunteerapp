app.service('Event', function($resource) {
    var Event = $resource('/api/event/:id');
    var EventHelper = $resource('/api/event/:id/register');
    return {
        save: Event.save,
        get: Event.get,
        register: EventHelper.save,
        unregister: EventHelper.delete
    }
});