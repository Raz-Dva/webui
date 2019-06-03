import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  SimpleChange,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { WebSocketService, ShellService } from '../../services/';
//import { Terminal } from 'vscode-xterm';
//import * as fit from 'vscode-xterm/lib/addons/fit';
//import * as attach from 'vscode-xterm/lib/addons/attach';
@Component({
  selector: 'app-system-processes',
  templateUrl: './system-processes.component.html',
  providers: [ShellService],
})

export class SystemProcessesComponent implements OnInit, OnDestroy {

  //xter container
  @ViewChild('terminal', { static: true}) container: ElementRef;

  // xterm variables
  public token: any;
  public xterm: any;
  private shellSubscription: any;

  clearLine = "\u001b[2K\r"

  ngOnInit() {
    this.getAuthToken().subscribe((res) => {
      this.initializeWebShell(res);
      this.shellSubscription = this.ss.shellOutput.subscribe((value) => {
        this.xterm.write(value);
        this.xterm.setOption('disableStdin', true);
      });
      this.initializeTerminal().then((res) => {
        if (res) {
          // excute 'top' command
          this.xterm.send('top\n');
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.shellSubscription) {
      this.shellSubscription.unsubscribe();
    }
    if (this.ss.connected){
      this.ss.socket.close();
    }
  };

  initializeTerminal() {
    return new Promise((resolve, reject) => {
      this.xterm = new (<any>window).Terminal({ 
        //'cursorBlink': true,
        //'tabStopWidth': 4,
        'cols': 80,
        'rows': 25,
        //'focus': true,
      });
      this.xterm.open(this.container.nativeElement);
      this.xterm.attach(this.ss);
      this.xterm._initialized = true;
      resolve(this.xterm._initialized);
    });
  }

  initializeWebShell(res: string) {
    this.ss.token = res;
    this.ss.connect();
  }

  getAuthToken() {
    return this.ws.call('auth.generate_token');
  }

  constructor(private ws: WebSocketService, public ss: ShellService) {
//    Terminal.applyAddon(fit);
//    Terminal.applyAddon(attach);
  }
}
