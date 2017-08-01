import { AfterViewInit, Component, Directive, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Gareth\'s App';

  constructor() {
    this.title = 'Terminal';
  }

}
