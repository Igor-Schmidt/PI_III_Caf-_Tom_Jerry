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
            url: 'http://localhost:5000/cadastrar_cliente',
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
                $("#dendereco_c").val("");
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
            url: 'http://localhost:5000/cadastrar_funcionario',
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
});