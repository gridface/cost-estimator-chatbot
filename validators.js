var builder = require('botbuilder');

const PhoneRegex = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
//11015MB
const GroupRegex = new RegExp(/^[a-z0-9]{7}$/);

//generic regex for testing purposes
const GenericRegex = new RegExp(/^[a-z0-9]{99}$/);

const library = new builder.Library('validators');

library.dialog('phonenumber',
    builder.DialogAction.validatedPrompt(builder.PromptType.text, (response) =>
        PhoneRegex.test(response)));

library.dialog('groupnumber',
    builder.DialogAction.validatedPrompt(builder.PromptType.text, (response) =>
        GroupRegex.test(response)));

library.dialog('generic',
    builder.DialogAction.validatedPrompt(builder.PromptType.text, (response) =>
        GenericRegex.test(response)));

module.exports = library;
module.exports.PhoneRegex = PhoneRegex;
module.exports.GroupRegex = GroupRegex;
module.exports.GenericRegex = GenericRegex;