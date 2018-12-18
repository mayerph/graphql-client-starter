import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';
import { Product } from '../../models/product.model';
import { MessageService } from 'src/app/modules/message/services/message.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]
  defaultImage = 'assets/product/img/productImage_default.png'
  constructor(
    private productService: ProductService,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(): void {
    this.loaderService.changeLoader(true)
    this.productService.getProducts().subscribe(
      products => {
        this.loaderService.changeLoader(false)
        this.products = products
      },
      error => {
        this.loaderService.changeLoader(false)
        this.messageService.createMessage(error)
        throw error
      })
  }

}
