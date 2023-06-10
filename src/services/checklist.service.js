const httpStatus = require('http-status');
const { Checklist } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a checklist
 * @param {Object} checklistBody
 * @returns {Promise<Checklist>}
 * */
const createChecklist = async (checklistBody) => {
  if (await Checklist.isNameTaken(checklistBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This checklist already exists');
  }
  return Checklist.create(checklistBody);
};

/**
 * Query for checklists
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 * */
const queryChecklists = async (filter, options) => {
  const checklists = await Checklist.paginate(filter, options);
  return checklists;
};

/**
 * Get checklist by id
 * @param {ObjectId} id
 * @returns {Promise<Checklist>}
 * */
const getChecklistById = async (id) => {
  return Checklist.findById(id);
};

/**
 * Get checklist by name
 * @param {string} name
 * @returns {Promise<Checklist>}
 * */
const getChecklistByName = async (name) => {
  return Checklist.findOne({ name });
};

/**
 * Update checklist by id
 * @param {ObjectId} checklistId
 * @param {Object} updateBody
 * @returns {Promise<Checklist>}
 * */
const updateChecklistById = async (checklistId, updateBody) => {
  const checklist = await getChecklistById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  if (updateBody.name && (await Checklist.isNameTaken(updateBody.name, checklistId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This checklist already exists');
  }
  Object.assign(checklist, updateBody);
  await checklist.save();
  return checklist;
};

/**
 * Delete checklist by id
 * @param {ObjectId} checklistId
 * @returns {Promise<Checklist>}
 * */
const deleteChecklistById = async (checklistId) => {
  const checklist = await getChecklistById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  await checklist.remove();
  return checklist;
};

module.exports = {
  createChecklist,
  queryChecklists,
  getChecklistById,
  getChecklistByName,
  updateChecklistById,
  deleteChecklistById,
};
