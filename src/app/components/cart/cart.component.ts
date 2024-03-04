import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart/cart.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Pedido } from 'src/app/models/pedido';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario/usuario.service'
import { PedidoService } from 'src/app/services/pedido/pedido.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  //Variables
  isLoading: boolean = false;
  base64Image: string;
  Products: Producto[];
  Subtotal: number = 0
  messageVisible = false;
  Total: Number = 0;
  SubTotal: Number = 0;


  constructor(protected cartService: CartService, private router: Router, private toastr: ToastrService, private UsuService: UsuarioService,private pedidoService:PedidoService) {
    this.loadImage();
  }


  pedido: Pedido = {
    items: [],
    estado: 'Pendiente',
    usuario: { _id: '', usuario: '', password: '', email: '', rol: { _id: '', name: '' }, cuil: '', nombre: '', fechaNacimiento: new Date(), direccion: '', telefono: '' }, // --> Cambiado para evitar el error del model
    subtotal: 0,
    total: 0,
    nroPedido: 0
  };

  ngOnInit(): void {
    this.getAllProd();
    this.total();
  }

  getAllProd() {
    return this.cartService.getAllCarrito();
  }

  CantidadAritulos() {
    let TotalArt = 0;
    this.cartService.getAllCarrito().forEach(produc => {
      TotalArt += +  produc.amount
    });
    return TotalArt;
  }


  total() {
    let a = 0;
    this.cartService.getAllCarrito().forEach(produc => {
      if (produc.promo <= 0) {
        a += produc.precio * produc.amount;
      }
      if (produc.promo > 0) {
        a += (produc.precio - (produc.precio * produc.promo / 100)) * produc.amount;
      }
    });
    this.SubTotal = Number((a).toFixed(2));
    this.Total = Number((a * 1.21).toFixed(2));
  }

  List() {
    this.router.navigate(['products'])
  }

  Pay() {
    if (localStorage.getItem('usuarioFoundId')) {
      if (localStorage.getItem('token')) {
        this.MapProdToPed(1);
        this.pedidoService.createPedido(this.pedido).subscribe(
          (res: Pedido) => {
            let pro = this.cartService.getAllCarrito();
            this.createPDF(res, pro);
            this.cartService.vaciarCarrito();
            this.CloseModal('confirm');
          },
          err => {
            console.log(err)
          }
        )
      }
    }
    else {
      this.toastr.info('Inicie sesión para poder continuar la compra.')
    }
  }

  dividirRedondearArriba(numero: number, div: number) {
    return Math.ceil(numero / div);
  }

  MapProdToPed(nro: number) {
    this.Products = this.cartService.getAllCarrito();
    if (nro = 1) {
      for (var i = 0; i < this.Products.length; i++) {
        this.pedido.items.push({ producto: this.Products[i], cantidad: this.Products[i].amount });
        this.pedido.estado = 'Pendiente';
        this.pedido.usuario = { _id: localStorage.getItem('usuarioFoundId'), usuario: '', password: '', email: '', rol: { _id: '', name: '' }, cuil: '', nombre: '', fechaNacimiento: new Date(), direccion: '', telefono: '' }; // --> Cambiado para evitar el error del model
      }
      this.Totales(this.Products);
      this.pedido.subtotal = this.Subtotal;
      this.pedido.total = this.pedido.subtotal * 1.21;
    }
  }
  Totales(Products: Producto[]) {
    this.Subtotal = 0;
    for (var i = 0; i < this.Products.length; i++) {
      if (this.Products[i].promo > 0) {
        this.Subtotal += this.Products[i].precio * this.Products[i].amount * ((100 - this.Products[i].promo) / 100)
      } else {
        this.Subtotal += this.Products[i].precio * this.Products[i].amount
      }
    }
  }

  CloseModal(id: string): void {
    setTimeout(() => {
      document.getElementById(id).classList.remove('show');
      document.querySelector('.modal-backdrop').remove();
      window.location.reload();
    }, 500);
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

  createPDF(pedido, pro) {
    const productosPorPagina = 20;
    const totalProductos = pro.length;
    const numPaginas = this.dividirRedondearArriba(totalProductos, productosPorPagina);

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
      let invoiceheader = '\n' + 'Nro. Pedido: ' + pedido.nroPedido.toString().trim() + '\t\t\t\t\t\t\t\t\t\t' + ' Telefono: 03407 48-0936' + '\n\n' + 'Mail: pampanutricion@gmail.com' + '\t\t' + 'Fecha: ' + this.Date() + '\n\n' + 'Cuit: ' + localStorage.getItem('usuarioFoundCuil').trim() + '\t\t\t\t\t\t\t\t' + '  Cliente: ' + localStorage.getItem('usuarioFoundNombre').trim() + '\n\n' + 'Direccion: RN9 km 204, Ramallo, Provincia de Buenos Aires' + '\n' + '  ';

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

      if (i < numPaginas - 1) {
        documentDefinition.content.push({ text: '', pageBreak: 'after' });
      }
    }

    let name = 'Pedido-' + pedido.nroPedido.toString().trim();
    pdfMake.createPdf(documentDefinition).download(name);
    this.toastr.success('Su compra ha finalizado con éxito.');
    //lo del tiempo se puede sacar
    setTimeout(() => {
      this.cartService.vaciarCarrito();
    }, 2000);

  }


  dividirArrayEnSubarrays(array: Producto[], tamanoSubarray: number) {
    var subarrays = [];
    for (var i = 0; i < array.length; i += tamanoSubarray) {
      subarrays.push(array.slice(i, i + tamanoSubarray));
    }
    return subarrays;
  }


  total2(precio: number, cantidad: number, promo: number) {
    let iva = this.iva(precio, cantidad, promo);
    let sub = this.subtotal2(precio, cantidad, promo);
    let total = (Number(iva) + Number(sub)).toFixed(2);
    return total

  }
  iva(precio: number, cantidad: number, promo: number) {
    let iva: number = 0;
    let sub: number = Number(this.subtotal2(precio, cantidad, promo))
    iva = sub * 1.21 - sub
    return iva.toFixed(2);
  }

  subtotal2(precio: number, cantidad: number, promo: number) {
    let subtot: number = 0;

    if (promo > 0) {
      subtot += precio * cantidad * ((100 - promo) / 100)
    } else {
      subtot += precio * cantidad
    }
    return subtot.toFixed(2);

  }
  loadImage() {
    const imageUrl = 'assets/images/Pampa-LogoV.png';
    this.pedidoService.loadImageAsBase64(imageUrl)
      .then(base64 => this.base64Image = base64)
      .catch(error => console.error('Error loading image:', error));
  }
  onCounterChange() {
    this.total();
  }
}