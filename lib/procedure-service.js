var locations = require('./practice-locations');
var rp = require('request-promise');

module.exports = {


getProcedure: (data) => {

    console.log('PROC SERVICE SAYS: you sent the phrase ' +data);

    var procedureCode = 
    [
        
       "27486 - REVISE/REPLACE KNEE JOINT", 
       "27487 - REVISE/REPLACE KNEE JOINT",
       "01402 - Anesthesia for open or endoscopic total knee joint replacement"
];

    var procedureCodeJson = 
    [
        
        {"cptCode":"27486", "description":"REVISE/REPLACE KNEE JOINT"}, 
        {"cptCode":"27487", "description":"REVISE/REPLACE KNEE JOINT"},
        {"cptCode":"01402", "description":"Anesthesia for open or endoscopic total knee joint replacement"}
];

    return procedureCode


            },


getProcedureJson: (data) => {
        console.log("*****************************************************");        
        console.log(data);

        var prodedureLookup = 
        ['10 Street Cooperative Treatment','tenth avenue mission','big hospital'];

        return prodedureLookup
        // .then( prodedureLookup => {
        //     console.log("location service returned " + prodedureLookup)
        //     return prodedureLookup;
        //     }, error => {
        //     reject(error);
        //     });

        }

        };
