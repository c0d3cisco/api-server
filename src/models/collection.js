'use strict';

class Collection {
  constructor(model){
    this.model = model;
  }

  async create(data){
    try{
      return await this.model.create(data);

    }catch(e){
      console.error('ModelInterface isn\'t creating', e);
      return e;
    }
  }

  async read(id = null){
    try{
      if(id){
        return await this.model.findByPk(id);
      } else {
        const records = await this.model.findAll();
        return records;
      }
    }catch(error){
      console.error('ModelInterface isn\'t reading', error);
      return error;

    }
  }

  async readWithAssociations(associatedModel, id = null){
    try {
      if(id){
        return await this.model.findAll({
          include: {model: associatedModel},
          where: {id: id},
        });
      } else {
        return await this.model.findAll({include: {model: associatedModel}});
      }
    } catch (error) {
      console.error('ModelInterface isn\'t reading', error);
      return error;
    }
  }


  async update(body, id){
    try {
      await this.model.update(body, {where: {id: id}});
    } catch (error) {
      console.error('ModelInterface isn\'t updating', error);
      return error;
    }
  }

  async delete(id){
    try {
      return await this.model.destroy({where: {id: id}});
    } catch (error) {
      console.error('ModelInterface isn\'t deleting', error);
    }
  }
}

module.exports = Collection;
