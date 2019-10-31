import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { messages } from '../helpers/messages';
import { botReplies, gifsLinks, imageLinks } from '../helpers/bot-replies';

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  loadMessages() {
    return messages;
  }

  loadBotReplies() {
    return botReplies;
  }

  reply(message: string, token: string) {

    return this.http.post(`http://localhost:5001/fir-basics-9f212/us-central1/api/chat`,{
        'queryInput':{
          'text':{
            'text':message,
            'languageCode':'en-US'
          }
        }
      },
      {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    });

    // const botReply: any =  this.loadBotReplies()
    //   .find((reply: any) => message.search(reply.regExp) !== -1);

    // if (botReply.reply.type === 'quote') {
    //   botReply.reply.quote = message;
    // }

    // if (botReply.type === 'gif') {
    //   botReply.reply.files[0].url = gifsLinks[Math.floor(Math.random() * gifsLinks.length)];
    // }

    // if (botReply.type === 'pic') {
    //   botReply.reply.files[0].url = imageLinks[Math.floor(Math.random() * imageLinks.length)];
    // }

    // if (botReply.type === 'group') {
    //   botReply.reply.files[1].url = gifsLinks[Math.floor(Math.random() * gifsLinks.length)];
    //   botReply.reply.files[2].url = imageLinks[Math.floor(Math.random() * imageLinks.length)];
    // }

    // botReply.reply.text = botReply.answerArray[Math.floor(Math.random() * botReply.answerArray.length)];
    // return { ...botReply.reply };
  }
}