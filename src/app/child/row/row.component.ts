import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../../models/items';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {
  @Input() data: Items = {category: '', description: '', image: '', name: '', price: '', quantity: 0};
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

  public Num(str: string): number {
    return Number(str);
  }

  getTotal(price: string, quantity: number = 0): number {
    return this.Num(price) * quantity;
  }
  public onMinusClick(): void {
    // @ts-ignore
    if (this.data.quantity > 1) {
      // @ts-ignore
      this.data.quantity = this.data.quantity - 1;
    }
  }
  public onPlusClick(): void {
    // @ts-ignore
    this.data.quantity = this.data.quantity + 1;
  }
}
