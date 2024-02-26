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
    usuario: {_id: '', usuario: '', password: '', email: '', rol: [''], cuil: '', nombre: '', fechaNacimiento: new Date(), direccion: '', telefono: ''}, // --> Cambiado para evitar el error del model
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
              let pro = this.cartService.getAllCarrito();
              //var subarrays = this.dividirArrayEnSubarrays(pro, 15);
              //this.createPDF(subarrays,res);
              this.createSheet(res,pro)
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
        this.pedido.usuario = {_id: '65d0ce0a267fbfbf43d25d7f', usuario: '', password: '', email: '', rol: [''], cuil: '', nombre: '', fechaNacimiento: new Date(), direccion: '', telefono: ''}; // --> Cambiado para evitar el error del model
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

  createPDF(subArr: Producto[][], pedido: Pedido) {
    let documents = []; // Cambié el nombre de la variable a "documents" para ser más descriptivo
    for (let i = 0; i < subArr.length; i++) {
        documents.push(this.createSheet(pedido, subArr[i]));
    }

}
createSheet(pedido, pro) {
  const productosPorPagina = 20;
  const totalProductos = pro.length;
  const numPaginas = Math.ceil(totalProductos / productosPorPagina);

  let documentDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      content: [],
      background: [
          {
              image: this.base64Image,
              width: 416.5,
              height: 416.5,
              absolutePosition: { x: 90, y: 251.92 },
              opacity: 0.2
          }
      ]
  };

  for (let i = 0; i < numPaginas; i++) {
      const productosPagina = pro.slice(i * productosPorPagina, (i + 1) * productosPorPagina);

      const filasDeDatos = productosPagina.map(producto => [
          producto.nombre,
          producto.amount.toString(),
          `$${producto.precio.toFixed(2)}`,
          `$${producto.promo.toString().trim() + '%'}`,
          `$${this.subtotal2(producto.precio, producto.amount, producto.promo)}`,
          `$${this.iva(producto.precio, producto.amount, producto.promo)}`,
          `$${this.total2(producto.precio, producto.amount, producto.promo)}`
      ]);

      let invoiceheader = '\n' + 'Nro. Pedido: ' + pedido.nroPedido.toString().trim() + '\t\t\t\t\t\t\t\t\t' + '  Telefono: 03407 48-0936' + '\n\n' + 'Mail: pampanutricion@gmail.com' + '\t\t' + 'Fecha: ' + this.Date() + '\n\n' + 'Cuit: 30-71453418-8' + '\t\t\t\t\t\t\t\t' + 'Cliente: Alexis' + '\n\n' + 'Direccion: RN9 km 204, Ramallo, Provincia de Buenos Aires' + '\n' + '  ';

      const tabla1 = {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
              [
                  { text: 'Nombre', fillColor: '#FF945F' },
                  { text: 'Cantidad', fillColor: '#FF945F' },
                  { text: 'Precio', fillColor: '#FF945F' },
                  { text: 'Dto', fillColor: '#FF945F' },
                  { text: 'Subtotal', fillColor: '#FF945F' },
                  { text: 'IVA', fillColor: '#FF945F' },
                  { text: 'Precio final', fillColor: '#FF945F' }
              ],
              ...filasDeDatos
          ]
      };

      const tabla2 = {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
              [
                  { text: 'Total s/IVA', fillColor: '#FF945F' },
                  { text: 'Total IVA', fillColor: '#FF945F' },
                  { text: 'Total c/IVA', fillColor: '#FF945F' }
              ],
              ['$' + pedido.subtotal.toFixed(2), '$' + (pedido.total - pedido.subtotal).toFixed(2), '$' + pedido.total.toFixed(2)]
          ]
      };

      const paginaContent = [
          {
              columns: [
                  {
                      image: this.base64Image,
                      width: 100,
                      height: 100,
                      alignment: 'left',
                      margin: [0, 10, 0, 0]
                  },
                  {
                      table: {
                          widths: ['*'],
                          body: [
                              [
                                  {
                                      text: invoiceheader,
                                      fillColor: "#FF945F"
                                  },
                              ]
                          ]
                      },
                      margin: [10, 10, 0, 0]
                  }
              ]
          },
          {
              text: '\n\n'
          },
          {
              table: tabla1
          },
          {
              text: '\n\n'
          },
          {
              table: tabla2,
              absolutePosition: { x: 40, y: 760 }
          }
      ];

      documentDefinition.content.push(...paginaContent);

      // Agregar una nueva página al final de cada ciclo, excepto en la última iteración
      if (i < numPaginas - 1) {
          documentDefinition.content.push({ text: '', pageBreak: 'after' });
      }
  }

  let name = 'Pedido-' + pedido.nroPedido.toString().trim();
  pdfMake.createPdf(documentDefinition).download(name);
  this.toastr.success('Su compra ha finalizado con éxito.');
}




 
 dividirArrayEnSubarrays(array:Producto[], tamanoSubarray:number) {
  var subarrays = [];
  for (var i = 0; i < array.length; i += tamanoSubarray) {
      subarrays.push(array.slice(i, i + tamanoSubarray));
  }
  return subarrays;
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