const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const toDoListValidation = require('../../validations/toDoList.validation');
const toDoListController = require('../../controllers/toDoList.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('getUsers'), validate(toDoListValidation.createToDoList), toDoListController.createToDoList);

router
  .route('/:todolistId')
  .get(auth('getUsers'), validate(toDoListValidation.getToDoList), toDoListController.getToDoList)
  .patch(auth('getUsers'), validate(toDoListValidation.updateToDoList), toDoListController.updateToDoList)
  .delete(auth('getUsers'), validate(toDoListValidation.deleteToDoList), toDoListController.deleteToDoList);

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
 *     summary: Create a toDoList
 *     description: Create toDoList from selected card.
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
 *               - cardId
 *               - freeText
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 description: title of To Do item
 *               freeText:
 *                 type: string
 *                 description: free text for user to input details
 *               cardId:
 *                 type: string
 *                 description: objectId of card (can be obtained from the react component label/id of the card's component)
 *               status:
 *                 type: string
 *                 enum: [Not started, In progress, Completed, Cancelled]
 *             example:
 *               name: Further reading
 *               freeText: understand concept of ROE after split
 *               cardId: 905acqedf54b54139806aac4
 *               status: Not started
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
 *     summary: Get the toDoList belonging to the given req.params.id
 *     tags: [ToDoLists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: toDoListId
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
 *     summary: Update a toDoList
 *     description: Update a toDoList's fields.
 *     tags: [ToDoLists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: toDoListId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               freeText:
 *                 type: string
 *               status:
 *                 type: string
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
 *     summary: Delete a toDoList
 *     description: A  toDoList can be deleted from the selected card.
 *     tags: [ToDoLists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: toDoListId
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
