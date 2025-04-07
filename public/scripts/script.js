document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const projects = document.querySelectorAll('.project-card');

  searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase().trim();

    projects.forEach((project) => {
      const title = project.getAttribute('data-title').toLowerCase(); // Convert title to lowercase
      const summary = project.getAttribute('data-summary').toLowerCase(); // Convert summary to lowercase

      if (title.includes(searchQuery) || summary.includes(searchQuery)) {
        project.style.display = 'block'; // Show matching projects
      } else {
        project.style.display = 'none'; // Hide non-matching projects
      }
    });
  });
});
