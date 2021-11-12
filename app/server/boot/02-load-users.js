'use strict';

// to enable these logs set `DEBUG=boot:02-load-users` or `DEBUG=boot:*`
var log = require('debug')('boot:02-load-users');

module.exports = function(app) {

  createDefaultUsers();

  // loginUserTest();

  function loginUserTest(){
    log('Login User: >>>>> ');
    var MyUser = app.models.MyUser;
    MyUser.login({"email": "gurvsin3@in.ibm.com", "password": "1SatnamW"},
        function(err, existingUser) {
          if (err) {
            console.error('error in login', err);
          }
          console.log(existingUser);
        });
  }

  function createDefaultUsers() {

    log('Creating roles and users');

    var MyUser = app.models.MyUser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    var users = [];
    var roles = [{
                    name: 'admin',
                    users: [
                      {
                        "username": "gurvinder.singh",
                        "password": "1SatnamW",
                        "email":"gurvsin3@in.ibm.com",
                        "provider": "IBM",
                        "firstname": "Gurvinder",
                        "lastname": "Singh",
                        "ssn_last4digits": "5786",
                        "streetnumber": "111",
                        "streetaddress":"main Street",
                        "city":"New Delhi",
                        "state":"Delhi",
                        "zipcode": "110064",
                        "phonenumber":"+919643989377"
                      },
                      {
                        "username": "michael.jones",
                        "password": "P@ssw0rd",
                        "email":"michael.jones@ibm.com",
                        "provider": "IBM",
                        "firstname": "Michael",
                        "lastname": "Jones",
                        "ssn_last4digits": "1111",
                        "streetnumber": "105",
                        "streetaddress":"main Street",
                        "city":"NY",
                        "state":"NY",
                        "zipcode": "10000",
                        "phonenumber":"+919643989377"
                      },
                      {
                        "username": "john.smith",
                        "password": "P@ssw0rd",
                        "email":"john.smith@ibm.com",
                        "provider": "IBM",
                        "firstname": "John",
                        "lastname": "Smith",
                        "ssn_last4digits": "2222",
                        "streetnumber": "104",
                        "streetaddress":"main Street",
                        "city":"NY",
                        "state":"NY",
                        "zipcode": "10000",
                        "phonenumber":"+919643989377"
                      }
                  ]
                  },
                  {
                    name: 'guest',
                    users: [{
                      "username": "kathy.johnson",
                      "password": "P@ssw0rd",
                      "email":"kathy.johnson@ibm.com",
                      "provider": "IBM",
                      "firstname": "Kathy",
                      "lastname": "Johnson",
                      "ssn_last4digits": "1234",
                      "streetnumber": "103",
                      "streetaddress":"main Street",
                      "city":"NY",
                      "state":"NY",
                      "zipcode": "10000",
                      "phonenumber":"+919643989377"
                    },
                    {
                      "username": "guest",
                      "password": "P@ssw0rd",
                      "email":"guest@ibm.com",
                      "provider": "IBM",
                      "firstname": "Guest",
                      "lastname": "User",
                      "ssn_last4digits": "1234",
                      "streetnumber": "103",
                      "streetaddress":"main Street",
                      "city":"NY",
                      "state":"NY",
                      "zipcode": "10000",
                      "phonenumber":"+919643989377"
                    }]
                  }];

    var i = 0;
    roles.forEach(function(role) {
      setTimeout(function(){
          Role.findOrCreate(
            {where: {name: role.name}}, // find
            {name: role.name}, // create
            function(err, createdRole, created) {
              if (err) {
                console.error('error running findOrCreate('+role.name+')', err);
                return false;
              }

              console.log('created: >>>>> ', created);
              console.log('createdRole: >>>>> ', createdRole)
              if(createdRole){
                (created) ? log('created role', createdRole.name)
                          : log('found role', createdRole.name);
              }

              var j = 0;
              role.users.forEach(function(roleUser) {
                setTimeout(function(){
                    MyUser.findOrCreate(
                        {where: {username: roleUser.username}}, // find
                        roleUser, // create
                        function(err, createdUser, created) {
                          if (err) {
                            console.error('error creating roleUser', err);
                          }
                          (created) ? log('created user', createdUser.username)
                                    : log('found user', createdUser.username);
                          createdRole.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: createdUser.id
                          }, function(err, rolePrincipal) {
                            if (err) {
                              console.error('error creating rolePrincipal', err);
                            }
                            users.push(createdUser);
                          });
                    });
                }, ++j * 2000);
              });
            });
        }, ++i * 2000);
    });

    return users;
  }

};
