import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  user:any;
  
  constructor(
    private userRest: UserRestService,
    private router: Router,
    ) { 
    this.user = new UserModel('','','','','');
  }

  ngOnInit(): void {
  }

  register() {
    this.userRest.register(this.user).subscribe
      ({

        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
            html: 'Ahora puedes iniciar sesión.',
            confirmButtonColor: '#28B463'
          })
          this.router.navigateByUrl('/login')
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
        },
      });
  }

}
