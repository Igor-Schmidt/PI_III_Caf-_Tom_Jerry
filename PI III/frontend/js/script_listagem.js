$( document ).ready(function() {

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