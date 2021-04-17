import { Component, OnInit } from '@angular/core';
import { Items } from '../models/items';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  itemsList = [
    {
      name: 'comuter',
      price: '130',
      category: 'computers',
      description: '',
      image: 'comuter.jpg'
    },
    {
      name: 'sweater',
      price: '1',
      category: 'Clothing',
      description: 'fashion, clothes , sweater, wool, cardigan,…'
    },
    {
      name: 'tie',
      price: '46',
      category: 'Clothing',
      description: 'fashion, tie, clothes, accessory , accessoire,…',
      image: 'tie.jpeg'
    },
    {
      name: 'jacket',
      price: '190',
      category: 'Clothing',
      description: 'winter  jacket ',
      image: 'jacket.jpeg'
    },
    {
      name: 'jacket men',
      price: '225',
      category: 'Clothing',
      description: 'fashion  man  jacket ',
      image: 'jacket_men.jpg'
    },
    {
      name: 'grapes',
      price: '18',
      category: 'fruits',
      description: 'food ,  leaf,  grape,s  wet,  green',
      image: 'grapes.jpeg'
    },
    {
      name: 'strawberries',
      price: '15',
      category: 'fruits',
      description: 'healthy  red sweet  strawberries',
      image: 'strawberries.jpeg'
    },
    {
      name: 'kiwi',
      price: '50',
      category: 'fruits',
      description: 'fruit  kiwi ',
      image: 'kiwi.jpeg'
    },
    {
      name: 'mouse',
      price: '80',
      category: 'computers',
      description: 'apple   mouse  ',
      image: 'mouse.jpg'
    },
    {
      name: 'keyboard',
      price: '80',
      category: 'computers',
      description: 'apple mac  keyboard',
      image: 'keyboard.jpg'
    },
    {
      name: 'headphone',
      price: '120',
      category: 'computers',
      description: 'music headphone',
      image: 'headphone.jpg'
    },
    {
      name: 'motherboard',
      price: '179',
      category: 'computers',
      description: 'pc motherboard with 16 Gb RAM',
      image: 'motherboard.jpg'
    },
    {
      name: 'notebook',
      price: '760',
      category: 'computers',
      description: 'macbook  notebook  computer',
      image: 'notebook.jpg'
    },
    {
      name: 'computer repair',
      price: '350',
      category: 'services',
      description: 'standard computer repairing',
      image: 'computer_repair.jpeg'
    },
    {
      name: 'gift folding',
      price: '7',
      category: 'services',
      description: '',
      image: 'gift_folding.jpeg'
    },
    {
      name: 'Clothing',
      price: '100',
      category: 'Clothing',
      description: '',
      image: 'clothing.jpg'
    },
    {
      name: 'nivea pocket',
      price: '7',
      category: 'services',
      description: ''
    },
    {
      name: 'nivea pocket bleu',
      price: '8',
      category: 'Catégorie',
      description: ''
    },
    {
      name: 'chilli hot pizza',
      price: '200',
      category: 'pizza',
      description: ''
    }
  ];
  subTotal = 0;
  noOfItems = 0;
  vatTaxPercent = 0.1;
  vatTaxAmount = 0;
  discountPercent = 0.1;
  discountAmount = 0;
  cartItems: Array<Items> = [];
  toggleDisplay = 'table-row';
  modalDisplay = 'none';
  saleDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  public onHover(e: any): void {
    const elements = e.target.children;
    for (const element of elements) {
      element.style.display = 'block';
    }
  }

  public mouseLeaveEvent(e: any): void {
    const elements = e.target.children;
    for (const element of elements) {
      element.style.display = 'none';
    }
  }

  public onClick(e: Items): void {
    this.toggleDisplay = 'none';
    const item = this.cartItems.filter(x => x.name === e.name);
    if (item.length > 0) {
      e.quantity = (e.quantity || 0) + 1;
    } else {
      e.quantity = 1;
      this.cartItems.push(e);
    }
    this.noOfItems = this.cartItems.reduce((a, b) => a + (b.quantity ? b.quantity : 0), 0);
    this.calculateTotals();
  }

  public onDoubleClick(e: Items): void {
    const item = this.cartItems.filter(x => x.name === e.name);
    if (item.length > 0) {
      e.quantity = (e.quantity || 0) + 1;
    }
    this.calculateTotals();
  }

  public deleteRow(item: Items): void {
    this.cartItems = this.cartItems.filter(x => x.name !== item.name);
    this.noOfItems = this.cartItems.reduce((a, b) => a + (b.quantity ? b.quantity : 0), 0);
    if (this.cartItems.length <= 0) {
      this.toggleDisplay = 'table-row';
      this.subTotal = 0;
      this.vatTaxAmount = 0;
      this.discountAmount = 0;
    }
    this.calculateTotals();
  }

  public calculateTotals(): void {
    this.subTotal = 0;
    for (const row of this.cartItems) {
      this.subTotal += (row.quantity || 0) * Number(row.price);
    }
    this.vatTaxAmount = this.subTotal * this.vatTaxPercent;
    this.discountAmount = this.subTotal * this.discountPercent;
  }

  public cancelSale(): void {
    this.cartItems = [];
    this.calculateTotals();
    this.toggleDisplay = 'table-row';
  }

  processSale(): void {
    this.modalDisplay = 'block';
  }

  closeModal(): void {
    this.modalDisplay = 'none';
  }

  public Num(str: string): number {
    return Number(str);
  }

  getTotal(price: string, quantity: number = 0): number {
    return this.Num(price) * quantity;
  }

  public closeBtnClick(): void {
    window.location.reload();
  }

  public updateValue(data: Items): void {
    this.calculateTotals();
  }
}
