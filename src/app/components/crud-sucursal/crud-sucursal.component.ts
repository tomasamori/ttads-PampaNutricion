import { Component, OnInit } from '@angular/core';
import { StoreLocatorService } from 'src/app/services/store-locator/store-locator.service';
import { NgForm } from "@angular/forms";
import { Storelocator } from 'src/app/models/store-locator';
import { Localidad } from 'src/app/models/localidad';
import { LocalidadService } from 'src/app/services/localidad/localidad.service';
import {UploadFotoService} from 'src/app/services/Cloudinary/upload-foto.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-sucursal',
  templateUrl: './crud-sucursal.component.html',
  styleUrls: ['./crud-sucursal.component.css'],
  providers:[UploadFotoService]
})
export class CrudSucursalComponent implements OnInit {

  localidad: Localidad;

  constructor(public StoreLocatorService: StoreLocatorService, public LocalidadService: LocalidadService, private _UploadFotoService:UploadFotoService,private router: Router) { }
  InsertSuccess =false;
  errorMessage: string = "";
  files: File[] = [];
  btn:boolean=true;
  ins:boolean=true;
  emp:boolean=false;
  BackgroundTitlePick:string;
  hide:boolean=true

  ngOnInit(): void {

    //const cld = new Cloudinary({cloud: {cloudName: 'drwkty7lb'}});
    
    if (localStorage.getItem('rol') === 'admin') {
      this.getSucursal(); 
      this.InsertSuccess =false;
      this.getLocators();
    }
    else {
      this.router.navigate(['/home']);
    }
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

  resetForm(form: NgForm) {
    form.reset();
    this.getSucursal();
    this.getLocators();
    this.cambiarTituloModal("NUEVA SUCURSAL");
    this.cambiarTituloModalSuccess("Sucursal Creada con Exito!")
    this.StoreLocatorService.selectedSucursal.localidad._id = '';
    this.BackgroundTitlePick = 'Subir imagen.'
    this.hide = false;
    this.ins= true;
  }

  getSucursal() {
    this.StoreLocatorService.getAllStorelocator().subscribe(
      (res) => {
        this.StoreLocatorService.storeLocators = res;
      },
      err => console.log(err)
    )
  }

  addSucursal(form: NgForm) {
    
    if (!form.value._id) {
      this.emp = !this.files[0]
      if (!this.emp){
      this.btn= false;
      let dataURl = this._UploadFotoService.Foto(this.files[0])
      this._UploadFotoService.uploadImg(dataURl).subscribe(
        res => {
          form.value.foto = res['secure_url'];
          this.sigue_addSuc(form);
        }, err => {
          console.log(err)
        }
      )
      }
    } else {
      if (!this.files[0]) {
        this.btn= false;
        this.sigue_addSuc(form);
      } else {
        this.btn= false;
       // let imgOld = form.value.foto;
        let dataURl = this._UploadFotoService.Foto(this.files[0]);
        this._UploadFotoService.uploadImg(dataURl).subscribe(
          res => {
            form.value.foto = res['secure_url'];
            this.sigue_addSuc(form);
          }, err => {
            console.log(err)
          })
      }
    }
  }

  sigue_addSuc(form: NgForm){
    this.InsertSuccess = false;
    if (form.value._id) {
      this.StoreLocatorService.updateStorelocator(form.value).subscribe(
        res => {
        console.log(res);
        this.getSucursal();
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
      this.StoreLocatorService.createStorelocator(form.value).subscribe(
        res => {
          this.getSucursal();
          form.reset();
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
    this.CloseModal('SucursalModal');
    this.hide = true;
  }

  deleteSucursal(id: string) {
    if (confirm('Seguro quieres eliminar esta sucursal?')) {
      this.StoreLocatorService.deleteStorelocator(id).subscribe(
        (res) => {
          this.getSucursal();
        },
        (err) => console.error(err)
      );
    }

  }

  editSucursal(sucursal: Storelocator) {
    this.cambiarTituloModal("EDITAR SUCURSAL");
    this.cambiarTituloModalSuccess("Sucursal Actualizada con Exito!")
    this.StoreLocatorService.selectedSucursal = sucursal;
    this.StoreLocatorService.selectedSucursal.localidad._id = sucursal.localidad._id; 
    this.BackgroundTitlePick = 'Subir imagen si desea cambiarla.'
    this.ins= false;
    this.hide = false;
   
  }

  getLocators() {
    this.LocalidadService.getAllLocalidades().subscribe(
      (res) => {
        this.LocalidadService.Localidades = res;
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
  this.files = [];
  this.getSucursal();
  this.hide = true;
}

  ModalClose(){
    this.InsertSuccess = false;
  }

  CloseModal(id: string): void {
    setTimeout(() => {
      document.getElementById(id).classList.remove('show');
      document.querySelector('.modal-backdrop').remove();
      window.location.reload();
    }, 1000);
  }
  

}


