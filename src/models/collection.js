'use strict';

class Collection {
  constructor(model){
    this.model = model;
  }

  async create(data){
    try{
      const newRecord = await this.model.create(data);
      return newRecord;

    }catch(e){
      console.error('ModelInterface isn\'t creating', e);
      return e;
    }
  }

  async read(id = null){
    try{
      if(id){
        const singleRecord = await this.model.findByPk(id);
        return singleRecord;
      } else {
        const records = await this.model.findAll();
        return records;
      }
    }catch(error){
      console.error('ModelInterface isn\'t reading', error);
      return error;

    }
  }
}

module.exports = Collection;
