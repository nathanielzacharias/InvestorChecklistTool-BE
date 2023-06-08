const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const checklistValidation = require('../../validations/checklist.validation');
const checklistController = require('../../controllers/checklist.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('getUsers'), validate(checklistValidation.createChecklist), checklistController.createChecklist)

router
  .route('/:checklistId')
  .get(auth('getUsers'), validate(checklistValidation.getChecklistsAndToDoLists), checklistController.getChecklistsAndToDoLists)
  .patch(auth('getUsers'), validate(checklistValidation.updateChecklist), checklistController.updateChecklist)
  .delete(auth('getUsers'), validate(checklistValidation.deleteChecklist), checklistController.deleteChecklist);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Checklists
 *   description: Checklist functions
 */

/**
 * @swagger
 * /checklists:
 *   post:
 *     summary: Create a checklist
 *     description: Create checklist from selected card.
 *     tags: [Checklists]
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
 *                 description: if true, this checklist will appear across all cards within a board
 *               rating:
 *                 type: string
 *                 description: one of these [very poor, poor, average, good, very good]
 *               columnPosition:
 *                 type: integer
 *                 description: starts at 0; columnPosition in table; should only be changeable from board model for global checklists
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
 *                $ref: '#/components/schemas/Checklist'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /checklists/{id}:
 *   get:
 *     summary: Get the checklist belonging to the given req.params.id
 *     tags: [Checklists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: checklistId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Checklist'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a checklist
 *     description: Update a checklist's fields.
 *     tags: [Checklists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: checklistId
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
 *                $ref: '#/components/schemas/Checklist'
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
 *     summary: Delete a checklist
 *     description: A checklist can be deleted from the selected board.
 *     tags: [Checklists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: checklistId
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
