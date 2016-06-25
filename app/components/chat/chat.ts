/// <reference path="../../models.ts"/>

import {Component, View, NgIf, NgFor} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from 'angular2/angular2';
import {Validators} from 'angular2/angular2';
import {User} from '../../models';

@Component({
  selector: 'chat',
  viewBindings: [FormBuilder]
})
@View({
  templateUrl: './app/components/chat/chat.html',
  directives: [NgFor, NgIf, FORM_DIRECTIVES]
})

// const chatIo = io( 'http://localhost:4000' );
// console.log(chatIo);

export class Chat {
  user: User;
  logForm: ControlGroup;
  newUser : string;
  chatIo: Socket ;
  messages: Array;
  constructor(fb: FormBuilder) {
    this.messages = [];
    this.chatIo = io.connect('http://localhost:4000/chat');
    this.chatIo.on('chat:newUser', (m) => {
      this.messages.push('new user');
    };
    this.chatIo.on('chat:message', (m) => {
      this.messages.push(m);
      setTimeout(() => {
        var objDiv = document.getElementsByClassName('messages-container')[0];
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 100);
    });
    this.logForm = fb.group({
      newUser: ['', Validators.required]
    });
    this.sendForm = fb.group({
      message: ['', Validators.required]
    });
    this.newUser = this.logForm.controls.newUser;
    this.message = this.sendForm.controls.message;
  }

  keyUpMessage(e){
    if (e.keyCode === 13 && !e.shiftKey) {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.sendForm.valid) {
      this.chatIo.emit('user:message', this.message.value);
      this.sendForm.controls.message.updateValue('');
    }
  }

  onSubmit() {
    if (this.logForm.valid) {
      this.user = new User(this.newUser.value);
    }
  }
}
