import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFotoService {

  constructor(private http:HttpClient) { }

  URL_API = environment.URL_CLOUDINARY;
  uploadImg(vals):Observable<any>{
    let data = vals;
    return this.http.post(this.URL_API+'upload',data);
  }

  Foto(_data:any){
    const file_data = _data //this.files[0];
    const data = new FormData();
    data.append('file',file_data);
    data.append('upload_preset','PampaNutricion');
    data.append('cloud_name',environment.cloud_name);
    return data;

  }

}
