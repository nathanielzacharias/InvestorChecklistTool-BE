const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { Board, Checklist, ToDoList } = require('./');
const { string } = require('joi');

const cardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    checklists: {
      type: [Checklist],
    },
    toDoLists: {
      type: [ToDoList],
    },
    note: {
      type: String,
      trim: true,
    },
    links: {
      type: [String],
      trim: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Board,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cardSchema.plugin(toJSON);
cardSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} cardName - The user's card's names
 * @param {mongoose.ObjectId} boardId - The user's name
 * @returns {Promise<boolean>}
 *  */
cardSchema.statics.isNameTaken = async function (cardName, boardId) {
  const card = await this.findOne({ cardName, board: { $eq: boardId } });
  return !!card;
};

/**
 * @typedef Card
 * */
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
