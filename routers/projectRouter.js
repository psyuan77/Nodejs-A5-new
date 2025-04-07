const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { isAdmin } = require('../middleware/auth');

// Search projects
router.get('/search', projectController.SearchProjects);

// Create project routes (admin only)
router.get('/create', isAdmin, projectController.CreateProjectForm);
router.post('/', isAdmin, (req, res, next) => {
  req.app.locals.upload.single('screenshot')(req, res, next);
}, projectController.CreateProject);

// Read project routes (public)
router.get('/', projectController.Projects);
router.get('/:id', projectController.Project);

// Update project routes (admin only)
router.get('/:id/edit', isAdmin, projectController.EditProjectForm);
router.post('/:id/update', isAdmin, (req, res, next) => {
  req.app.locals.upload.single('screenshot')(req, res, next);
}, projectController.UpdateProject);

// Delete project route (admin only)
router.post('/:id/delete', isAdmin, projectController.DeleteProject);

module.exports = router;
