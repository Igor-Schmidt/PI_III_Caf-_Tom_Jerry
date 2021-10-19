from config import *
from modelo import Cliente
from modelo import Funcionario

# rota raiz, quando chamada sera acionada
@app.route("/")
def inicio():
    return "Backend operante!"

# --------------------------------------------------
# -----CLIENTE----CLIENTE----CLIENTE----CLIENTE-----
# --------------------------------------------------

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

# rota para cadastrar novos clientes
@app.route("/cadastrar_cliente", methods=['post'])
def cadastrar_cliente():
    # preparar uma resposta para a ação
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações do novo cliente
    dados_c = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova_c = Cliente(**dados_c) # criar o novo cliente
      db.session.add(nova_c) # adicionar no BD
      db.session.commit() # operação de gravação
    except Exception as e: # em caso de erro
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

# rota para excluir um cliente
@app.route("/excluir_cliente/<int:cliente_id>", methods=['DELETE'])
def excluir_cliente(cliente_id):
  # prepara resposta para a ação
  resposta = jsonify({"resultado":"ok", "detalhes":"ok"})
  try:
    # exclui o cliente do ID informado
    Cliente.query.filter(Cliente.id == cliente_id).delete()
    db.session.commit()
  except Exception as e:
    # informa mensagem de erro
    resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
  resposta.headers.add("Access-Control-Allow-Origin", "*")
  return resposta

# rota para excluir todos os clientes
@app.route("/excluir_todos_clientes", methods=['DELETE'])
def excluir_todos_clientes():
  # prepara resposta para a ação
  resposta = jsonify({"resultado":"ok", "detalhes":"ok"})
  try:
    # exclui todos os clientes
    db.session.query(Cliente).delete()
    db.session.commit()
  except Exception as e:
    # informa mensagem de erro
    resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
  resposta.headers.add("Access-Control-Allow-Origin", "*")
  return resposta

# ------------------------------------------------------------
# --FUNCIONÁRIO----FUNCIONÁRIO----FUNCIONÁRIO----FUNCIONÁRIO--
# ------------------------------------------------------------

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

# rota para cadastrar novos funcionários
@app.route("/cadastrar_funcionario", methods=['post'])
def cadastrar_funcionario():
    # preparar uma resposta para a ação
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações do novo funcionário
    dados_f = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova_f = Funcionario(**dados_f) # criar o novo funcionário
      db.session.add(nova_f) # adicionar no BD
      db.session.commit() # operação de gravação
    except Exception as e: # em caso de erro
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

# rota para excluir um funcionário
@app.route("/excluir_funcionario/<int:funcionario_id>", methods=['DELETE'])
def excluir_funcionario(funcionario_id):
  # prepara resposta para a ação
  resposta = jsonify({"resultado":"ok", "detalhes":"ok"})
  try:
    # exclui o funcionário do ID informado
    Funcionario.query.filter(Funcionario.id == funcionario_id).delete()
    db.session.commit()
  except Exception as e:
    # informa mensagem de erro
    resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
  resposta.headers.add("Access-Control-Allow-Origin", "*")
  return resposta

# rota para excluir todos os funcionários
@app.route("/excluir_todos_funcionarios", methods=['DELETE'])
def excluir_todos_funcionarios():
  # prepara resposta para a ação
  resposta = jsonify({"resultado":"ok", "detalhes":"ok"})
  try:
    # exclui todos os funcionários
    db.session.query(Funcionario).delete()
    db.session.commit()
  except Exception as e:
    # informa mensagem de erro
    resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
  resposta.headers.add("Access-Control-Allow-Origin", "*")
  return resposta

app.run(debug = True)