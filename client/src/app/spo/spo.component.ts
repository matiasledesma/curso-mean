import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-spo',
  templateUrl: './spo.component.html',
  styleUrls: ['./spo.component.css'],
  providers: [UserService]
})
export class SPOComponent implements OnInit {

  public title = 'SPO';
  public user: User;
  public identity;
  public token;
  public errorMessage;
  public user_register: User;
  public alertRegister;
  public alertRegisterOk;



  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
    ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');

  }
  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  onSubmit() {
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if (!this.identity._id) {
          alert('El usuario no esta logeado correctamente')
        } else {
          //crear elemento en localstorage
          localStorage.setItem('identity', JSON.stringify(identity))

          //conseguir token
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if (this.token.length <= 0) {
                alert('El token no se a generado')
              } else {
                //crear elemento en localstorage
                localStorage.setItem('token', token)
                this.user = new User('', '', '', '', '', 'ROLE_USER', '');
                //conseguir token

              }
            },
            error => {
              if (error != null) {
                this.errorMessage = error.error.menssage;
              }
            }
          );
        }

      },
      error => {
        console.log(error);

        if (error != null) {
          this.errorMessage = error.error.menssage;
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    this.identity = null;
    this.token = null;
    this._router.navigate(['/spo'])
  }

  onSubmitRegister() {
    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;

        if(!user._id){
          this.alertRegister = 'error al registrarse'
        }else{
          this.alertRegisterOk = 'Registro realizado correctamente, identificate con '+this.user_register.email
          this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
        }
      },
      error => {
        if (error != null) {
          this.alertRegister = error.error.menssage;
          console.log(this.alertRegister);
          
        }
      }
    )
  }

}
