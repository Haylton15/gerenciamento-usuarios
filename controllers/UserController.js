class UserController {
    constructor(formId, tableId) {

        this.formEL = document.getElementById(formId);
        this.tableEL = document.getElementById(tableId);

        //em vez de precisar de chamar lá na index esse método, ele já executa automaticamente
        this.onSubmit();
    }

    //método para capturar o eventListener do botão de enviar
    onSubmit() {

        //abaixo estou capturando o evento de submit do formulário, pois o submit é do formulário e não do botão
        //a variável (event) ali em específico diz qual elem disparou o evento, qual o momento, se uma tecla em
        // específico estav apertada ou seja, informações sobre o evento
        this.formEL.addEventListener("submit", event => {

            event.preventDefault(); //isso é para cancelar o comportamento padrão de disparar o evento que no caso seria atualizar a página, com isso, não irá recarregar

            let user = this.getValues(); //getValues() ele depois de executar ele devolve uam instancia desse usuário
        
            //o getPhoto vai receber através do callback ()=> o conteudo do arquivo (content)
            this.getPhoto((content)=>{
                user.photo = content; 
                //só depois de ter a foto, adiciono a linha
                this.addLine(user);
            });




        });

    }

    //método para manipular a foto
    getPhoto(callback){
        let fileReader = new FileReader();

        //o filter vai pegar do array apenas o campo da photo
        let elements = [...this.formEL.elements].filter(item=>{
            if (item.name === "photo"){
                return item;
            } 
        });

        //foi filtrada uma coleção e dessa coleção, só um arquivo
        let file = elements[0].files[0];      


        //é necessário ter o onload pq é quando essa foto terminar de carregar. o ()=> é uma função de callback pq vai que demora e então a função é apenas executada depois de terminar
        //ou seja o callback aqui é depois de carregar a imagem o onload, execute essa função ()=>
        fileReader.onload = () =>{
            //o result vai ter o conteúdo do arquivo enviado que vai vir como URL em base64 
            callback(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }

    //método para pegar os valores do formulário, atrvés do id do formulario, retornando o usuário.
    getValues() {

        let user = {};
        //para montar o JSON só é interessante quando for enviar o formulário, por isso o trecho abaixo está aqui dentro agora
        // this.formEL.elements é uma coleção de HTML e não um Array, por isso o forEach não funcionada, para isso
        //temos o operador spread [...elementosHTMLaqui] que transforma em array e diz quantos indices tem para o forEach varrer
        [...this.formEL.elements].forEach(function (field, index) {

            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }

            } else {
                user[field.name] = field.value;
            }


        });
        //objeto é uma instancia que representa uma classe
        //pq é possível carregar User aqui sendo que não importei nem nada? Pq a ordem de carregamento de script na página está primeiro a classe User
        //o user que estou passando nos paramettros de User, é um objeto JSON que vai virar js novamente
        return new User(
            user.name,
            user.gender,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin);


    }


    addLine(dataUser) {
        //agora dataUser é um objeto de instancia da classe User, não mais um JSON
        //tableEL é o elemento de tabela que será alvo
        this.tableEL.innerHTML = `
        <tr>
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
        </tr>
        `;


    }

}