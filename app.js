var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const ChangePasswordOption = 'Change Password';
const ResetPasswordOption = 'Reset Password';
const GetCostEstimateOption = 'Get Cost Estimate';

var bot = new builder.UniversalBot(connector, [
    (session) => {
        builder.Prompts.choice(session,
            'Thanks for Visiting Deancare.com.  What would you like to do today?',
            [ChangePasswordOption, ResetPasswordOption,GetCostEstimateOption],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        if (result.response) {
            switch (result.response.entity) {
                case ChangePasswordOption:
                    session.send('This functionality is not yet implemented! Try resetting your password.');
                    session.reset();
                    break;
                case ResetPasswordOption:
                    session.beginDialog('resetPassword:/');
                    break;
                case GetCostEstimateOption:
                    session.beginDialog('getCostEstimate:/');
                    break;
            }
        } else {
            session.send(`I am sorry but I didn't understand that. I need you to select one of the options below`);
        }
    },
    (session, result) => {
        if (result.resume) {
            session.send('You identity was not verified and your password cannot be reset');
            session.reset();
        }
    }
]);

//Sub-Dialogs
bot.library(require('./dialogs/reset-password'));
bot.library(require('./dialogs/cost-estimate'));

//Validators
bot.library(require('./validators'));

server.post('/api/messages', connector.listen());
