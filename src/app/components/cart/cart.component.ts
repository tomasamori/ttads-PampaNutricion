import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart/cart.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Pedido } from 'src/app/models/pedido';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLoading: boolean = false;
  base64Image: string;
  messageVisible = false;
  constructor(protected cartService:CartService,private router:Router,private toastr: ToastrService) { 
    this.loadImage();
  }

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
    if (localStorage.getItem('usuarioFoundId')){
      if (localStorage.getItem('token')){
        if (confirm('¿Desea finalizar la compra?')) {
          this.MapProdToPed(1);
          this.cartService.createPedido(this.pedido).subscribe(
            (res:Pedido) => {
              //this.CreatePDF(res)
              this.createPDF(res)
            },
            err => {console.log(err)
            }
            
          )
        }
      }
    }
    else{
      this.toastr.info('Inicie sesión para poder continuar la compra.')/*,'', {
        toastClass: 'custom-toast-class' // Clase CSS personalizada para este toast
      });*/
    }
    //const data = this.getAllProd();

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
  
  Date() {
    const currentDate = new Date();
    let formattedDate: any;
    const day = this.addLeadingZero(currentDate.getDate());
    const month = this.addLeadingZero(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const hours = this.addLeadingZero(currentDate.getHours());
    const minutes = this.addLeadingZero(currentDate.getMinutes());

     return formattedDate = (`${day}/${month}/${year} ${hours}:${minutes}`).toString();
  }
  addLeadingZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

 createPDF(pedido:Pedido){
  let pro = this.cartService.getAllCarrito();
  const filasDeDatos = pro.map(producto => [
    producto.nombre,
    producto.amount.toString(),
    `$${producto.precio.toFixed(2)}`,
    `$${producto.promo.toString().trim()+'%'}`,
    `$${this.subtotal2(producto.precio,producto.amount,producto.promo)}`,
    `$${this.iva(producto.precio,producto.amount,producto.promo)}`,
    `$${this.total2(producto.precio,producto.amount,producto.promo)}`
  ]);
  let invoiceheader = '\n'+'Nro. Pedido: '+pedido.nroPedido.toString().trim()+'\t\t\t\t\t\t\t\t\t'+'  Telefono: 03407 48-0936'+'\n\n'+'Mail: pampanutricion@gmail.com'+'\t\t'+ 'Fecha: '+this.Date()+'\n\n'+'Cuit: 30-71453418-8'+'\t\t\t\t\t\t\t\t'+'Cliente: Alexis'+'\n\n'+'Direccion: RN9 km 204, Ramallo, Provincia de Buenos Aires'+'\n'+'  ';

  //+
  const tabla1 = {
    headerRows: 1,
    widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
    body: [
      [            
        { text: 'Nombre', fillColor: '#E96524' },
        { text: 'Cantidad', fillColor: '#E96524' },
        { text: 'Precio', fillColor: '#E96524' },
        { text: 'Dto', fillColor: '#E96524' },
        { text: 'Subtotal', fillColor: '#E96524' },
        { text: 'IVA', fillColor: '#E96524' },
        { text: 'Precio final', fillColor: '#E96524' }
      ],
      ...filasDeDatos
    ]
  };

  const tabla2 = {
    headerRows: 1,
    widths: ['*', '*', '*'],
    body: [
      [            
        { text: 'Total s/IVA', fillColor: '#E96524' },
        { text: 'Total IVA', fillColor: '#E96524' },
        { text: 'Total c/IVA', fillColor: '#E96524' }
      ],
      ['$'+pedido.subtotal.toFixed(2), '$'+(pedido.total-pedido.subtotal).toFixed(2), '$'+pedido.total.toFixed(2)]
    ]
  };
  const documentDefinition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    content: [      
      {
        columns: [
          // Columna izquierda: imagen
          {
            image: this.base64Image,
            width: 100,
            height: 100,
            alignment: 'left',
            margin: [0, 10, 0, 0] // Margen arriba-izquierda-derecha-abajo
          },
          // Columna derecha: tabla con texto
          {
            table: {
              widths: ['*'],
              body: [
                    [
                  {text:invoiceheader,//'\n \t\t\t\t\t\t\t\t\t\t\t\tPrueba\t\t1 Prueba2 Prueba 2 Prueba \n\n\n \t\t\tPrueba 1 Prueba 2 Prueba 2 Prueba\n\n',
                  fillColor:"#E96524"
                },
                    ]
              ]
            },
            //layout: 'noBorders', // Opcional: elimina los bordes de la tabla
            margin: [10, 10, 0, 0] // Ajusta el margen izquierdo para alinear con la columna izquierda
          }
        ]
      },
      {
        text: '\n\n' // Agregar espacio entre las tablas
      },
      {
        table: tabla1
      },
      {
        text: '\n\n' // Agregar espacio entre las tablas
      },
      {
        table: tabla2,
        absolutePosition: { x: 40, y: 760 }
      }
    ],
    background: [
      {
        image: this.base64Image,
        width: 416.5, // Ancho de la página A4 en puntos (1 punto = 1/72 pulgadas)
        height: 416.5, // Alto de la página A4 en puntos
        absolutePosition: { x: 90, y: 251.92}, // Posición en la esquina superior izquierda
        opacity: 0.2 // Opacidad de la imagen (0 a 1)
      }
    ]
  };
  
  let name = 'Pedido-'+pedido.nroPedido.toString().trim();
  pdfMake.createPdf(documentDefinition).open();
  pdfMake.createPdf(documentDefinition).download(name);
 }

total2(precio:number,cantidad:number,promo:number){
  let iva = this.iva(precio,cantidad,promo);
  let sub = this.subtotal2(precio,cantidad,promo);
  let total = (Number(iva) + Number(sub)).toFixed(2);
  return total

}
iva(precio:number,cantidad:number,promo:number){
  let iva:number = 0;
  let sub:number = Number(this.subtotal2(precio,cantidad,promo))
  iva = sub*1.21 - sub
  return iva.toFixed(2);
}

 subtotal2(precio:number,cantidad:number,promo:number){
  let subtot:number = 0;

  if (promo >0){
    subtot += precio*cantidad *((100-promo)/100)
  }else
  {
    subtot += precio*cantidad
  }
  return subtot.toFixed(2);

}
loadImage() {
  const imageUrl = 'assets/images/Pampa-LogoV.png';
  this.cartService.loadImageAsBase64(imageUrl)
    .then(base64 => this.base64Image = base64)
    .catch(error => console.error('Error loading image:', error));
}

}