$( document ).ready(function(){

    $("#link_listar_clientes").click(function(){
        
        $.ajax({
            url: 'http://localhost:5000/listar_clientes',
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
              "<td>" + clientes[c].senha + "</td>" +
              "<td>" + clientes[c].email + "</td>" + 
              "<td>" + clientes[c].telefone + "</td>" + 
              "<td>" + clientes[c].endereco + "</td>" +
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
            url: 'http://localhost:5000/listar_funcionarios',
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
              "<td>" + funcionarios[f].senha + "</td>" +
              "<td>" + funcionarios[f].email + "</td>" + 
              "<td>" + funcionarios[f].telefone + "</td>" + 
              "</tr>";

              // adicionar a linha da tabela em um acumulador
              linhas = linhas + lin;
            }
            // colocar as linhas na tabela
            $("#corpoTabelaFuncionarios").html(linhas);
        }
    });
    
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btn_cadastrar_funcionario", function() {
        //pegar dados da tela
        nome_f = $("#nome_f").val();
        idade_f = $("#idade_f").val();
        login_f = $("#login_f").val();
        senha_f = $("#senha_f").val();
        email_f = $("#email_f").val();
        telefone_f = $("#telefone_f").val();
        // preparar dados no formato json
        var dados_f = JSON.stringify({nome : nome_f, idade : idade_f, login : login_f,
            senha : senha_f, email : email_f, telefone : telefone_f});
        alert(dados_f)
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/cadastrar_funcionario',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados_f, // estes são os dados enviados
            success: funcionarioCadastrado, // chama a função listar para processar o resultado
            error: erroCadastroFuncionario
        });
        function funcionarioCadastrado (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Funcionário cadastrado com sucesso!");
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
});