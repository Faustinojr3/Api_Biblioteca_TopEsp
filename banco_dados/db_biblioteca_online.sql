CREATE DATABASE biblioteca_online_db;
USE biblioteca_online_db;

CREATE TABLE autor (
    id int not null auto_increment PRIMARY KEY,
    nome varchar(255) not null,
    nacionalidade varchar(255) not null,
    data_nascimento varchar(255),
    perfil varchar(255)
);

CREATE TABLE editora (
    id int not null auto_increment PRIMARY KEY,
    razao_social varchar(255) not null,
    nome_fantasia varchar(255) not null,
    cnpj varchar(255) not null
);

CREATE TABLE livro (
    id int not null auto_increment PRIMARY KEY,
    sinopse varchar(500),
    isbn varchar(255) not null,
    titulo varchar(255) not null,
    quantidade_exemplares int not null,
    ano_publicacao date not null,
    exemplares_disponivel int not null,
    autor_id int not null,
    editora_id int not null,
    FOREIGN KEY(autor_id) REFERENCES autor (id),
    FOREIGN KEY(editora_id) REFERENCES editora (id)
);

CREATE TABLE endereco (
    id int not null auto_increment PRIMARY KEY,
    numero varchar(255) not null,
    bairro varchar(255) not null,
    cidade varchar(255) not null,
    estado varchar(255) not null,
    cep varchar(255) not null,
    rua varchar(255) not null,
    pais varchar(255) not null,
    complemento varchar(255)
);

CREATE TABLE contato (
    id int not null auto_increment PRIMARY KEY,
    rede_social varchar(255) not null,
    email varchar(255) not null,
    celular varchar(255) not null,
    telefone varchar(255) not null
);

CREATE TABLE pessoa (
    id int not null auto_increment PRIMARY KEY,
    nome varchar(255) not null,
    cpf varchar(255) not null,
    rg varchar(255) null,
    data_nascimento varchar(255) not null,
    sexo varchar(255) not null,
    contato_id int not null,
    endereco_id int not null,
    FOREIGN KEY(contato_id) REFERENCES contato (id),
    FOREIGN KEY(endereco_id) REFERENCES endereco (id)
);

CREATE TABLE emprestimo (
    id int not null auto_increment PRIMARY KEY,
    data_hora_emprestimo datetime null,
    data_previsao_entrega date null,
    data_entregue varchar(300),
    data_hora_solicitacao datetime not null,
    qtd_emprestada int null,
    pessoa_id int not null,
    livro_id int not null,
    FOREIGN KEY(pessoa_id) REFERENCES pessoa (id),
    FOREIGN KEY(livro_id) REFERENCES livro (id)
);

