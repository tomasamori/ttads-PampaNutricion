import { Component, OnInit } from '@angular/core';
import { TipoMascotaService } from 'src/app/services/tipoMascota/tipoMascota.service';
import { TipoMascota } from 'src/app/models/tipoMascota';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-crud-tipoMascota',
  templateUrl: './crud-tipoMascota.component.html',
  styleUrls: ['./crud-tipoMascota.component.css']
})
export class CrudTipoMascotaComponent implements OnInit {

  constructor(public tipoMascotasService: TipoMascotaService,private router: Router, private toastr: ToastrService) { }
  InsertSuccess =false;
  errorMessage: string = "";

  
  ngOnInit(): void {
    
    if (localStorage.getItem('rol') === 'admin') {
      this.getTipoMascota(); 
      this.InsertSuccess =false;
    }
    else {
      this.router.navigate(['/home']);
    }
  }


  resetForm(form: NgForm) {
  
    form.reset();
    this.getTipoMascota();
    this.cambiarTituloModal("NUEVO TIPO DE MASCOTA");
    this.cambiarTituloModalSuccess("Tipo de Mascota creado con éxito")

  }

  getTipoMascota() {
    this.tipoMascotasService.getAllTiposMascotas().subscribe(
      (res) => {
        this.tipoMascotasService.tipoMascotas = res;
      },
      err => console.log(err)
    )
  }

  addTipoMascota(form: NgForm) {
    this.InsertSuccess = false;
    if (form.value._id) {
      this.tipoMascotasService.updateTipoMascota(form.value).subscribe(
        res => {
        console.log(res);
        this.getTipoMascota();
        this.InsertSuccess = true;   
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
      this.tipoMascotasService.createTipoMascota(form.value).subscribe(
        res => {
          this.getTipoMascota();
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
  }


  deleteTipoMascota(id: string) {  
    this.tipoMascotasService.findProductoByTipoMascota(id).subscribe(
      (res: any[]) => {
        if (!(res && res.length > 0)) {
          if (confirm('¿Seguro quiere eliminar este tipo de mascota?')) {
            this.tipoMascotasService.deleteTipoMacota(id).subscribe(
              () => {
                this.getTipoMascota();
                this.toastr.success('Tipo de mascota eliminado con éxito');
              },
              (err) => console.error(err)
            );
          } else {
          }
        } else {
          alert('No se puede eliminar el tipo de mascota porque tiene productos asociados');
        }
      },
      (err) => console.error(err)
    );
  }

  editTipoMascota(tipoMascota: TipoMascota) {
   
    this.cambiarTituloModal("EDITAR TIPO DE MASCOTA");
    this.cambiarTituloModalSuccess("Tipo de Mascota actualizado con éxito")
    this.tipoMascotasService.selectedTipoMascota = tipoMascota;
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
  this.getTipoMascota();
}

  ModalClose(){
    this.InsertSuccess = false;
  }
    
  

}


