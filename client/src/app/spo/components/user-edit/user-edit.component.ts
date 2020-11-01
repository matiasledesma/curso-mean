import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/spo/models/user';
import { UserService } from 'src/app/spo/services/user.service';


@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  user: User
  public alertUpdate;
  public alertUpdateOk;
  public identity;
  public token;
  public title;
  constructor(private _userService: UserService) {
    this.title = 'Datos Del Usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
   }

  ngOnInit() {
  }

  onSubmit(){
  this._userService.update_user(this.user).subscribe(
    response =>{
      if(!response.user){
        this.alertUpdate = 'error al actualizar'
      }else{
        if(!this.filesToUpload){

        }else{
          this.makeFileRequest('/api/upload-image-user/'+this.user._id, [], this.filesToUpload).then(
            (result: any) => {
              this.user.image = result.image;
              var imagepath = this.user.image;
              document.getElementById('user_image_loged').setAttribute('src','/api/get-image-user/'+ imagepath)
            }
          )
        }
        localStorage.setItem('identity', JSON.stringify(this.user))
        this.alertUpdateOk = 'Datos actualizados con exito'
        console.log(this.user);
        
      }
    },
    error => {
      if (error != null) {
        this.alertUpdate = error.error.message;
        console.log(this.alertUpdate);
        
      }
    }
  )
  }

  public filesToUpload: Array<File>;

  fileChangeEvent(fileinput: any){
    this.filesToUpload = <Array<File>>fileinput.target.files;
    
  }

  makeFileRequest(url: string, params: Array<string>, files:Array<File>){
    var token = this.token;
    return new Promise(function(resolve, reject){
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i=0; i< files.length; i++){
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))
          }else{
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST',url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    })

  }
}