var NodeGeocoder = require('node-geocoder');
module.exports = {
    urlPage:(req, res)=>{
        
        var request = require("request");
        request("https://data.sfgov.org/resource/wwmu-gmzc.json", function(error, response) {
            let json_data =  JSON.parse(response.body);
            var options = {
                provider: 'google',
                // Optional depending on the providers
                httpAdapter: 'https',
                apiKey: 'AIzaSyBJn9YoTvEO_7o8JcfO33ZT8kWMy9P_IVs ',
                formatter: null
            };
            var geocoder = NodeGeocoder(options);
            for(let i in json_data){
                if(json_data[i].locations !== undefined){
                    // Using callback
                    geocoder.geocode(json_data[i].locations, async function(err, res) {
                        try{
                            if(res && res.length > 0 && res[0] !== undefined){
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
    },
    search: async(req, res) =>{
        let category = req.param('category');
        let q = req.param('search_box');
        let data = {};
        let dataSet = {};
        let singleDataMultipleLocations = {};
        if(category !== undefined){
            data[category] = { 'like': '%'+q+'%'};    
            dataSet = await GetDataFromURL.find(data);
        }
        for(let i=0;i<dataSet.length; i++){
            for(let j=0; j,dataSet.length; j++){
                // if(){

                // }
            }
        }
        return res.view('search',{dataSet:dataSet});
    },
    getSearchResults: async(req, res) =>{
        let data = req.param('search_box');
        console.log();
    }
};

