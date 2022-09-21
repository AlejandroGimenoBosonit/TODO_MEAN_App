import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../interfaces/interface';

@Component({
  selector: 'app-card-matrix',
  templateUrl: './card-matrix.component.html',
  styles: [
  ]
})
export class CardMatrixComponent implements OnInit {

  // Recieve cards to matrix
  @Input() cards!: Card[];

  constructor() { }

  ngOnInit(): void {
  }

}
