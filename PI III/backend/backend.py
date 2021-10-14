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

#Arrumar cadastro clientes
"""@app.route("/cadastrar_cliente", methods=['post'])
def cadastrar_cliente():
    dados_c = request.get_json()
    novo_cliente = Cliente(**dados_c) 
    db.session.add(novo_cliente)
    db.session.commit()
    return {"resultado":'ok'}"""

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

#Arrumar cadastro funcionarios
"""@app.route("/cadastrar_funcionario", methods=['post'])
def cadastrar_funcionario():
    dados_f = request.get_json()
    novo_funcionario = Funcionario(**dados_f) 
    db.session.add(novo_funcionario)
    db.session.commit()
    return {"resultado":'ok'}"""


app.run(debug = True)