import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { TipoMascotaService } from 'src/app/services/tipoMascota/tipoMascota.service';
import { NgForm } from "@angular/forms";
import { Producto } from 'src/app/models/producto';
import { TipoMascota } from 'src/app/models/tipoMascota';
import { UploadFotoService} from 'src/app/services/Cloudinary/upload-foto.service'


@Component({
  selector: 'app-crud-products',
  templateUrl: './crud-products.component.html',
  styleUrls: ['./crud-products.component.css']
})
export class CrudProductsComponent implements OnInit {
  InsertSuccess =false;
  errorMessage: string = "";
  files: File[] = [];
  btn:boolean=true;
  ins:boolean=true;
  emp:boolean=false;
  BackgroundTitlePick:string;
  hide:boolean=true
  constructor(public productoService: ProductoService, public tipoMascotasService: TipoMascotaService,private _UploadFotoService:UploadFotoService) { }
 
  tipoMascota: TipoMascota;
  

  ngOnInit(): void {
    this.getProducts(); 
    this.InsertSuccess =false;
    this.getTypesOfPets();

  }


  resetForm(form: NgForm) {
    form.reset();
    this.getProducts();
    this.getTypesOfPets();
    this.cambiarTituloModal("NUEVO PRODUCTO");
    this.cambiarTituloModalSuccess("Producto Creado con Exito!")
    this.productoService.selectedProduct.tipoMascota._id = '';
    this.BackgroundTitlePick = 'Subir imagen.'
    this.hide = false;
    this.ins= true;

  }
  onSelect(event) {
    console.log(event);
    this.files = event.addedFiles;
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.emp = true;
  }
  getProducts() {
    this.productoService.getAllProducto().subscribe(
      (res) => {
        this.productoService.productos = res;
      },
      err => console.log(err)
    )
  }

  addproduct(form: NgForm) {
    if (!form.value._id) {
      this.emp = !this.files[0]
      if (!this.emp){
        debugger;
      this.btn= false;
      let dataURl = this._UploadFotoService.Foto(this.files[0])
      this._UploadFotoService.uploadImg(dataURl).subscribe(
        res => {
          form.value.imgUrl = res['secure_url'];
          debugger;
          this.sigue_AddProd(form);
        }, err => {
          console.log(err)
        }
      )
      }
    } else {
      if (!this.files[0]) {
        this.btn= false;
        this.sigue_AddProd(form);
      } else {
        this.btn= false;
        
        let dataURl = this._UploadFotoService.Foto(this.files[0]);
        this._UploadFotoService.uploadImg(dataURl).subscribe(
          res => {
            form.value.imgUrl = res['secure_url'];
            debugger;
            this.sigue_AddProd(form);
          }, err => {
            console.log(err)
          })
      }
    }
  }

  sigue_AddProd(form:NgForm){
    this.InsertSuccess = false;
    if (form.value._id) {
      this.productoService.updateProducto(form.value).subscribe(
        res => {
        console.log(res);
        this.getProducts();
        this.InsertSuccess = true; 
        form.reset();  
      },
        err => {
          console.log(err);
          if (err && err.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Se produjo un error desconocido';
           }
        }
      )
        
        } else {
      this.productoService.createProducto(form.value).subscribe(
        res => {
          this.getProducts();
          form.reset();
          console.log('antes', this.InsertSuccess)
          this.InsertSuccess = true;
        },
        err => {console.log(err);
          if (err && err.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Se produjo un error desconocido';
           }
          this.InsertSuccess = false;
        }
      )
    }
    this.InsertSuccess = false;
    this.files = [];
    this.btn=true;
    this.CloseModal('ProductModal');
    this.hide = true;
  }


  deleteProduct(id: string) {
    if (confirm('Seguro quieres eliminar este producto?')) {
      this.productoService.deleteProduct(id).subscribe(
        (res) => {
          this.getProducts();
        },
        (err) => console.error(err)
      );
    }

  }

  editProduct(product: Producto) {
    this.cambiarTituloModal("EDITAR PRODUCTO");
    this.cambiarTituloModalSuccess("Producto Actualizado con Exito!")
    this.productoService.selectedProduct = product;
    this.productoService.selectedProduct.tipoMascota._id = product.tipoMascota._id;
    this.BackgroundTitlePick = 'Subir imagen si desea cambiarla.'
    this.ins= false;
    this.hide = false;

  }

  getTypesOfPets() {
    this.tipoMascotasService.getAllTiposMascotas().subscribe(
      (res) => {
        this.tipoMascotasService.tipoMascotas = res;
      },
      err => console.log(err)
    )
  }

 // Propiedad para almacenar el título dinámico del modal
 tituloModal: string = '';
 tituloModalSucces: string = '';

 // Método para cambiar el título del modal
 cambiarTituloModal(nuevoTitulo: string) {
   this.tituloModal = nuevoTitulo;
 }

 cambiarTituloModalSuccess(nuevoTitulo: string) {
  this.tituloModalSucces = nuevoTitulo;
}

 cancel() {
  this.getProducts();
  this.files = [];
  this.hide = true;
  
}

  ModalClose(){
    this.InsertSuccess = false;
  }
    
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value.toUpperCase();
    // Asigna el nuevo valor en mayúsculas al modelo
    this.productoService.selectedProduct.nombre = newValue;
  }

  CloseModal(id: string): void {
    setTimeout(() => {
      document.getElementById(id).classList.remove('show');
      document.querySelector('.modal-backdrop').remove();
      window.location.reload();
    }, 1000);
  }

}


