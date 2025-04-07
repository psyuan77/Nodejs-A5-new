const Project = require('../models/project');

class ProjectOps {
  async getAllProjects() {
    try {
      return await Project.find({}).sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error getting all projects:', error);
      throw error;
    }
  }

  async getProjectById(id) {
    try {
      return await Project.findById(id);
    } catch (error) {
      console.error(`Error getting project by id ${id}:`, error);
      throw error;
    }
  }

  async addProject(projectData) {
    try {
      const project = new Project(projectData);
      return await project.save();
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  }

  async updateProject(id, projectData) {
    try {
      return await Project.findByIdAndUpdate(id, projectData, {
        new: true,
        runValidators: true
      });
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      return await Project.findByIdAndDelete(id);
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  }

  async searchProjects(title, summary, description) {
    try {
      if (!title && !summary && !description) {
        return [];
      }

      let searchConditions = [];

      if (title) {
        searchConditions.push({ title: { $regex: title, $options: 'i' } });
      }
      if (summary) {
        searchConditions.push({ summary: { $regex: summary, $options: 'i' } });
      }
      if (description) {
        searchConditions.push({
          description: { $regex: description, $options: 'i' },
        });
      }

      let query = searchConditions.length > 0 ? { $or: searchConditions } : {};
      return await Project.find(query);
    } catch (error) {
      console.error('Error searching projects:', error);
      throw error;
    }
  }
}

module.exports = ProjectOps;
