const httpStatus = require('http-status');
const { Card, ToDoList, Checklist } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a card
 * @param {Object} cardBody
 * @returns {Promise<Card>}
 */

const createCard = async (cardBody) => {
  if (await Card.isNameTaken(cardBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This card already exists');
  }
  return Card.create(cardBody);
};

/**
 * Query for cards
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 *  */
const queryCards = async (filter, options) => {
  const cards = await Card.paginate(filter, options);
  return cards;
};

/**
 * Get card by id
 * @param {ObjectId} id
 * @returns {Promise<Card>}
 * */
const getCardById = async (id) => {
  return Card.findById(id);
};

/**
 * Get card by name
 * @param {string} name
 * @returns {Promise<Card>}
 * */
const getCardByName = async (name) => {
  return Card.findOne({ name });
};

/**
 * Get all toDoListId's by cardId
 * @param {ObjectId} cardId
 * @returns {Promise<QueryResult>}
 * */
const getAllToDoListsInCard = async (cardId) => ToDoList.find({ cards: { $eq: cardId } });

/**
 * Get all checklistId's by cardId
 * @param {ObjectId} cardId
 * @returns {Promise<QueryResult>}
 * */
const getAllChecklistsInCard = async (cardId) => Checklist.find({ cards: { $eq: cardId } });

const updateCardById = async (cardId, updateBody) => {
  const card = await getCardById(cardId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
  }
  if (updateBody.name && (await Card.isNameTaken(updateBody.name, cardId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This card already exists');
  }
  Object.assign(card, updateBody);
  await card.save();
  return card;
};

/**
 * Delete card by id
 * @param {ObjectId} cardId
 * @returns {Promise<Card>}
 * */
const deleteCardById = async (cardId) => {
  const card = await getCardById(cardId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
  }
  await card.remove();
  return card;
};

module.exports = {
  createCard,
  queryCards,
  getCardById,
  getCardByName,
  getAllToDoListsInCard,
  getAllChecklistsInCard,
  updateCardById,
  deleteCardById,
};
