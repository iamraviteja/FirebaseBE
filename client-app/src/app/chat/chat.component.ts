import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ ChatService ]
})
export class ChatComponent implements OnInit {

  messages: any[];
  user:any = {};
  token:any = false;

  constructor(protected chatService: ChatService, private authService: NbAuthService) {
    this.messages = [];
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.user = token.getPayload(); 
        this.token = token.toString();
      }

    });
  }

  ngOnInit() {
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: `${this.user.email}`,
        avatar: 'https://i.gifer.com/no.gif',
      },
    });

    this.chatService.reply(event.message, this.token)
    .subscribe((data:any) =>{
      let { fulfillmentText } = data.queryResult;
      this.messages.push({
        text: fulfillmentText,
        reply: false,
        date: new Date(),
        user: {
          name: 'Bot',
          avatar: 'https://icon-library.net/images/bot-icon/bot-icon-7.jpg',
        },
      });
    });

  }

}
