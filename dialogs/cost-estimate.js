var builder = require('botbuilder');
const uuid = require('uuid');
var rp = require('request-promise');
var locationService = require('../lib/location-service');
var procedureService = require('../lib/procedure-service')

const library = new builder.Library('getCostEstimate');

//11015mb, 1/28/2018, knee replacement

library.dialog('/', [
    //step 1. : Group Number
    (session) => {
        session.beginDialog('validators:groupnumber', {
            prompt: 'Please enter your group number:',
            retryPrompt: `The value entered is not a valid group number.  You can find your group number in
            the top right corner of your member id card. Please try again`,
            maxRetries: 4
        });
    },
    (session, args) => {
        if (args.resumed) {
            session.send('I see you are having trouble. Would you like a customer service representative to call you back?');
            session.endDialogWithResult({ resumed: builder.ResumeReason.notCompleted });
            return;
        }
        //inserting proc service for testing
        // data = 'knee surgery'
        // procedureService.getProcedure(data)
        // .then((procResults) => {
        //     // POST succeeded...
            
        //     //process the estimator function with json object
        //     console.log('the response is: ' + procResults)
        //     return
        // })
        // .catch(function (err) {
        //     session.send('Procedure Service Failed');
        // });

        session.dialogData.groupnumber = args.response;
        //session.send('The group number you provided is: ' + args.response);

        //Step 2. : Location
        builder.Prompts.text(session, 'Please enter the provider location you wish to visit:', {
            retryPrompt: 'I do not recognize that location. Please try again:',
            maxRetries: 4
        });
    },
    (session, args) => {
        if (args.resumed) {
            session.send('I see you are having trouble. Would you like a customer service representative to call you back?');
            session.endDialogWithResult({ resumed: builder.ResumeReason.notCompleted });
            return;
        }
        builder.Prompts.choice(session, "Which location did you mean?", 
                                locationService.getLocationJson(args.response),
                                { listStyle: builder.ListStyle.button })
    },
    (session, args) => {
        if (args.resumed) {
            session.send('I see you are having trouble. Would you like a customer service representative to call you back?');
            session.endDialogWithResult({ resumed: builder.ResumeReason.notCompleted });
            return;
        }
        session.dialogData.location = args.response.entity;
        //session.send('The location you provided is: ' + session.dialogData.location);

        //Step 3. : Date
        builder.Prompts.time(session, 'Please enter the date of the procedure:', {
            retryPrompt: 'please enter a date in the future:',
            maxRetries: 4
        });
        },
    (session, args) => {
        if (args.resumed) {
            session.send('I see you are having trouble. Would you like a customer service representative to call you back?');
            session.endDialogWithResult({ resumed: builder.ResumeReason.notCompleted });
            return;
        }
        session.dialogData.proceduredate = args.response.entity;
        //session.send('The procedure date you provided is: ' + args.response.entity);

        //step 4. : Procedure Code
        builder.Prompts.text(session, 'Please enter the description of the procedure in which you are interested. you can say (broken arm, colonoscopy, hip replacement, etc):', {
            retryPrompt: 'please enter the the description of a procedure:',
            maxRetries: 4
        });
    },
    (session, args) => {
        if (args.resumed) {
            session.send('I see you are having trouble. Would you like a customer service representative to call you back?');
            session.endDialogWithResult({ resumed: builder.ResumeReason.notCompleted });
            return;
        }
        builder.Prompts.choice(session, "Which procedure code did you mean?", 
                                procedureService.getProcedure(args.response),
                                { listStyle: builder.ListStyle.button })

                            },
        (session, args) => {
            if (args.resumed) {
                session.send('I see you are having trouble. Would you like a customer service representative to call you back?');
                session.endDialogWithResult({ resumed: builder.ResumeReason.notCompleted });
                return;
            }
            session.dialogData.procedurecode = args.response.entity;
        // //session.send('The procedure code you provided is: ' + args.response);
        
        builder.Prompts.confirm(session, 
            `Is this information correct? 
            <br/>
            group: ${session.dialogData.groupnumber},
            <br/>
            location:${session.dialogData.location},
            <br/>
            procedureDate: ${session.dialogData.proceduredate},
            <br/>
            cptCode: ${session.dialogData.procedurecode}
            `
        
        , {
            retryPrompt: 'please enter the code of the procedure you wish to receive:',
            maxRetries: 1
        });
        session.dialogData.procedurecode = "27486";
    },
    (session, args) => {
        if (args.response) {
            session.sendTyping();
            var jsonString = 
            `
            {"group": "${session.dialogData.groupnumber}",
            "location": "${session.dialogData.location}",
            "procedureDate": "${session.dialogData.proceduredate}",
            "cptCode": "${session.dialogData.procedurecode}"
        }
            `
            session.send('Thanks, hold on while I process the following information.  This may take a minute or two. ').sendTyping();
            var jsonObject = JSON.parse(jsonString);
            var estimate

            //demo requires the automation service running locally in a separate process
            var options = {
                method: 'POST',
                uri: 'http://localhost:3000/automation/estimator/',
                body: jsonObject,
                json: true // Automatically stringifies the body to JSON
            };
             
            rp(options)
                .then((parsedBody) => {
                    // POST succeeded...
                    
                    //process the estimator function with json object
                    console.log('the response is: ' + parsedBody)
                    session.send(parsedBody);
                    session.endDialogWithResult({ resumed: builder.ResumeReason.completed });
                    return
                })
                .catch(function (err) {
                    session.send('The POST request failed. Please try again');
                });

            //process the estimator function with json object
            //session.send("Your estimated amount is " + estimate.response.text);
            //session.endDialogWithResult({ resumed: builder.ResumeReason.completed });

            //return;
        }
        //session.send('Sorry you are having trouble');
        session.endDialogWithResult({ resumed: builder.ResumeReason.notCompleted });
}

]).cancelAction('cancel', null, { matches: /^cancel/i });

module.exports = library;