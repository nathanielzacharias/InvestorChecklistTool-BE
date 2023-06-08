const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const toDoListValidation = require('../../validations/todolist.validation');
const todolistController = require('../../controllers/todolist.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('getUsers'), validate(todolistValidation.createToDoList), todolistController.createToDoList);

router
  .route('/:todolistId')
  .get(auth('getUsers'), validate(todolistValidation.getToDoListsAndToDoLists), todolistController.getToDoListsAndToDoLists)
  .patch(auth('getUsers'), validate(todolistValidation.updateToDoList), todolistController.updateToDoList)
  .delete(auth('getUsers'), validate(todolistValidation.deleteToDoList), todolistController.deleteToDoList);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ToDoLists
 *   description: ToDoList functions
 */

/**
 * @swagger
 * /todolists:
 *   post:
 *     summary: Create a todolist
 *     description: Create todolist from selected card.
 *     tags: [ToDoLists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - owner
 *               - boardId
 *               - cardId
 *               - global
 *               - rating
 *               - columnPosition
 *             properties:
 *               name:
 *                 type: string
 *               owner:
 *                 type: string
 *                 description: objectId of logged in user returned after login success
 *               boardId:
 *                 type: string
 *                 description: objectId of board (can be obtained from state of component, or local storage, or cookie)
 *               cardId:
 *                 type: string
 *                 description: objectId of card (can be obtained from the react component label/id of the card's component)
 *               global:
 *                 type: boolean
 *                 description: if true, this todolist will appear across all cards within a board
 *               rating:
 *                 type: string
 *                 description: one of these [very poor, poor, average, good, very good]
 *               columnPosition:
 *                 type: integer
 *                 description: starts at 0; columnPosition in table; should only be changeable from board model for global todolists
 *             example:
 *               name: Public sentiment
 *               owner: 5ebac534954b54139806c112
 *               boardId: aebac993954b54139806d431
 *               cardId: 905acqedf54b54139806aac4
 *               global: true
 *               rating: very good
 *               columnPosition: 0
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ToDoList'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /todolists/{id}:
 *   get:
 *     summary: Get the todolist belonging to the given req.params.id
 *     tags: [ToDoLists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: todolistId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ToDoList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a todolist
 *     description: Update a todolist's fields.
 *     tags: [ToDoLists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: todolistId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               global:
 *                 type: boolean
 *               rating:
 *                 type: string
 *                 enum: [very poor, poor, average, good, very good]
 *               columnPosition:
 *                 type: integer
 *                 minimum: 0
 *             minProperties: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ToDoList'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a todolist
 *     description: A todolist can be deleted from the selected board.
 *     tags: [ToDoLists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: todolistId
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
