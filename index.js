var fields = document.querySelectorAll("#form-user-create [name]"); //traduzindo trás todos os campos para mim que tenha name
//JSON= JavaScript Object Notation, ele é um objeto literal que possui atributos e métodos.
var user = {};

fields.forEach(function(field, index){

    if(field.name == "gender"){
        if(field.checked){
            user[field.name] = field.value;
        }

    }else{
        user[field.name] = field.value;
    }


}); 


console.log(user);