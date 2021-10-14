from config import *
from modelo import Cliente
from modelo import Funcionario

# rota raiz, quando chamada sera acionada
@app.route("/")
def inicio():
    return "Backend operante!"

# rota para listar o clientes cadastrados
@app.route("/listar_clientes")
def listar_clientes():
    clientes = db.session.query(Cliente).all()
    listar_clientes = []
    
    for c in clientes:
        listar_clientes.append(c.json())

    listar_clientes = jsonify(listar_clientes)
    listar_clientes.headers.add("Access-Control-Allow-Origin", "*")
    return listar_clientes

# rota para listar o funcionários cadastrados
@app.route("/listar_funcionarios")
def listar_funcionarios():
    funcionarios = db.session.query(Funcionario).all()
    listar_funcionarios = []

    for f in funcionarios:
        listar_funcionarios.append(f.json())

    listar_funcionarios = jsonify(listar_funcionarios)
    listar_funcionarios.headers.add("Access-Control-Allow-Origin", "*")
    return listar_funcionarios

# teste da rota: curl -d '{"nome":"test111", "idade":"99", "login":"testLogin", "senha":"testSenha", "email":"testEmail@gmail.com", "telefone":"92212-1212","endereco":"Casa Rosa número 99"}' -X POST -H "Content-Type:application/json" http://localhost:5000/cadastrar_cliente
@app.route("/cadastrar_funcionario", methods=['post'])
def cadastrar_funcionario():
    # preparar uma resposta para a ação
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados_f = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova_f = Funcionario(**dados_f) # criar o nvo cliente
      db.session.add(nova_f) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!


app.run(debug = True)