const { spy, assert, stub, mock } = require('sinon')
const { Database } = require('./database')
const { UsuariosController } = require('./controller')

describe('Controller de Usuários', () => {

    beforeEach(() => {
        
    });

    it('fake', () => {
        const respostaEsperada = [
            {
                id: 10,
                nome: 'João Carlos',
                email: 'email@teste.com'
            }
        ]

        const fakeDatabase = {
            findAll() {
                return respostaEsperada
            }
        }

        const controller = new UsuariosController(fakeDatabase)
        const response = controller.getAll()

        expect(response).toBe(respostaEsperada)
    });

    it('spy', () => {
        const findAll = spy(Database, 'findAll')
        const controller = new UsuariosController(Database)
        controller.getAll()

        assert.calledWith(findAll, 'usuarios')
        findAll.restore() //reset findAll
    });

    it('stub', () => {
        const respostaEsperada = [
            {
                id: 10,
                nome: 'João Carlos',
                email: 'email@teste.com'
            }
        ]
        const findAll = stub(Database, 'findAll')
        findAll.withArgs('usuarios').returns(respostaEsperada)

        const controller = new UsuariosController(Database)
        const response = controller.getAll()

        assert.calledWith(findAll, 'usuarios')
        expect(response).toEqual(respostaEsperada)
        findAll.restore() //reset findAll
    });

   it('mock', () => {
    const respostaEsperada = [
        {
            id: 10,
            nome: 'João Carlos',
            email: 'email@teste.com'
        }
    ]

        const dbMock = mock(Database)
        dbMock.expects('findAll').once().withArgs('usuarios').returns(respostaEsperada)

        const controller = new UsuariosController(Database)
        const response = controller.getAll() //const response = (opcional)
        expect(response).toEqual(respostaEsperada) //opcional

        dbMock.verify()
        dbMock.restore()
    });
}) 