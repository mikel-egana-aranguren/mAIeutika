import { Component, Input } from '@angular/core';
import { Example } from '../../models/example.model';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  //@Input() example: Example = {};
  @Input() example: string = "";
}
