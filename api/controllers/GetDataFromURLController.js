var NodeGeocoder = require('node-geocoder');
module.exports = {
    urlPage:(res)=>{
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

       
    },
    search: async(req, res) =>{
        let category = req.param('category');
        let q = req.param('search_box');
        console.log(category); //actor_1
        console.log(q); //john
        
        let qry = "SELECT DISTINCT * from getdatafromurl WHERE "+`${category}`+" LIKE '%"+`${q}`+"%'";
        console.log(qry);
        let data = await GetDataFromURL.getDatastore().sendNativeQuery(qry);
            
        console.log("Data = ",data);
        return res.view('search');
    }
};

