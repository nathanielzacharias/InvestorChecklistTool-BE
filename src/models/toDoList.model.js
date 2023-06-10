const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { Card } = require('./');

const toDoListSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Card,
      required: true,
    },
    freeText: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: 'Not started',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
toDoListSchema.plugin(toJSON);
toDoListSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} toDoListName - The user's toDoList's names
 * @param {mongoose.ObjectId} cardId - The card's name
 * @returns {Promise<boolean>}
 * */
toDoListSchema.statics.isNameTaken = async function (toDoListName, cardId) {
  const toDoList = await this.findOne({ toDoListName, card: { $eq: cardId } });
  return !!toDoList;
};

/**
 * @typedef ToDoList
 * */
const ToDoList = mongoose.model('ToDoList', toDoListSchema);

module.exports = ToDoList;
