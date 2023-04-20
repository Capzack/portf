import MailListener4 from "mail-listener4";

import logger from "../logger/index.js";
import keyWords from '../KeyWords/index.js'

class MailListener{
    constructor(newMailReducer){
        this.lastMailId = null
        this.mailListener = new MailListener4({
            username: '',
            password: '',
            host: '',
            port: 143,
            tls: false,
            connTimeout: 10000,
            authTimeout: 5000,
            debug: null,
            tlsOptions: { rejectUnauthorized: false },
            mailbox: 'INBOX',
            searchFilter: "RECENT",
        });

        this.mailListener.on("server:connected", function(){
            console.log("imapConnected");
        });

        this.mailListener.on("server:disconnected", function(){
            console.log("imapDisconnected");
        });

        this.mailListener.on("error", function(err){
            logger.error(err);
        });


        this.mailListener.on("mail", (function (mail, seqno, attributes){
            if(!attributes){
                return null
            }
            if(+attributes.uid <= this.lastMailId){
                return null
            }
            else {
                logger.info('Mail Received')
                if(newMailReducer){
                    try{
                        newMailReducer(mail, seqno, attributes)
                    }
                    catch (err){
                        logger.error(err);
                    }
                }
                this.lastMailId = attributes ? attributes.uid : this.lastMailId
            }

        }).bind(this));

        this.mailListener.on("attachment", function(attachment){
            console.log(attachment.path);
        });
    }

    start(){
        this.mailListener.start()
    }
}

function newMailReducer(mail, seqno, attributes){
    let subject = mail.headers.subject
    if(subject.includes(keyWords.passengers.text){
        keyWords.passengers.headler(mail, seqno, attributes).catch(err=> logger.error(err))
    }
    else if(keyWords.dchs.text){
        keyWords.dchs.headler(mail, seqno, attributes).catch(err=> logger.error(err))
    }
    else if(mail.attachments){
        let attachmentsFile = mail.attachments.filter(attachment => attachment.contentType !== 'image/png')
        if(!attachmentsFile.length){
            unknownLetter()
        }
        if(attachmentsFile[0].fileName.includes(keyWords.utility.text)){
            keyWords.utility.headler(mail, seqno, attributes).catch(err=> logger.error(err))
        }
        else {
            unknownLetter()
        }
    }
    else
        unknownLetter()
}

function unknownLetter(){
    logger.warn('Unknown letter')
}

export default new MailListener(newMailReducer)