#INSERT
#Tabela Autor
insert into autor values(1, 'Lewis Carroll', 'Britânico','1832-01-27', ' Lewis Carroll era o pseudônimo de Charles Lutwidge Dodgson, um renomado matemático e escritor inglês conhecido por suas obras literárias infantis');
insert into autor values(2, 'J.R.R. Tolkien', 'Britânico', '1832-01-03','J.R.R. Tolkien foi um renomado escritor, filólogo e professor universitário britânico. Ele é mais conhecido por suas obras de fantasia, como "O Hobbit" e "O Senhor dos Anéis"');
insert into autor values(3, 'J.K. Rowling', 'Britânico', '1965-07-31', 'J.K. Rowling, cujo nome verdadeiro é Joanne Rowling, é uma escritora britânica conhecida por ser a autora da série de livros "Harry Potter", que se tornou um fenômeno mundial');
insert into autor values(4, 'Stephen Hawking', 'Britânico', '1942-01-08', 'Stephen Hawking foi um renomado físico teórico britânico, conhecido por suas contribuições para a cosmologia e a gravidade quântica. "Uma Breve História do Tempo" é uma de suas obras mais famosas');
insert into autor values(5, 'Mário de Andrade', 'Brasileiro', '1893-10-09', 'Mário de Andrade foi um importante escritor, musicólogo, folclorista e crítico literário brasileiro. "Macunaíma" é considerado uma das obras mais importantes do modernismo brasileiro');
insert into autor values(6, 'Joaquim Manuel de Macedo', 'Brasileiro', '1820-06-24','Joaquim Manuel de Macedo foi um escritor, professor, político e jornalista brasileiro. "A Moreninha" é uma das primeiras novelas românticas da literatura brasileira');
insert into autor values(7, 'Aluísio Azevedo', 'Brasileiro', '1857-04-14', 'Aluísio Azevedo foi um importante escritor e jornalista brasileiro. "O Cortiço" é considerado uma das principais obras do naturalismo brasileiro');
insert into autor values(8, 'Douglas Adams', 'Britânico', '1952-03-11', ' Douglas Adams foi um escritor britânico conhecido por sua série de livros de ficção científica cômica "O Guia do Mochileiro das Galáxias". Ele combinou elementos de humor e sátira com temas de viagens intergalácticas e filosofia existencial');
insert into autor values(9, 'Dan Brown', 'Americana', '1964-06-22', 'Dan Brown é um escritor americano conhecido por seus romances de suspense e mistério, que geralmente envolvem elementos de arte, história e simbologia. "Inferno" é um de seus livros populares');
insert into autor values(10, 'Anthony Burgess', 'Britânico', '1917-02-25', ' Anthony Burgess foi um escritor e compositor britânico. Ele é conhecido por suas obras literárias, críticas sociais e exploração de temas como livre-arbítrio e violência. "Laranja Mecânica" é um de seus livros mais famosos, publicado em 1962');

#Tabela Editora
insert into editora values(1, 'Penguin Group', 'Penguin Classics', '18.957.352/0001-03');#alice no pais das maravilhas
insert into editora values(2, 'HarperCollins Publishers', ' HarperCollins', '20.813.959/0001-53');#o hobbit
insert into editora values(3, 'WMF Martins Fontes Ltda.', 'Martins Fontes', '08.463.170/0001-14');# o senho dos aneis, o hobbit, o silmarillion
insert into editora values(4, 'Editora Rocco Ltda', 'Rocco', '09.323.431/0001-63');#harry potter
insert into editora values(5, 'Editora Intrinseca LTDA.', 'Editora Intrínseca', '05.660.045/0001-06');#uma breve historia do tempo
insert into editora values(6, 'Livraria Martins Editora Ltda.', 'Livraria Martins Editora', '08.271.937/0001-03');#macunaima
insert into editora values(7, 'Editora Martin Claret', 'Editora Martin Claret','43.079.805/0001-85');#a moreninha
insert into editora values(8, 'Editora Garnier Ltda.', 'Editora Garnier','61.400.966/0002-91');#o cortiço
insert into editora values(9, 'Editora Sextante Ltda.', 'Sextante', ' 05.660.045/0001-06');#guia do mochileiro das galaxia

