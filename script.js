class GitHubFinder {
    constructor() {
      this.apiBase = 'https://api.github.com/users/';
      this.profileContainer = document.querySelector('#profile');
      this.reposContainer = document.querySelector('#repos');
      this.spinner = document.querySelector('#spinner');
    }
  
    // Fetch User Profile
    async fetchUserProfile(username) {
      this.showSpinner();
      const response = await fetch(`${this.apiBase}${username}`);
      if (!response.ok) {
        this.hideSpinner();
        throw new Error('User not found');
      }
      const userData = await response.json();
      this.hideSpinner();
      return userData;
    }
  
    // Fetch User Repositories
    async fetchUserRepos(username) {
      const response = await fetch(`${this.apiBase}${username}/repos`);
      const repos = await response.json();
      return repos.slice(0, 5); // 최신 5개 리포지토리
    }
  
    // Render User Profile
    renderUserProfile(user) {
      const html = `
        <img src="${user.avatar_url}" alt="Avatar">
        <h2>${user.name || user.login}</h2><br><br>
        <div class="profile-info">
        <a href="${user.html_url}" target="_blank">View Profile</a>
          <div class="info-item">Public Repos: ${user.public_repos}</div>
          <div class="info-item">Followers: ${user.followers}</div>
          <div class="info-item">Following: ${user.following}</div>
        </div>
      `;
      this.profileContainer.innerHTML = html;
    }
  
    // Render Repositories
    renderUserRepos(repos) {
      const reposHTML = repos
        .map(
          (repo) =>
            `<div class="repo">
          <h4>${repo.name}</h4>
          <div class="repo-stats">
            <div class="stat">
              <span>⭐</span> ${repo.stargazers_count} Stars
            </div>
            <div class="stat">
              <span>👁</span> ${repo.watchers_count} Watchers
            </div>
            <div class="stat">
              <span>🍴</span> ${repo.forks_count} Forks
            </div>
          </div>
        </div>`
        )
        .join('');
      this.reposContainer.innerHTML = `
        <h3>Latest Repos</h3>
        ${reposHTML}
      `;
    }
  
    // Show Spinner
    showSpinner() {
      this.spinner.style.display = 'block';
    }
  
    // Hide Spinner
    hideSpinner() {
      this.spinner.style.display = 'none';
    }
  }
  
  // Event Listener
  document.querySelector('#search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value.trim();
    if (!username) return alert('Please enter a username.');
  
    const gitHubFinder = new GitHubFinder();
  
    try {
      const user = await gitHubFinder.fetchUserProfile(username);
      gitHubFinder.renderUserProfile(user);
  
      const repos = await gitHubFinder.fetchUserRepos(username);
      gitHubFinder.renderUserRepos(repos);
    } catch (error) {
      alert(error.message);
    }
  });
  