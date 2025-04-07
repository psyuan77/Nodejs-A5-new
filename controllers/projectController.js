const ProjectOps = require('../data/projectOps');
const projectOps = new ProjectOps();
const fs = require('fs').promises;
const path = require('path');

// List all projects
exports.Projects = async (req, res) => {
  try {
    let projects = await projectOps.getAllProjects();
    if (req.query.format === 'json') {
      return res.json(projects);
    }
    res.render('projects', { title: 'Projects', projects });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load projects' });
  }
};

// Show single project
exports.Project = async (req, res) => {
  try {
    const projectId = req.params.id;
    let project = await projectOps.getProjectById(projectId);
    let projects = await projectOps.getAllProjects();
    
    if (!project) {
      return res.status(404).render('error', { error: 'Project not found' });
    }

    if (req.query.format === 'json') {
      return res.json(project);
    }
    
    res.render('project-detail', {
      title: project.title,
      project,
      projects,
      projectId
    });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load project' });
  }
};

// Show create project form
exports.CreateProjectForm = (req, res) => {
  res.render('project-form', { title: 'Create Project' });
};

// Create new project
exports.CreateProject = async (req, res) => {
  try {
    const projectData = {
      title: req.body.title,
      summary: req.body.summary,
      tech: req.body.tech.split(',').map(t => t.trim()),
      description: req.body.description,
      screenshot: req.file ? `/uploads/${req.file.filename}` : null
    };

    await projectOps.addProject(projectData);
    res.redirect('/projects');
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to create project' });
  }
};

// Show edit project form
exports.EditProjectForm = async (req, res) => {
  try {
    const project = await projectOps.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).render('error', { error: 'Project not found' });
    }
    res.render('project-form', { title: 'Edit Project', project });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load project form' });
  }
};

// Update project
exports.UpdateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const oldProject = await projectOps.getProjectById(projectId);
    
    if (!oldProject) {
      return res.status(404).render('error', { error: 'Project not found' });
    }

    const projectData = {
      title: req.body.title,
      summary: req.body.summary,
      tech: req.body.tech.split(',').map(t => t.trim()),
      description: req.body.description
    };

    // Handle image upload
    if (req.file) {
      // Delete old screenshot if exists
      if (oldProject.screenshot) {
        const oldImagePath = path.join('public', oldProject.screenshot);
        await fs.unlink(oldImagePath).catch(() => {});
      }
      projectData.screenshot = `/uploads/${req.file.filename}`;
    }

    await projectOps.updateProject(projectId, projectData);
    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to update project' });
  }
};

// Delete project
exports.DeleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await projectOps.getProjectById(projectId);
    
    if (!project) {
      return res.status(404).render('error', { error: 'Project not found' });
    }

    // Delete screenshot if exists
    if (project.screenshot) {
      const imagePath = path.join('public', project.screenshot);
      await fs.unlink(imagePath).catch(() => {});
    }

    await projectOps.deleteProject(projectId);
    res.redirect('/projects');
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to delete project' });
  }
};

// Search projects
exports.SearchProjects = async (req, res) => {
  try {
    const { title, summary, description } = req.query;
    let projects = await projectOps.searchProjects(title, summary, description);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search projects' });
  }
};
