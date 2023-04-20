import MailListener4 from "mail-listener4";

import passengerTrafficHeadler from '../Headlers/passengerTrafficHeadler.js'
import dchsTableHeadler from '../Headlers/dchsTableHeadler.js'
import utilityTrainsHeadler from '../Headlers/utilityTrainsHeadler.js'
import logger from "../logger/index.js";

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

        // this.mailListener.on("mailbox", function(mailbox){
        //     console.log("Total number of mails: ", mailbox.messages.total); // this field in mailbox gives the total number of emails
        // });

        this.mailListener.on("server:disconnected", function(){
            console.log("imapDisconnected");
        });

        this.mailListener.on("error", function(err){
            logger.error(err);
        });


        this.mailListener.on("mail", (function (mail, seqno, attributes){
            // console.log(attributes ? attributes.uid : null)
            // console.log(this.lastMailId)
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
    // let date = mail.headers.date
    if(subject.includes('Перевозка и выпуск')){
        passengerTrafficHeadler(mail, seqno, attributes).catch(err=> console.log(err))
    }
    else if(subject.includes('ДЦХС')){
        dchsTableHeadler(mail, seqno, attributes).catch(err=> console.log(err))
    }
    else if(mail.attachments){
        let attachmentsFile = mail.attachments.filter(attachment => attachment.contentType !== 'image/png')
        if(!attachmentsFile.length){
            unknownLetter()
        }
        if(attachmentsFile[0].fileName.includes('Хозпоезда')){
            utilityTrainsHeadler(mail, seqno, attributes).catch(err=> console.log(err))
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