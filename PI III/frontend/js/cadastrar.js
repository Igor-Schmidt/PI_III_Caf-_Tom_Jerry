$( document ).ready(function(){
    $("#btn_cadastrar_funcionario").click(function(){
        // obter os dados do formulário funcionário
        nome_f = $("#nome_f").val();
        idade_f = $("#idade_f").val();
        login_f = $("#login_f").val();
        senha_f = $("#senha_f").val();
        email_f = $("#email_f").val();
        telefone_f = $("#telefone_f").val();

        // preparar os dados do funcionário para envio (json)
        dados_f = JSON.stringify({nome : nome_f, idade : idade_f, login : login_f,
                                senha : senha_f, email : email_f, telefone : telefone_f});
        alert(dados_f)

        
        //Arrumar cadastros
        // mandar dados do funcionário para o back-end
        /*$.ajax({
            url : 'http://localhost:5000/cadastrar_funcionario',
            type : 'POST',
            contentType : 'application/json', // enviando dados(json)
            dataType: 'json',
            data: dados_f,
            success: cadastroFuncionario,
            error: erroCadastroFuncionario
        });

        function cadastroFuncionario(funcio) {
            alert(funcio.resultado)
            if (funcio.resultado == "ok") {
                // exibe mensagem de sucesso
                alert('Funcionário cadastrado com sucesso!');
                // limpar valores dos campos do formulário
                //$("#nome_planta").val("");
                //$("#nome_cientifico").val("");
                //$("#tamanho_folha").val("");
                //$("#periodo_poda").val("");
            } else {
                alert('Erro no cadastro!');
            }
        }
        function erroCadastroFuncionari(funcio) {
            alert("Erro ao chamar o backend!");
        }*/
    })
})