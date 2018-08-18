class AuthService {
    static login(successCb, errorCb) {
        HTTP.request(
            'POST',
            '/login',
            {},
            function(resp, responseHeaders) {
                successCb();

                localStorage.setItem('token', responseHeaders.token);
            },
            errorCb
        );
    }

    static logout(successCb, errorCb) {
        HTTP.request(
            'POST',
            '/logout',
            { 'token': localStorage.getItem('token') },
            function() {
                successCb();
                localStorage.removeItem('token');
            },
            errorCb
        );
    }
}
