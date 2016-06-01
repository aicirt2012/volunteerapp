module.exports = {
    name: 'VolunteerApp',
    port: 80,
    jwt: {
        secret: '382a4b7a5745454f3b44346d27744b2d305b3b58394f4d75375e7d7670',
        expiresInSeconds: 86400
    },
    sc : {
        url: 'http://localhost:8083/intern/tricia/api/v1',
        pass : 'ottto',
        user : 'mustermann@test.sc',
        workspaceId : 'volunteerapp'
    },
    email:{
        user: 'muc.refugees',
        pass: 'FD37hZJL8z3eyBUbBcho'
    },
    database: 'mongodb://volunteerappuser:123@localhost:27017/volunteerapp',
    usemongo: false
};
