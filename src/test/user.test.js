const UserApi = require('../api/user');
const UserController = require('../controllers/user');
 
jest.mock('../controllers/user', () => ({
  createUser: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  login: jest.fn(),
  validateToken: jest.fn(),
}));
 
describe('UserApi', () => {
  let req, res, next;
 
  beforeEach(() => {
    req = {
      body: {},
      params: {},
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      cookie: jest.fn(),
    };
    next = jest.fn();
  });
 
  describe('createUser', () => {
    it('Necessário criar um usuário válido', async () => {
      req.body = {
        nome: 'Luiz Vicente Parucker',
        email: 'luizvicente.parucker@outlook.com',
        senha: 'password',
      };
 
      UserController.createUser.mockResolvedValue({ id: 1, nome: 'Luiz Vicente Parucker', email: 'luizvicente.parucker@outlook.com' });
 
      await UserApi.createUser(req, res);
 
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ id: 1, nome: 'Luiz Vicente Parucker', email: 'luizvicente.parucker@outlook.com' });
    });
 
    it('Saber como contornar os erros de criação de usuário', async () => {
      req.body = {
        nome: 'Luiz',
        email: 'luizvicente.parucker@gmail.com',
        senha: 'password',
      };
 
      UserController.createUser.mockRejectedValue(new Error('Database conexão erro'));
 
      await UserApi.createUser(req, res);
 
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao criar usuário Database erro de conexão' });
    });
  });
 
  describe('updateUser', () => {
    it('Necessário atualizar um usuário já criado', async () => {
      req.params.id = '1';
      req.body = {
        nome: 'Nome',
        email: 'novo.email@exemplo.com',
        senha: 'novasenha',
      };
 
      UserController.update.mockResolvedValue({ id: 1, nome: 'Nome', email: 'novo.email@exemplo.com' });
 
      await UserApi.updateUser(req, res);
 
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ id: 1, nome: 'Nome', email: 'novo.email@exemplo.com' });
 
      UserController.update.mockRejectedValue(new Error('Usuário não encontrado'));
 
      await UserApi.updateUser(req, res);
 
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao alterar usuário Usuário não encontrado' });
    });
});
});
  
 
 
 
