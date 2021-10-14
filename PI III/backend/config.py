# instalação das bibliotecas necessárias
# pip install flask
# pip install flask_sqlalchemy
# pip install flask_cors 

# importações
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify
import os
from flask_cors import CORS

# configurações
# vínculo com o Flask
app = Flask(__name__)

CORS(app)

# caminho do arquivo de banco de dados
caminho = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(caminho, 'cadastros.db')

# sqlalchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+arquivobd

# remover warnings
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# vínculo com o SQLAlchemy 
db = SQLAlchemy(app)