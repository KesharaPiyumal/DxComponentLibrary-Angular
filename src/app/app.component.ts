import { Component } from '@angular/core';
import {reportTemplates} from './dx-tree/report-arrays';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tree = reportTemplates;
}
