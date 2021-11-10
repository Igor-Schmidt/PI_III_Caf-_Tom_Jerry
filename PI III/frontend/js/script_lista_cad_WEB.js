$( document ).ready(function(){
    var urlWeb = 'https://igorschmidt.pythonanywhere.com/';

    $("#link_listar_clientes").click(function(){

        $.ajax({
            url: urlWeb+'/listar_clientes',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar_clientes, // chama a função listar_clientes
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar_clientes(clientes) {
            // inicializar um acumulador
            linhas = ""
            // percorrer as plantas retornadas em json
            for (var c in clientes) {

              // montar uma linha da tabela de plantas
              lin = "<tr>" +
              "<td>" + clientes[c].nome + "</td>" +
              "<td>" + clientes[c].idade + "</td>" +
              "<td>" + clientes[c].login + "</td>" +
              "<td>" + clientes[c].email + "</td>" +
              "<td>" + clientes[c].telefone + "</td>" +
              "<td>" + clientes[c].endereco + "</td>" +
              '<td>' + '<button id="excluir_' + clientes[c].id + '"class="botao_excluir_cliente"></button>' + '</td>'
              "</tr>";

              // adicionar a linha da tabela em um acumulador
              linhas = linhas + lin;
            }
            // colocar as linhas na tabela
            $("#corpoTabelaClientes").html(linhas);
        }

    });

    $("#link_listar_funcionarios").click(function(){

        $.ajax({
            url: urlWeb+'/listar_funcionarios',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar_funcionarios, // chama a função listar_funcionarios
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar_funcionarios(funcionarios) {
            // inicializar um acumulador
            linhas = ""
            // percorrer as plantas retornadas em json
            for (var f in funcionarios) {

              // montar uma linha da tabela de plantas
              lin = "<tr>" +
              "<td>" + funcionarios[f].nome + "</td>" +
              "<td>" + funcionarios[f].idade + "</td>" +
              "<td>" + funcionarios[f].login + "</td>" +
              "<td>" + funcionarios[f].email + "</td>" +
              "<td>" + funcionarios[f].telefone + "</td>" +
              '<td>' + '<button id="excluir_' + funcionarios[f].id + '"class="botao_excluir_funcionario"></button>' + '</td>'
              "</tr>";

              // adicionar a linha da tabela em um acumulador
              linhas = linhas + lin;
            }
            // colocar as linhas na tabela
            $("#corpoTabelaFuncionarios").html(linhas);
        }
    });

    // código para mapear click do botão cadastrar no site cadastrar_cliente
    $(document).on("click", "#btn_cadastrar_cliente", function() {
        //pegar dados do formulário
        nome_c = $("#nome_c").val();
        idade_c = $("#idade_c").val();
        login_c = $("#login_c").val();
        senha_c = $("#senha_c").val();
        email_c = $("#email_c").val();
        telefone_c = $("#telefone_c").val();
        endereco_c = $("#endereco_c").val();
        // preparar dados no formato json
        var dados_c = JSON.stringify({nome : nome_c, idade : idade_c, login : login_c,
            senha : senha_c, email : email_c, telefone : telefone_c, endereco : endereco_c});
        // fazer requisição para o back-end
        $.ajax({
            url: urlWeb+'/cadastrar_cliente',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados_c, // estes são os dados enviados
            success: clienteCadastrado,
            error: erroCadastroCliente
        });
        function clienteCadastrado (retorno) {
            if (retorno.resultado == "ok") {
                // informar resultado de sucesso
                alert("Cliente cadastrado com sucesso!");
                $("#nome_c").val("");
                $("#idade_c").val("");
                $("#login_c").val("");
                $("#senha_c").val("");
                $("#email_c").val("");
                $("#telefone_c").val("");
                $("#endereco_c").val("");
            }
            else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroCadastroCliente (retorno) {
            // informar mensagem de erro
            alert("Erro: " + retorno.resultado + ":");
        }
    });

    // código para mapear click do botão cadastrar no site cadastrar_funcionario
    $(document).on("click", "#btn_cadastrar_funcionario", function() {
        //pegar dados do formulário
        nome_f = $("#nome_f").val();
        idade_f = $("#idade_f").val();
        login_f = $("#login_f").val();
        senha_f = $("#senha_f").val();
        email_f = $("#email_f").val();
        telefone_f = $("#telefone_f").val();
        // preparar dados no formato json
        var dados_f = JSON.stringify({nome : nome_f, idade : idade_f, login : login_f,
            senha : senha_f, email : email_f, telefone : telefone_f});
        // fazer requisição para o back-end
        $.ajax({
            url: urlWeb+'/cadastrar_funcionario',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados_f, // estes são os dados enviados
            success: funcionarioCadastrado,
            error: erroCadastroFuncionario
        });
        function funcionarioCadastrado (retorno) {
            if (retorno.resultado == "ok") {
                // informar resultado de sucesso
                alert("Funcionário cadastrado com sucesso!");
                $("#nome_f").val("");
                $("#idade_f").val("");
                $("#login_f").val("");
                $("#senha_f").val("");
                $("#email_f").val("");
                $("#telefone_f").val("");
            }
            else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroCadastroFuncionario (retorno) {
            // informar mensagem de erro
            alert("Erro: " + retorno.resultado + ":");
        }
    });

    $(document).on("click", ".botao_excluir_cliente", function(){
        var id_botao = $(this).attr('id'); // var guarda o id do botão excluir
        var nome_descartavel = "excluir_"; // var guarda nome de comparação
        var id_cliente = id_botao.substring(nome_descartavel.length); //var guarda o valor depois do nome de comparação

        $.ajax({
            url: urlWeb+'/excluir_cliente/' + id_cliente,//chmando rota
            type: 'DELETE', //método delete
            dataType: 'json', //dados em formato json
            success: clienteExcluido, //caso de certo executar tal função
            error: erroClieNaoExcluido //caso de erro executar tal função
        });
        function clienteExcluido(retorno){
            if (retorno.resultado == "ok") {
                // caso 'ok' remover linha do cliente excluido, atualizar página
                alert("Cliente excluído com sucesso!")
                location.reload();
            }
            else{
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroClieNaoExcluido (){
            //informa que houve algum erro
            alert("Erro ao executar essa operação, verifique o backend.")
        }
    });

    $(document).on("click", ".botao_excluir_funcionario", function(){
        var id_botao = $(this).attr('id'); // var guarda o id do botão excluir
        var nome_descartavel = "excluir_"; // var guarda nome de comparação
        var id_funcionario = id_botao.substring(nome_descartavel.length); //var guarda o valor depois do nome de comparação

        $.ajax({
            url: urlWeb+'/excluir_funcionario/' + id_funcionario,//chmando rota
            type: 'DELETE', //método delete
            dataType: 'json', //dados em formato json
            success: funcionarioExcluido, //caso de certo executar tal função
            error: erroFuncNaoExcluido //caso de erro executar tal função
        });
        function funcionarioExcluido(retorno){
            if (retorno.resultado == "ok") {
                // caso 'ok' remover linha do funcionario excluido, atualizar página
                alert("Funcionário excluído com sucesso!")
                location.reload();
            }
            else{
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroFuncNaoExcluido (){
            //informa que houve algum erro
            alert("Erro ao executar essa operação, verifique o backend.")
        }
    });

    $(document).on("click", "#link_excluir_clientes", function(){
        $.ajax({
            url: urlWeb+'/excluir_todos_clientes',//chmando rota
            type: 'DELETE', //método delete
            dataType: 'json', //dados em formato json
            success: ClientesExcluidos, //caso de certo executar tal função
            error: ClientesNaoExcluidos //caso de erro executar tal função
        });
        function ClientesExcluidos(){
            alert("Todos os Clientes foram excluídos do banco de dados!")
            location.reload();
        }
        function ClientesNaoExcluidos(){
            alert("Erro ao excluir os Clientes!")
        }
    });

    $(document).on("click", "#link_excluir_funcionarios", function(){
        $.ajax({
            url: urlWeb+'/excluir_todos_funcionarios',//chmando rota
            type: 'DELETE', //método delete
            dataType: 'json', //dados em formato json
            success: FuncionariosExcluidos, //caso de certo executar tal função
            error: FuncionariosNaoExcluidos //caso de erro executar tal função
        });
        function FuncionariosExcluidos(){
            alert("Todos os Funcionários foram excluídos do banco de dados!")
            location.reload();
        }
        function FuncionariosNaoExcluidos(){
            alert("Erro ao excluir os Funcionários!")
        }
    });
});