app.directive('organizationAvatar', function() {
    return {
        replace: true,
        template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block"><rect x="0" y="0" height="128" width="128" fill="#e2e2e2"></rect><path fill="#999" d="M  0 50 L 64 0 L 128 50 L 0 50"/><rect x="29" y="49" height="64" width="70" fill="#999"></rect></svg>'
    };
});
