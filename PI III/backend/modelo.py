from config import *

class Cliente(db.Model):
    # atributos da tabela cliente
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(30))
    idade = db.Column(db.Integer())
    login = db.Column(db.String(30))
    senha = db.Column(db.String(30))
    email = db.Column(db.String(30))
    telefone = db.Column(db.String(30))
    endereco = db.Column(db.String(200))

    # método para expressar o cliente em forma de texto
    def __str__(self):
        return f'(id={self.id}) {self.nome}, {self.idade}, {self.login}'+\
               f'{self.senha}, {self.email}, {self.telefone}, {self.endereco}'

    def json(self):
        return {
            "id" : self.id,
            "nome" : self.nome,
            "idade" : self.idade,
            "login" : self.login,
            "senha" : self.senha,
            "email" : self.email,
            "telefone" : self.telefone,
            "endereco" : self.endereco
        }

class Funcionario(db.Model):
    # atributos da tabela funcionario
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(30))
    idade = db.Column(db.Integer())
    login = db.Column(db.String(30))
    senha = db.Column(db.String(30))
    email = db.Column(db.String(30))
    telefone = db.Column(db.String(30))

    # método para expressar o funcionário em forma de texto
    def __str__(self):
        return f'(id={self.id}) {self.nome}, {self.idade}'+\
               f'{self.login}, {self.senha}, {self.email}, {self.telefone}'

    def json(self):
        return {
            "id" : self.id,
            "nome" : self.nome,
            "idade" : self.idade,
            "login" : self.login,
            "senha" : self.senha,
            "email" : self.email,
            "telefone" : self.telefone
        }

if __name__ == "__main__":
    
    # teste da classe
    if __name__ == "__main__":
        
        # apagar o arquivo, se houver
        if os.path.exists(arquivobd):
            os.remove(arquivobd)

        # criar tabelas
        db.create_all()

        # teste da classe Cliente
        c1 = Cliente(nome = "C1", idade = 22, login = "c1c1", senha = "C1A", email = "c1@gmail.com", 
            telefone = "47 99012 3232", endereco = "Casa Azul número 3")
        c2 = Cliente(nome = "C2", idade = 44, login = "c2c2", senha = "C2B", email = "c2@gmail.com", 
            telefone = "47 99012 3232", endereco = "Casa Vermelha número 90")

        # teste da classe Funcionario
        f1 = Funcionario(nome = "F1", idade = 25, login = "f1f1", senha = "F1A", email = "f1@gmail.com", 
            telefone = "47 99012 3232")
        f2 = Funcionario(nome = "F2", idade = 35, login = "f2f2", senha = "F2B", email = "f2@gmail.com", 
            telefone = "47 99012 3232")       
        
        # persistir
        db.session.add(c1)
        db.session.add(c2)
        db.session.add(f1)
        db.session.add(f2)
        db.session.commit()
        clientes = db.session.query(Cliente).all()
        funcionarios = db.session.query(Funcionario).all()
        
        # exibir as pessoas
        """
        for c in clientes:
            print(c)
            print(c.json())

        for f in funcionarios:
            print(f)
            print(f.json())
        """