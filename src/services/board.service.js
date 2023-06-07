const httpStatus = require('http-status');
const { Board, Card } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a board
 * @param {Object} boardBody
 * @returns {Promise<Board>}
 */
const createBoard = async (boardBody) => {
  if (await Board.isNameTaken(boardBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This board already exists');
  }
  return Board.create(boardBody);
};

/**
 * Query for boards
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBoards = async (filter, options) => {
  const boards = await Board.paginate(filter, options);
  return boards;
};

/**
 * Get board by id
 * @param {ObjectId} id
 * @returns {Promise<Board>}
 */
const getBoardById = async (id) => {
  return Board.findById(id);
};

/**
 * Get board by name
 * @param {string} name
 * @returns {Promise<Board>}
 */
const getBoardByName = async (name) => {
  return Board.findOne({ name });
};

/**
 * Get all cardId's by boardId
 * @param {ObjectId} boardId
 * @returns {Promise<Board>}
 */
const getAllCardsInBoard = async (boardId) => Card.find({ boards: { $eq: boardId } });

/**
 * Update board by id
 * @param {ObjectId} boardId
 * @param {Object} updateBody
 * @returns {Promise<Board>}
 */
const updateBoardById = async (boardId, updateBody) => {
  const board = await getBoardById(boardId);
  const userId = updateBody.owner;
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }
  if (updateBody.name && (await Board.isNameTaken(updateBody.name, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A board by this name already exists');
  }
  Object.assign(board, updateBody);
  await board.save();
  return board;
};

/**
 * Delete board by id
 * @param {ObjectId} boardId
 * @returns {Promise<Board>}
 */
const deleteBoardById = async (boardId) => {
  const board = await getBoardById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }
  await board.remove();
  return board;
};

module.exports = {
  createBoard,
  queryBoards,
  getBoardById,
  getBoardByName,
  getAllCardsInBoard,
  updateBoardById,
  deleteBoardById,
};
