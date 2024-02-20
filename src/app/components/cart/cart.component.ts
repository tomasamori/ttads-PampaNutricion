import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart/cart.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLoading: boolean = false;
  constructor(protected cartService:CartService,private router:Router) { }
  Products:Producto[];
  Subtotal:number = 0
  pedido : Pedido = {
    cantidad: [],
    productos: [],
    estado: 'En preparacion',
    usuario: 'Alexis',
    subtotal: 0, // Asigna el valor inicial adecuado si es necesario
    total: 0, // Asigna el valor inicial adecuado si es necesario,
    nroPedido:0
  };
  ngOnInit(): void {
    this.getAllProd();

  }
  getAllProd(){
    return this.cartService.getAllCarrito();
  }
  CantidadAritulos(){
    let TotalArt = 0;
    this.cartService.getAllCarrito().forEach(produc => {
      TotalArt = TotalArt +  produc.amount
    });
  return TotalArt;
  }


  total(){
    let a = 0;
    this.cartService.getAllCarrito().forEach(produc => {
      if (produc.promo <=0){
        a+=produc.precio*produc.amount;
      }
      if(produc.promo>0){
        a+=(produc.precio - (produc.precio  * produc.promo / 100))*produc.amount;
      }
    });
  return (a*1.21).toFixed(2);
  }
  List(){
    this.router.navigate(['products'])
  }
  Pay(){
    //const data = this.getAllProd();
    if (confirm('¿Desea finalizar la compra?')) {
      this.MapProdToPed(1);
      this.cartService.createPedido(this.pedido).subscribe(
        (res:Pedido) => {
          this.CreatePDF(res)
        },
        err => {console.log(err)
        }
        
      )
    }
    
  }
  CreatePDF(PedidoP:Pedido){
   const margins ={
      top:30,
      bottom:30,
      left:10,
      right:10,
    };
    var header = ['Nombre', 'Cantidad', 'Precio','Dto' ,'Subtotal        ','IVA       ','Precio final   '];
    let data3 = this.cartService.ConvertDataForTicket();
    var config = {
      autoSize     : true,
      printHeaders : true,
      headerBackgroundColor : 'E96524',
      //tableWidth: 100,
    }
    const doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts:true
     })

    doc.addImage('https://files.fm/thumb_show.php?i=yd493bc9a6','JPG',margins.left,2,48.6,30)
    //let fechaDeHoy: Date = new Date(); 
    //let datos= [,'Fecha del pedido: '+ fechaDeHoy.toString().trim(),'Cliente: '+ this.pedido.usuario]
    //doc.setFont('times','italic')
    //doc.setFont('arial')
    doc.table(8, 50, data3, header,config);
    doc.setFillColor('E96524');
    doc.rect(8, 145, 80, 55,'DF');
    doc.text('Totales:',10,152).setFont('times','italic');
    doc.text('Total s/IVA: $'+ PedidoP.subtotal.toFixed(2),10, 165) ;
    doc.text('Total IVA: $'+ (PedidoP.total-PedidoP.subtotal).toFixed(2),10, 180);
    doc.text('Total c/IVA: $'+ (PedidoP.total).toFixed(2),10, 195).setFont('times');
    doc.setFillColor('E96524');
    doc.rect(65, 2, 220, 30,'DF');
    doc.text('Nro. Pedido: '+PedidoP.nroPedido.toString(),70,10);
    let msjpdf = 'Compra-'+PedidoP.nroPedido.toString().trim()+'.pdf'
    doc.save(msjpdf);//
  }

  subtotal(amount:number,precio:number){
    return amount*precio;
  }

  MapProdToPed(nro : number){
    this.Products = this.cartService.getAllCarrito();
    //this.pedido = null;
    if (nro = 1){
      for (var i= 0; i < this.Products.length;i++){
        this.pedido.cantidad.push(this.Products[i].amount);
        this.pedido.productos.push(this.Products[i]._id);
        this.pedido.estado = 'En preparacion'
        //this.pedido.subtotal = this.subtotal(this.products[i].promo,this.products[i].precio,this.products[i].amount)
        this.pedido.usuario = '65d0ce0a267fbfbf43d25d7f'
        }
        this.Totales(this.Products);
        this.pedido.subtotal = this.Subtotal;
        this.pedido.total = this.pedido.subtotal * 1.21;
      }
      //return this.pedido
    }

    Totales(Products: Producto[]){
      this.Subtotal = 0;
    for (var i= 0; i < this.Products.length;i++){
      if (this.Products[i].promo>0){
        this.Subtotal += this.Products[i].precio * this.Products[i].amount * ((100- this.Products[i].promo)/100)
      }else{
        this.Subtotal += this.Products[i].precio * this.Products[i].amount
      }
   }
   //total = subtotal * 1.21;

  }

}