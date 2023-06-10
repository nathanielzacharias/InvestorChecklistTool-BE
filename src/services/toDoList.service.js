const httpStatus = require('http-status');
const { ToDoList } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a toDoList
 * @param {Object} toDoListBody
 * @returns {Promise<ToDoList>}
 * */
const createToDoList = async (toDoListBody) => {
  if (await ToDoList.isNameTaken(toDoListBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This toDoList already exists');
  }
  return ToDoList.create(toDoListBody);
};

/**
 * Query for toDoLists
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 * */
const queryToDoLists = async (filter, options) => {
  const toDoLists = await ToDoList.paginate(filter, options);
  return toDoLists;
};

/**
 * Get toDoList by id
 * @param {ObjectId} id
 * @returns {Promise<ToDoList>}
 * */
const getToDoListById = async (id) => {
  return ToDoList.findById(id);
};

/**
 * Get toDoList by name
 * @param {string} name
 * @returns {Promise<ToDoList>}
 * */
const getToDoListByName = async (name) => {
  return ToDoList.findOne({ name });
};

/**
 * Update toDoList by id
 * @param {ObjectId} toDoListId
 * @param {Object} updateBody
 * @returns {Promise<ToDoList>}
 * */
const updateToDoListById = async (toDoListId, updateBody) => {
  const toDoList = await getToDoListById(toDoListId);
  if (!toDoList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ToDoList not found');
  }
  if (updateBody.name && (await ToDoList.isNameTaken(updateBody.name, toDoListId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This name is already taken');
  }
  Object.assign(toDoList, updateBody);
  await toDoList.save();
  return toDoList;
};

/**
 * Delete toDoList by id
 * @param {ObjectId} toDoListId
 * @returns {Promise<ToDoList>}
 * */
const deleteToDoListById = async (toDoListId) => {
  const toDoList = await getToDoListById(toDoListId);
  if (!toDoList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ToDoList not found');
  }
  await toDoList.remove();
  return toDoList;
};

module.exports = {
  createToDoList,
  queryToDoLists,
  getToDoListById,
  getToDoListByName,
  updateToDoListById,
  deleteToDoListById,
};
