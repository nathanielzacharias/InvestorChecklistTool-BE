const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { toDoListService } = require('../services');

const createToDoList = catchAsync(async (req, res) => {
  const toDoList = await toDoListService.createToDoList(req.body);
  res.status(httpStatus.CREATED).send(toDoList);
});

const getToDoLists = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['cardId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await toDoListService.queryToDoLists(filter, options);
  res.send(result);
});

const getToDoList = catchAsync(async (req, res) => {
  const toDoList = await toDoListService.getToDoListById(req.params.toDoListId);
  if (!toDoList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ToDoList not found');
  }
  res.send(toDoList);
});

const updateToDoList = catchAsync(async (req, res) => {
  const toDoList = await toDoListService.updateToDoListById(req.params.toDoListId, req.body);
  res.send(toDoList);
});

const deleteToDoList = catchAsync(async (req, res) => {
  await toDoListService.deleteToDoListById(req.params.toDoListId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createToDoList,
  getToDoLists,
  getToDoList,
  updateToDoList,
  deleteToDoList,
};
