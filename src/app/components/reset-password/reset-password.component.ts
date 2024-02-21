import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  newPassword: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, public authService: AuthService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  resetPassword(): void {

    this.authService.resetPassword(this.token, this.newPassword).subscribe(res => {
      alert('Contraseña cambiada con éxito');
    }, err => {
      alert('Error al cambiar la contraseña');
    }
    );
  }

}
