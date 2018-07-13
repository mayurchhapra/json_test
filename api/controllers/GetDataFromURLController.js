/**
 * GetDataFromURLController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    urlPage:(req, res)=>{
        var request = require("request");
        request("https://data.sfgov.org/resource/wwmu-gmzc.json", function(error, response, body) {
            console.log(response);
        }); 
       return res.view('urlPage');
    }
};

