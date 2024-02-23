import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  newPassword: string;

  constructor(private route: ActivatedRoute, public authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  resetPassword(): void {

    this.authService.resetPassword(this.token, this.newPassword).subscribe(res => {
      this.toastr.success('Contraseña cambiada con éxito. Rediriendo a la página de inicio');
      setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }, err => {
      this.toastr.error('Error al cambiar la contraseña');
    }
    );
  }

}
