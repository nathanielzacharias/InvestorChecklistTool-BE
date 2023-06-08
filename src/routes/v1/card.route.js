const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cardValidation = require('../../validations/card.validation');
const cardController = require('../../controllers/card.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('getUsers'), validate(cardValidation.createCard), cardController.createCard)
  .get(auth('getUsers'), validate(cardValidation.getCards), cardController.getCards);

router
  .route('/:cardId')
  .get(auth('getUsers'), validate(cardValidation.getChecklistsAndToDoLists), cardController.getChecklistsAndToDoLists)
  .patch(auth('getUsers'), validate(cardValidation.updateCard), cardController.updateCard)
  .delete(auth('getUsers'), validate(cardValidation.deleteCard), cardController.deleteCard);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Card functions
 */

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Create a card
 *     description: Logged in users can create cards.
 *     tags: [Cards]
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
 *             properties:
 *               name:
 *                 type: string
 *               owner:
 *                 type: string
 *                 description: objectId of logged in user returned after login success
 *               boardId:
 *                 type: string
 *                 description: objectId of board (can be obtained from state of component, or local storage, or cookie)
 *             example:
 *               name: Tesla
 *               owner: 5ebac534954b54139806c112
 *               boardId: aebac993954b54139806d431
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Card'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all cards belonging to the selected board
 *     description: Returns all cards' documents paginated with 10 items per page
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: boardId
 *         schema:
 *           type: string
 *         description: objectId of board (can be obtained from state of component, or local storage, or cookie)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Card'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     summary: Get all checklists and to-do lists belonging to the cardId
 *     description: returns two arrays; checklists and to-do lists
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: cardId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Card'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a card
 *     description: Update a card's fields.
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: cardId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               checklists:
 *                 type: array
 *               toDoLists:
 *                 type: array
 *               note:
 *                 type: object
 *               links:
 *                 type: array
 *             minProperties: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Card'
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
 *     summary: Delete a card
 *     description: A card can be deleted from the selected board.
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: cardId
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
