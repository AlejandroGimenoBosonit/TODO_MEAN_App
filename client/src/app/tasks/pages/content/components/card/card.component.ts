import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../../../../interfaces/interface';

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styles: [`
    .card-element {
      margin: 10px;
      background-color: #3c3c3c;
      padding: 15px;
      width: 350px;
      height: auto;
    }
    .title-container {
      text-align: center;
    }
    /* .button-container{ 
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    } */
  `]
})
export class CardComponent implements OnInit {

  @Input() cardElement!: Card;

  constructor() { }

  ngOnInit(): void { 
  }

  // methods
  editMethod() {
    console.log('edit method: ', this.cardElement._id);
  }

  deleteMethod() {
    console.log('delete method: ', this.cardElement._id);
  }
}
