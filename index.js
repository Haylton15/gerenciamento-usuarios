var fields = document.querySelectorAll("#form-user-create [name]"); //traduzindo trás todos os campos para mim que tenha name
//JSON= JavaScript Object Notation, ele é um objeto literal que possui atributos e métodos.
var user = {};


function addLine(dataUser){
    var tr = document.createElement("tr");

    tr.innerHTML = `
    
      <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${dataUser.admin}</td>
      <td>${dataUser.birth}</td>
      <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
      </td>
    
`;

    document.getElementById("tbody-users").appendChild(tr); //adicionando o elemento ao tbody
    console.log(dataUser);

}


//abaixo estou capturando o evento de submit do formulário, pois o submit é do formulário e não do botão
//a variável (event) ali em específico diz qual elem disparou o evento, qual o momento, se uma tecla em
// específico estav apertada ou seja, informações sobre o evento
document.getElementById("form-user-create").addEventListener("submit", function (event) {

    event.preventDefault(); //isso é para cancelar o comportamento padrão de disparar o evento que no caso seria atualizar a página, com isso, não irá recarregar

    //para montar o json só é interessante quando for enviar o formulário, por isso o trecho abaixo está aqui dentro agora
    fields.forEach(function (field, index) {

        if (field.name == "gender") {
            if (field.checked) {
                user[field.name] = field.value;
            }

        } else {
            user[field.name] = field.value;
        }


    });


    addLine(user);


});