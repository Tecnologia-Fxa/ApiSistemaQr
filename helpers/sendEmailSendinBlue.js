const SibApiV3Sdk = require('sib-api-v3-sdk');

const EnviarEmailSendinBlue = () =>{
    //batchSend.js
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

        "sender":{ "email":"SISTEMAS@FUXIAACCESORIOS.COM", "name":"Sistemas "},
        "subject":"Prueba sendinblue",
        "htmlContent":"<!DOCTYPE html><html><body><h1>Prueba Con Texto html</h1><p>Parrafo de la prueba.</p> <marquee>Hola Mundo del email marketing por node...</marquee></body></html>",
        "params":{
            "greeting":"This is the default greeting",
            "headline":"This is the default headline"
        },
    "messageVersions":[
        //Definition for Message Version 1 
        {
            "to":[
                {
                "email":"freddystibencb@gmail.com",
                "name":"Freddy Calderon"
                }
            ],
            "htmlContent":"<!DOCTYPE html><html><body><h1>Prueba Modificada??!</h1><p>UN Parrafo se supone que modificado</p> <marquee>Otro 'marquee' :D</marquee></body></html>",
            "subject":"Una Prueba de algo no se"
        },
        
        // Definition for Message Version 2
        {
            "to":[
                {
                "email":"estefanianeira1@gmail.com",
                "name":"Estefania Neira"
                }
            ]
        }
    ]

    }).then(function(data) {
    console.log(data);
    }, function(error) {
    console.error(error);
    });
}
module.exports = { EnviarEmailSendinBlue };