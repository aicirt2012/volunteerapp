app.directive('organizationAvatar', function() {
    return {
        replace: true,
        template:   '<svg class="user-avatar" viewBox="0 0 100 100" height="64" width="64" pointer-events="none" display="block">' +
                    '<rect x="0" y="0" height="100" width="100" fill="#e2e2e2"></rect>' +
                    '<path fill="#999" d="M  10 50 L 50 10 L 90 50 L 0 50"/>' +
                    '<rect x="23" y="49" height="35" width="54" fill="#999"></rect>' +
                    '</svg>'
    };
});
