/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    lineItems: {
      collection: 'product'
    },
    totalCost: {
      type: 'float',
      required: true
    },
    createdDate: {
      type: 'datetime',
      required: true
    },
    location: {
      model: 'location'
    },
    buyer: {
      model: 'user'
    }

  }
};

