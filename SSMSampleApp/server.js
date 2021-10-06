const express = require('express');
const { getmysubscriptions, getsubscribers, inviteuser, revokesubscription, getcustomerdetails } = require('./services.js')

var app = express();
app.use(express.static('build'));

app.get("/getmysubscriptions", function (request, response) {
      getmysubscriptions().then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        // console.log("Error : ",e)
      })

    });

app.get("/getcustomerdetails", function (request, response) {

      getcustomerdetails().then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
      })
    });

app.get("/getmysubscriptions", function (request, response) {

      getmysubscriptions().then((mysubsp_list) => {
        response.json(mysubsp_list);
      }).catch((e) => {
        response.end({result: "fail"})
      })
    });

app.get("/getSubscribers", function (request, response) {
      var id = request.query.id;

      getsubscribers(id).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
      })


    });

app.get("/inviteuser", function (request, response) {

      let sbpid = request.query.subspid;
      let gname = request.query.givenname;
      let uemail = request.query.useremail;
      let fname = request.query.familyname;

      inviteuser(sbpid, gname, uemail, fname).then((res) => {
        response.json(res)
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })


    });

app.get("/revokesubscription", function (request, response) {
      var subid = request.query.subid;
      var seatid = request.query.seatid;

      revokesubscription(subid, seatid).then((res) => {
        response.json({ result: "success" })
      }).catch((e) => {
        response.end({ result: "fail" })
      })

    });

app.listen(8000, function() {
    console.log('App running on port 8000');
});