/**
 * GetDataFromURLController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var geocoder = require('geocoder');
module.exports = {
    urlPage:(req, res)=>{
        var request = require("request");
        request("https://data.sfgov.org/resource/wwmu-gmzc.json", function(error, response, body) {
            let json_data =  JSON.parse(response.body);

            geocoder.geocode('Junagadh', function( err, data){
                console.log("Lat = ", data.results[0].geometry.location.lat);
                console.log("Long = ", data.results[0].geometry.location.lng);
            });
            // for(let i in json_data){
            //     console.log(json_data[i].fun_facts);
            //     console.log("____________________________________________________");
            // }
        }); 
       return res.view('urlPage');
    }
};

