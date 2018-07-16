/**
 * GetDataFromURLController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var NodeGeocoder = require('node-geocoder');
module.exports = {
    urlPage:(req, res)=>{
        var request = require("request");
        request("https://data.sfgov.org/resource/wwmu-gmzc.json", function(error, response) {
            let json_data =  JSON.parse(response.body);
            var options = {
                provider: 'google',
                // Optional depending on the providers
                httpAdapter: 'https', // Default
                apiKey: 'AIzaSyBJn9YoTvEO_7o8JcfO33ZT8kWMy9P_IVs ', // for Mapquest, OpenCage, Google Premier
                formatter: null         // 'gpx', 'string', ...
            };
            var geocoder = NodeGeocoder(options);
            for(let i in json_data){
                if(json_data[i].locations !== undefined){
                    // Using callback
                    geocoder.geocode(json_data[i].locations, async function(err, res) {
                        try{
                            if(res.length > 0 && res[0] !== undefined){
                                let obj = Object.assign(json_data[i],{'lat':res[0].latitude, 'lng':res[0].longitude});
                                let data = await GetDataFromURL.create(obj);
                                console.log(obj);
                                console.log("____________________________________________________");    
                            }
                        }
                        catch(err){
                            console.log(err);
                        }
                    });
                }
            }
        }); 
       return res.view('urlPage');
    }
};

