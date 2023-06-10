const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { Card, Board, User } = require('./');

const checklistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Card,
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Board,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    global: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: String,
      default: null,
    },
    columnPosition: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
checklistSchema.plugin(toJSON);
checklistSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} checklistName - The user's checklist's names
 * @param {mongoose.ObjectId} cardId - The card's name
 * @returns {Promise<boolean>}
 */
checklistSchema.statics.isNameTaken = async function (checklistName, cardId) {
  const checklist = await this.findOne({ checklistName, card: { $eq: cardId } });
  return !!checklist;
};

/**
 * @typedef Checklist
 * */
const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;
