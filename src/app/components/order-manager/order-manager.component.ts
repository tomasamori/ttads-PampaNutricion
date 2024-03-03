import { Component } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Usuario } from 'src/app/models/usuario';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent {
  
  constructor(public pedidoService: PedidoService) { }

  isCliente = false; 
  
  selectedUser = {
    _id: '',
    usuario: '',
    password: '',
    email: '',
    rol: { _id: '', name: ''},
    cuil: '',
    nombre: '',
    fechaNacimiento: new Date(),
    direccion: '',
    telefono: ''
  };

  setSelectedUser(user: Usuario) {
    this.selectedUser._id = user._id;
    this.selectedUser.usuario = user.usuario;
    this.selectedUser.password = user.password;
    this.selectedUser.email = user.email;
    this.selectedUser.rol = user.rol;
    this.selectedUser.cuil = user.cuil;
    this.selectedUser.nombre = user.nombre;
    this.selectedUser.fechaNacimiento = user.fechaNacimiento;
    this.selectedUser.direccion = user.direccion;
    this.selectedUser.telefono = user.telefono;
  }

  selectedOrder = {
    _id: '',
    nroPedido: 0,
    usuario: { usuario: '', password: '', email: '', rol: {_id: '', name: ''}, cuil: '', nombre: '', fechaNacimiento: new Date(), direccion: '', telefono: '' },
    items: [{producto: { _id: '', marca: '', nombre: '', descripcion: '', peso: 0, imgUrl: '', tipoMascota: { _id: '', nombre: '', tamanoRaza: '', edad: '' }, precio: 0, promo: 0, amount: 0 }, cantidad: 0}],
    subtotal: 0,
    total: 0,
    estado: '',
    createdAt: new Date()
  };

  setSelectedOrder(order: Pedido) {
    this.selectedOrder._id = order._id;
    this.selectedOrder.nroPedido = order.nroPedido;
    this.selectedOrder.usuario = order.usuario;
    this.selectedOrder.items = order.items.map(item => ({
      ...item,
      producto: {
        ...item.producto,
        _id: item.producto._id || ''
      }
    }));
    this.selectedOrder.subtotal = order.subtotal;
    this.selectedOrder.total = order.total;
    this.selectedOrder.estado = order.estado;
    this.selectedOrder.createdAt = order.createdAt;
  }

  estados: string[] = ['Pendiente', 'En preparación', 'Preparado', 'Entregado'];

  
  
  ngOnInit(): void {
    if (localStorage.getItem('rol') === 'cliente') {
      this.pedidoService.getPedidosByUser(localStorage.getItem('usuarioFoundId'));
      this.isCliente = true;
    }
    else {
      this.pedidoService.getAllPedido();
    }
  }


  updateOrder(nroPedido: number) {
    const orderToUpdate = this.pedidoService.pedidos.find(order => order.nroPedido === nroPedido);
    if (orderToUpdate) {
      this.pedidoService.updatePedido(orderToUpdate)
    }
  }

  deleteOrder(id: string) {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este pedido?');
    if (confirmDelete) {
      this.pedidoService.deletePedido(id).subscribe(
        (res) => {
          this.pedidoService.getAllPedido();
        },
        err => console.log(err)
      )
    }
  }

}
