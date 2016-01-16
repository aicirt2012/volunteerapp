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