const API_URL = 'https://api.github.com/users/jahaa69/repos';

let repos = [];

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    fetchGithubRepos();
    initContactForm();
});

function initNavigation() {
    const navCases = document.querySelectorAll('.nav-case');
    navCases.forEach(navCase => {
        navCase.addEventListener('click', function() {
            const target = this.getAttribute('data-scroll');
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    mobileMenu.classList.toggle('active');

    if (mobileMenu.classList.contains('active')) {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

function fetchGithubRepos() {
    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (Array.isArray(data)) {
                repos = data.filter(repo => repo.name !== 'jahaa69.github.io');
                displayProjects();
                setAvatar(data);
            } else {
                throw new Error('Data is not an array');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            displayNoConnection();
        });
}

function setAvatar(data) {
    if (data.length > 0) {
        const avatar = document.getElementById('avatar');
        avatar.src = data[0].owner.avatar_url;
    }
}

function displayProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';

    const devRepos = repos.filter(repo => repo.topics.includes('dev'));
    const webRepos = repos.filter(repo => repo.topics.includes('web'));
    const infraRepos = repos.filter(repo => repo.topics.includes('infra'));

    if (devRepos.length > 0) {
        projectsContainer.appendChild(createProjectCategory('Development', devRepos, 'cpu'));
    }
    if (webRepos.length > 0) {
        projectsContainer.appendChild(createProjectCategory('Web', webRepos, 'database'));
    }
    if (infraRepos.length > 0) {
        projectsContainer.appendChild(createProjectCategory('Infrastructure', infraRepos, 'wifi'));
    }

    if (repos.length === 0) {
        displayNoConnection();
    }
}

function createProjectCategory(title, categoryRepos, iconType) {
    const section = document.createElement('div');
    section.className = 'project-category';

    const header = document.createElement('div');
    header.className = 'category-header';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'category-icon';
    iconDiv.innerHTML = getIconSvg(iconType);

    const titleElement = document.createElement('h3');
    titleElement.className = 'category-title';
    titleElement.textContent = title;

    header.appendChild(iconDiv);
    header.appendChild(titleElement);

    const grid = document.createElement('div');
    grid.className = 'projects-grid';

    categoryRepos.forEach((repo) => {
        grid.appendChild(createProjectCard(repo));
    });

    section.appendChild(header);
    section.appendChild(grid);

    return section;
}

function createProjectCard(repo) {
    const card = document.createElement('a');
    card.href = repo.html_url;
    card.target = '_blank';
    card.className = 'project-card';

    const imageUrl = `https://raw.githubusercontent.com/jahaa69/${repo.name}/main/image.png`;
    const fallbackSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%2394a3b8'%3E${encodeURIComponent(repo.name)}%3C/text%3E%3C/svg%3E`;

    const imageDiv = document.createElement('div');
    imageDiv.className = 'project-image';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = repo.name;
    img.onerror = function() {
        this.src = fallbackSvg;
    };

    imageDiv.appendChild(img);

    const content = document.createElement('div');
    content.className = 'project-content';

    const title = document.createElement('h4');
    title.className = 'project-title';
    title.textContent = repo.name;

    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = repo.description || 'No description available';

    const topics = document.createElement('div');
    topics.className = 'project-topics';
    repo.topics.forEach((topic) => {
        const topicSpan = document.createElement('span');
        topicSpan.className = 'project-topic';
        topicSpan.textContent = topic;
        topics.appendChild(topicSpan);
    });

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(topics);

    card.appendChild(imageDiv);
    card.appendChild(content);

    return card;
}

function displayNoConnection() {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = `
        <div class="no-connection">
            <a href="https://github.com/jahaa69" target="_blank">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>View projects on GitHub</span>
            </a>
        </div>
    `;
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
}

function getIconSvg(type) {
    const icons = {
        cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <line x1="9" y1="1" x2="9" y2="4"></line>
            <line x1="15" y1="1" x2="15" y2="4"></line>
            <line x1="9" y1="20" x2="9" y2="23"></line>
            <line x1="15" y1="20" x2="15" y2="23"></line>
            <line x1="20" y1="9" x2="23" y2="9"></line>
            <line x1="20" y1="14" x2="23" y2="14"></line>
            <line x1="1" y1="9" x2="4" y2="9"></line>
            <line x1="1" y1="14" x2="4" y2="14"></line>
        </svg>`,
        database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>`,
        wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>`
    };
    return icons[type] || icons.cpu;
}
