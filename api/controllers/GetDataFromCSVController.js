var csv = require("fast-csv");
let fs = require('fs');
module.exports = {
    urlPage:(req, res)=>{
        let csvStream = csv.fromPath('mycsv.csv',Headers=true)
        .on('data', (record) => {
                // csvStream.pause();
                console.log(record);
                // let name = record.Name;
                // let address = record.Address;
                // let zipcode = record.ZIPCode;
                // let lat = record.XCoord;
                // let long = record.XCoord;
                // console.log("--->" + name + " " + address + " " + zipcode + " " + lat + " " + long);
                // csvStream.resume();
                }).on('end', () => {
                console.log("Job done!");
                }).on('error', () => {
                    console.log(error);
                });
        console.log("CSV Controller.");

        fs.createReadStream()
        return res.view('urlPage');
    }
}