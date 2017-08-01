import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Commands } from './data/commands';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/zip';

@Injectable()
export class CommandsService {
  private data = new Commands();



  private output: ReplaySubject<String> = new ReplaySubject(100);

  constructor() {
    Observable.interval(5000).subscribe(x => this.getCommand());
  }


  outputStream(): Observable<String> {
    return this.output;
  }

  private getCommand() {
    const command = this.data.getRandomQuote();
    this.output.next(command);
    return;
  }





}


