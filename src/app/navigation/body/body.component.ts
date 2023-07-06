import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

}
