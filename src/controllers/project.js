const project = require('../models/project')

class ProjectController {

    async findProject(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const projectValue = await project.findByPk(id)
        
        if (!projectValue) {
            throw new Error('Projeto não encontrado. Por favor repita novamente')
        }

        return projectValue
    }

    

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
        const projectValue = await this.findProject(id)
        projectValue.destroy()

        return
    }

    async find() {
        return project.findAll()
    }

    async update(id, nome, descricao, id_usuario) {
        if (id === undefined || 
            nome === undefined || 
            descricao === undefined || 
            id_usuario === undefined) {
            throw new Error('Id, Nome, descrição e id_usuario são campos obrigatórios.')
        }

        const projectValue = await this.findProject(id)
        if(projectValue.id_usuario == id_usuario){ 
            projectValue.nome = nome
            projectValue.descricao = descricao
            projectValue.save()
            
        return projectValue
        }else{
            throw new Error('Usuario inválido.')
        }
    }

    async createProject(nome, descricao, id_usuario) {
        if (nome === undefined || descricao === undefined || id_usuario === undefined) {
            throw new Error('Nome, descrição e id_usuario serão campos obrigatórios.'+ nome + descricao +"  :  "+ id_usuario)
        }
        const projectValue = await project.create({
            nome,
            descricao,
            id_usuario
        })

        return projectValue
    }
} 

module.exports = new ProjectController()