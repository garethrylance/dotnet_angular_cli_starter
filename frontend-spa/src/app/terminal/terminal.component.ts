import { AfterViewInit, Component, Directive, ViewChild, Input } from '@angular/core';

import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})

export class TerminalComponent implements AfterViewInit {

  @Input() title: String = 'Terminal Showing Rx events';
  logsService: CommandsService;
  lines: String[] = new Array();

  constructor(private logsDataService: CommandsService) {
    this.logsService = logsDataService
  }



  private addoutput(this: TerminalComponent, line: String) {
    this.lines.push(line);
  }

  ngAfterViewInit() {

    this.logsDataService.outputStream().subscribe(x => this.addoutput(x));


  }

  listen(this: TerminalComponent, userinput: string) {

  }


}