#Insert livro
insert into livro values(1, 'A história de uma menina chamada Alice que cai em uma toca de coelho e entra em um mundo fantástico cheio de criaturas peculiares e situações absurdas', '9780141439761', 'Alice no País das Maravilhas', 40, '1865-07-04' ,40, 1, 1);
insert into livro values(2, 'A história de Bilbo Bolseiro, um hobbit que embarca em uma jornada inesperada ao lado de treze anões e um mago, enfrentando perigos e buscando um tesouro guardado por um dragão','9780261103283','O Hobbit', 30, '1937-09-21', 30, 2, 2);
insert into livro values(3, 'Uma aventura épica que segue a jornada do hobbit Frodo Bolseiro e seus companheiros em busca da destruição do Um Anel, enquanto enfrentam forças do mal e lutam pela salvação da Terra-média.','9780345339706','O Senhor dos Anéis', 25, '1954-07-29', 25, 2, 2);
insert into livro values(4, 'Uma obra que narra a história da criação do mundo, mitos, lendas e eventos que moldaram a Terra-média, apresentando personagens e eventos que são precursores dos acontecimentos em "O Hobbit" e "O Senhor dos Anéis"','9780261102422','O Silmarillion"', 30, '1977-09-15',30, 2, 2);
insert into livro values(5, 'A saga de um jovem bruxo chamado Harry Potter, que descobre ser um bruxo famoso e é enviado para a Escola de Magia e Bruxaria de Hogwarts, onde enfrenta desafios, amizades e o confronto com o Lorde das Trevas, Voldemort','Varia para cada livro da série', 'Harry Potter', 50, '1997-06-26', 50, 3, 4);
insert into livro values(6, 'Uma exploração fascinante do campo da cosmologia, escrita pelo renomado físico Stephen Hawking, onde ele aborda temas como a origem do universo, buracos negros, a natureza do tempo e outras teorias científicas complexas.','9780857501004','Uma Breve História do Tempo',60, '1988-04-01',60, 4, 5);
insert into livro values(7, 'A obra narra as aventuras de Macunaíma, um herói preguiçoso e sem caráter que percorre o Brasil em busca do amuleto perdido de sua tribo. O livro aborda questões de identidade nacional, mitologia e crítica social','9788527301028','Macunaíma', 80, '1928-10-16', 80, 5, 6);
insert into livro values(8, 'Uma história de amor e romance ambientada no Rio de Janeiro do século XIX. O livro conta a história de Augusto, um jovem que se apaixona por Carolina, conhecida como A Moreninha, durante uma estadia em uma ilha','9788533611339', 'A Moreninha', 100, '1844-12-12', 100, 6, 7);
insert into livro values(9, 'O livro retrata a vida em um cortiço no Rio de Janeiro do final do século XIX, mostrando a realidade das pessoas que vivem em condições precárias e a luta pela sobrevivência em um ambiente degradado.', '9788525417210', 'O Cortiço', 90, '1890-10-15' ,90, 7, 8);
insert into livro values(10, 'O livro acompanha as aventuras de Arthur Dent, um terráqueo comum que, após a destruição da Terra para a construção de uma via expressa hiperespacial, se junta a um excêntrico alienígena chamado Ford Prefect.','9788576160423','O Guia do Mochileiro das Galáxias', 50, '1979-10-12' ,50, 10, 9);

#Insert inyo endereco
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (1, '937', 'Puce', 'Boavista', 'Viseu', '4690-696', 'Park Meadow', 'Portugal', 'Europe/Lisbon');
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (2, '2', 'Teal', 'Yuelai', 'Viseu', '4690-696', 'Arrowood', 'China', 'Asia/Shanghai');
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (3, '95550', 'Goldenrod', 'Santa Rosa', 'Veracruz Llave', '96556', 'Stoughton', 'Mexico', 'America/Mexico_City');
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (4, '9322', 'Orange', 'Lansing', 'Michigan', '48912', 'Oxford', 'United States', 'America/Detroit');
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (5, '2591', 'Khaki', 'Chernyakhovsk', 'Michigan', '238158', 'Mifflin', 'Russia', 'Europe/Kaliningrad');
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (6, '835', 'Goldenrod', 'Kouvarás', 'Michigan', '238158', 'Mandrake', 'Greece', 'Europe/Athens');
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (7, '24216', 'Violet', 'Qala i Naw', 'Michigan', '238158', 'Bashford', 'Afghanistan', 'Asia/Kabul');
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (8, '0629', 'Maroon', 'Kauditan', 'Michigan', '238158', 'Pond', 'Indonesia', 'Asia/Makassar');
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (9, '981', 'Goldenrod', 'Mazańcowice', 'Michigan', '43-391', 'Eagan', 'Poland', 'Europe/Warsaw');
insert into endereco (id, numero, bairro, cidade, estado, cep, rua, pais, complemento) values (10, '40523', 'Puce', 'Rungkang','Viseu', '4690-696', 'Mandrake', 'Indonesia', 'Asia/Jakarta');	

