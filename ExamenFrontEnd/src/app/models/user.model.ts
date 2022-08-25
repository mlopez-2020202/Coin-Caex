export class UserModel {
    constructor(
      public id: string,
      public nombre: string,
      public apellido: string,
      public correo: string,
      public contrasena: string,
    ){}
}