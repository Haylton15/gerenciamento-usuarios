//var fields = document.querySelectorAll("#form-user-create [name]"); //traduzindo trás todos os campos para mim que tenha name
//JSON= JavaScript Object Notation, ele é um objeto literal que possui atributos e métodos.
//var user = {};

let userController = new UserController("form-user-create","tbody-users");
userController.onSubmit();