#Insert contato
insert into contato (id, rede_social, email, celular, telefone) values (1, 'Cisgender Woman', 'sfoulgham0@yandex.ru', '(743) 8315421', '736-726-5446');
insert into contato (id, rede_social, email, celular, telefone) values (2, 'Trans Woman', 'alehenmann1@weather.com', '(545) 4203122', '976-725-7589');
insert into contato (id, rede_social, email, celular, telefone) values (3, 'Pangender', 'cmitie2@friendfeed.com', '(184) 4240569', '586-850-2599');
insert into contato (id, rede_social, email, celular, telefone) values (4, 'Neutrois', 'bremer3@economist.com', '(953) 3674366', '840-440-8309');
insert into contato (id, rede_social, email, celular, telefone) values (5, 'Two-Spirit', 'bjewes4@facebook.com', '(304) 4591502', '835-259-4759');
insert into contato (id, rede_social, email, celular, telefone) values (6, 'Gender Questioning', 'lgallichan5@hhs.gov', '(786) 4578067', '838-148-0427');
insert into contato (id, rede_social, email, celular, telefone) values (7, 'FTM', 'roag6@home.pl', '(909) 1066827', '250-745-4153');
insert into contato (id, rede_social, email, celular, telefone) values (8, 'Androgynous', 'jwatting7@google.com.au', '(955) 7159648', '747-300-0562');
insert into contato (id, rede_social, email, celular, telefone) values (9, 'Non-binary', 'sshetliff8@bluehost.com', '(627) 4397333', '112-389-9035');
insert into contato (id, rede_social, email, celular, telefone) values (10, 'Intersex', 'tmcnuff9@zdnet.com', '(598) 3175408', '489-899-2766');

#Insert pessoa
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (1, 'Davidson Rudgard', 11, 10, '1998-01-24', 'Male', 1, 1);
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (2, 'Daveen Kanzler', 11, 10, '1996-11-15', 'Female', 2, 2);
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (3, 'Martyn Maciaszczyk', 11, 10, '2010-02-08', 'Male', 3, 3);
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (4, 'Den Uglow', 11, 10, '1971-05-06', 'Male', 4, 4);
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (5, 'Marcos O''Noulane', 11, 10, '1993-01-02', 'Male', 5, 5);
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (6, 'Hillary Rew', 11, 10, '1982-10-26', 'Female', 6, 6);
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (7, 'Irena Lobe', 11, 10, '1985-02-07', 'Agender', 7, 7);
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (8, 'Laverna Kytley', 11, 10, '1960-06-28', 'Female', 8, 8);
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (9, 'Marleah Laugherane', 11, 10, '1979-06-02', 'Female', 9, 9);
insert into pessoa (id, nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id) values (10, 'Carling Astle', 11, 10, '1964-03-24', 'Male', 10, 10);


select
	emprestimo.id as 'Emprestimo',
    livro.titulo as 'Livro',
    pessoa.nome as 'pessoa',
    pessoa.cpf as 'cpf',
    emprestimo.data_hora_emprestimo as 'Data emprestimo',
    emprestimo.data_previsao_entrega as 'Previsao de entrega',
    livro.id as 'id livro',
    pessoa.id as 'id pessoa',
	livro.exemplares_disponivel as 'Exemplares disponível',
    emprestimo.qtd_emprestada as 'Quantidade emprestada',
    emprestimo.data_entregue as 'Data de devolução'
from
	emprestimo
inner join livro on (emprestimo.livro_id = livro.id)
inner join pessoa on (emprestimo.pessoa_id =  pessoa.id);

select * from pessoa;    
    


