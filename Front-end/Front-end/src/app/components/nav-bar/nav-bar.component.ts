import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  Cart:boolean = false;

  ngOnInit(): void {
    
  }
showCart(){
  this.Cart = !this.Cart
}
}
