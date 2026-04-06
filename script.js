// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const navItems = document.querySelectorAll('.nav-item');

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const studentId = document.getElementById('studentId').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (in real app, this would be server-side)
        if (studentId && password) {
            // Extract last 3 characters of student ID
            const last3Chars = studentId.slice(-3).toUpperCase();
            
            // Update welcome message with last 3 characters
            const welcomeGreeting = document.getElementById('welcomeGreeting');
            const profileName = document.getElementById('profileName');
            
            if (welcomeGreeting) {
                welcomeGreeting.textContent = `Welcome Back, ${last3Chars}`;
            }
            if (profileName) {
                profileName.textContent = last3Chars;
            }
            
            // Update current date
            const currentDate = document.getElementById('currentDate');
            if (currentDate) {
                const today = new Date();
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const dateStr = today.toLocaleDateString('en-US', options);
                currentDate.textContent = dateStr;
            }
            
            // Hide login section and show dashboard
            loginSection.style.display = 'none';
            dashboardSection.style.display = 'block';
            
            // Add smooth transition
            dashboardSection.style.opacity = '0';
            setTimeout(() => {
                dashboardSection.style.transition = 'opacity 0.5s ease-in-out';
                dashboardSection.style.opacity = '1';
            }, 100);
        } else {
            alert('Please enter both Student ID and Password');
        }
    });

    // Handle navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get clean text content (exclude icon)
            const navLink = this.querySelector('.nav-link');
            const icon = navLink.querySelector('.nav-icon');
            let linkText = navLink.textContent.trim();
            
            // Remove icon text if it exists
            if (icon) {
                linkText = linkText.replace(icon.textContent, '').trim();
            }
            
            console.log('Navigated to:', linkText);
            updateMainContent(linkText);
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Add click functionality to cards
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('.card-header h3').textContent;
            handleCardClick(cardTitle);
        });
    });

    // Simulate real-time updates (optional)
    function updateDashboardData() {
        // You could add code here to fetch real data
        // For now, we'll just add some visual feedback
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            stat.style.transition = 'color 0.3s ease';
        });
    }

    // Initialize dashboard updates
    setInterval(updateDashboardData, 30000); // Update every 30 seconds

    // Function to update main content based on navigation
    function updateMainContent(section) {
        const contentWrapper = document.querySelector('.content-wrapper');
        
        // Debug: Check if contentWrapper exists
        if (!contentWrapper) {
            console.error('Content wrapper not found!');
            return;
        }
        
        let newContent = '';
        
        switch(section) {
            case 'Dashboard':
                newContent = `
                    <div class="welcome-section">
                        <h1>Welcome back, Student!</h1>
                        <p>Here's your academic overview for today</p>
                    </div>
                    <div class="cards-grid">
                        <!-- Subjects Overview Card -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3>Subjects Overview</h3>
                                <span class="card-icon">📖</span>
                            </div>
                            <div class="card-content">
                                <div class="subject-list">
                                    <div class="subject-item">
                                        <span class="subject-name">Mathematics</span>
                                        <span class="subject-status">Active</span>
                                    </div>
                                    <div class="subject-item">
                                        <span class="subject-name">Physics</span>
                                        <span class="subject-status">Active</span>
                                    </div>
                                    <div class="subject-item">
                                        <span class="subject-name">Computer Science</span>
                                        <span class="subject-status">Active</span>
                                    </div>
                                    <div class="subject-item">
                                        <span class="subject-name">Chemistry</span>
                                        <span class="subject-status">Completed</span>
                                    </div>
                                </div>
                                <div class="card-stats">
                                    <span class="stat">3 Active</span>
                                    <span class="stat">1 Completed</span>
                                </div>
                            </div>
                        </div>
                        <!-- Tasks Card -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3>Tasks</h3>
                                <span class="card-icon">✅</span>
                            </div>
                            <div class="card-content">
                                <div class="task-list">
                                    <div class="task-item">
                                        <div class="task-info">
                                            <h4>Math Assignment</h4>
                                            <p>Due in 2 days</p>
                                        </div>
                                        <span class="task-priority high">High</span>
                                    </div>
                                    <div class="task-item">
                                        <div class="task-info">
                                            <h4>Physics Lab Report</h4>
                                            <p>Due in 5 days</p>
                                        </div>
                                        <span class="task-priority medium">Medium</span>
                                    </div>
                                    <div class="task-item">
                                        <div class="task-info">
                                            <h4>CS Project</h4>
                                            <p>Due in 1 week</p>
                                        </div>
                                        <span class="task-priority low">Low</span>
                                    </div>
                                </div>
                                <div class="card-stats">
                                    <span class="stat">3 Pending</span>
                                    <span class="stat">2 Completed</span>
                                </div>
                            </div>
                        </div>
                        <!-- Performance Card -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3>Performance</h3>
                                <span class="card-icon">📈</span>
                            </div>
                            <div class="card-content">
                                <div class="performance-stats">
                                    <div class="stat-item">
                                        <div class="stat-value">85%</div>
                                        <div class="stat-label">Overall Grade</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">92%</div>
                                        <div class="stat-label">Attendance</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">78%</div>
                                        <div class="stat-label">Assignment Score</div>
                                    </div>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 85%"></div>
                                </div>
                                <p class="performance-note">Great progress this semester!</p>
                            </div>
                        </div>

                        <!-- Attendance Calendar Card -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3>Attendance Calendar</h3>
                                <span class="card-icon">📅</span>
                            </div>
                            <div class="card-content">
                                <div class="calendar-summary">
                                    <div class="attendance-stat">
                                        <span class="stat-label">Present</span>
                                        <span class="stat-value present" id="presentCount">--</span>
                                    </div>
                                    <div class="attendance-stat">
                                        <span class="stat-label">Half Day</span>
                                        <span class="stat-value halfday" id="halfdayCount">--</span>
                                    </div>
                                    <div class="attendance-stat">
                                        <span class="stat-label">Absent</span>
                                        <span class="stat-value absent" id="absentCount">--</span>
                                    </div>
                                </div>
                                <button class="view-calendar-btn" onclick="showCalendar()">
                                    <i class="fas fa-calendar-alt"></i> View Attendance Calendar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'Tasks':
                newContent = `
                    <div class="welcome-section">
                        <h1>Tasks Management</h1>
                        <p>Manage all your academic tasks and assignments</p>
                    </div>
                    <div class="tasks-detail-container">
                        <div class="task-filters">
                            <button class="filter-btn active" data-filter="all">All Tasks</button>
                            <button class="filter-btn" data-filter="pending">Pending</button>
                            <button class="filter-btn" data-filter="completed">Completed</button>
                        </div>
                        <div class="tasks-list-detail">
                            <div class="task-detail-item">
                                <div class="task-header">
                                    <h3>Mathematics Assignment - Chapter 5</h3>
                                    <span class="task-priority high">High Priority</span>
                                </div>
                                <p class="task-description">Complete exercises 5.1 to 5.10 and submit before deadline</p>
                                <div class="task-meta">
                                    <span>📅 Due: 2 days</span>
                                    <span>📚 Subject: Mathematics</span>
                                    <span>⏱️ Estimated: 3 hours</span>
                                </div>
                                <div class="task-actions">
                                    <button class="task-btn complete">Mark Complete</button>
                                    <button class="task-btn view">View Details</button>
                                </div>
                            </div>
                            <div class="task-detail-item">
                                <div class="task-header">
                                    <h3>Physics Lab Report - Pendulum Experiment</h3>
                                    <span class="task-priority medium">Medium Priority</span>
                                </div>
                                <p class="task-description">Write comprehensive lab report with data analysis and conclusions</p>
                                <div class="task-meta">
                                    <span>📅 Due: 5 days</span>
                                    <span>📚 Subject: Physics</span>
                                    <span>⏱️ Estimated: 4 hours</span>
                                </div>
                                <div class="task-actions">
                                    <button class="task-btn complete">Mark Complete</button>
                                    <button class="task-btn view">View Details</button>
                                </div>
                            </div>
                            <div class="task-detail-item">
                                <div class="task-header">
                                    <h3>Computer Science Project - Web Development</h3>
                                    <span class="task-priority low">Low Priority</span>
                                </div>
                                <p class="task-description">Create a responsive website using HTML, CSS, and JavaScript</p>
                                <div class="task-meta">
                                    <span>📅 Due: 1 week</span>
                                    <span>📚 Subject: Computer Science</span>
                                    <span>⏱️ Estimated: 8 hours</span>
                                </div>
                                <div class="task-actions">
                                    <button class="task-btn complete">Mark Complete</button>
                                    <button class="task-btn view">View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'Academics':
                newContent = `
                    <div class="welcome-section">
                        <h1>Academic Performance</h1>
                        <p>Track your grades and academic progress</p>
                    </div>
                    <div class="academics-container">
                        <div class="grade-summary">
                            <h2>Current Semester Grades</h2>
                            <div class="grade-grid">
                                <div class="grade-item">
                                    <h4>Mathematics</h4>
                                    <div class="grade-circle">A</div>
                                    <p>Score: 92%</p>
                                </div>
                                <div class="grade-item">
                                    <h4>Physics</h4>
                                    <div class="grade-circle">B+</div>
                                    <p>Score: 87%</p>
                                </div>
                                <div class="grade-item">
                                    <h4>Computer Science</h4>
                                    <div class="grade-circle">A+</div>
                                    <p>Score: 95%</p>
                                </div>
                                <div class="grade-item">
                                    <h4>Chemistry</h4>
                                    <div class="grade-circle">B</div>
                                    <p>Score: 82%</p>
                                </div>
                            </div>
                        </div>
                        <div class="attendance-chart">
                            <h2>Attendance Overview</h2>
                            <div class="attendance-stats">
                                <div class="attendance-item">
                                    <span class="subject">Mathematics</span>
                                    <div class="attendance-bar">
                                        <div class="attendance-fill" style="width: 95%"></div>
                                    </div>
                                    <span class="percentage">95%</span>
                                </div>
                                <div class="attendance-item">
                                    <span class="subject">Physics</span>
                                    <div class="attendance-bar">
                                        <div class="attendance-fill" style="width: 88%"></div>
                                    </div>
                                    <span class="percentage">88%</span>
                                </div>
                                <div class="attendance-item">
                                    <span class="subject">Computer Science</span>
                                    <div class="attendance-bar">
                                        <div class="attendance-fill" style="width: 92%"></div>
                                    </div>
                                    <span class="percentage">92%</span>
                                </div>
                                <div class="attendance-item">
                                    <span class="subject">Chemistry</span>
                                    <div class="attendance-bar">
                                        <div class="attendance-fill" style="width: 85%"></div>
                                    </div>
                                    <span class="percentage">85%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'Resources':
                newContent = `
                    <div class="welcome-section">
                        <h1>📚 Learning Resources</h1>
                        <p>Access study materials and educational resources</p>
                    </div>
                    
                    <!-- Study Materials Section -->
                    <div class="category-section">
                        <h2>📖 Study Materials</h2>
                        <div class="resource-grid">
                            <div class="resource-item">
                                <div class="resource-icon">📄</div>
                                <h3>Machine Learning Notes</h3>
                                <p>Comprehensive ML concepts and algorithms</p>
                                <button class="resource-btn download" onclick="downloadResource('Machine Learning Notes PDF')">Download</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">📄</div>
                                <h3>Technical Paper Writing</h3>
                                <p>Guidelines for academic paper writing</p>
                                <button class="resource-btn download" onclick="downloadResource('Technical Paper Writing Notes PDF')">Download</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">📄</div>
                                <h3>Software Project Management</h3>
                                <p>Project management methodologies and practices</p>
                                <button class="resource-btn download" onclick="downloadResource('Software Project Management Notes PDF')">Download</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">📄</div>
                                <h3>Cloud Computing Notes</h3>
                                <p>Cloud platforms and services overview</p>
                                <button class="resource-btn download" onclick="downloadResource('Cloud Computing Notes PDF')">Download</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">📄</div>
                                <h3>Cryptography & Network Security</h3>
                                <p>Encryption and security protocols</p>
                                <button class="resource-btn download" onclick="downloadResource('Cryptography and Network Security Notes PDF')">Download</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">📄</div>
                                <h3>Cyber Security Notes</h3>
                                <p>Cybersecurity threats and defense mechanisms</p>
                                <button class="resource-btn download" onclick="downloadResource('Cyber Security Notes PDF')">Download</button>
                            </div>
                        </div>
                    </div>

                    <!-- Video Lectures Section -->
                    <div class="category-section">
                        <h2>🎥 Video Lectures</h2>
                        <div class="resource-grid">
                            <div class="resource-item">
                                <div class="resource-icon">🎬</div>
                                <h3>Machine Learning Tutorials</h3>
                                <p>Video tutorials on ML algorithms</p>
                                <button class="resource-btn video" onclick="playVideo('Machine Learning Video Lecture')">Watch Video</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">🎬</div>
                                <h3>Cloud Computing Lectures</h3>
                                <p>Cloud computing concepts explained</p>
                                <button class="resource-btn video" onclick="playVideo('Cloud Computing Video Lecture')">Watch Video</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">🎬</div>
                                <h3>Cybersecurity Essentials</h3>
                                <p>Security best practices and tools</p>
                                <button class="resource-btn video" onclick="playVideo('Cybersecurity Video Lecture')">Watch Video</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">🎬</div>
                                <h3>Network Security Fundamentals</h3>
                                <p>Network protection strategies</p>
                                <button class="resource-btn video" onclick="playVideo('Network Security Video Lecture')">Watch Video</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">🎬</div>
                                <h3>Project Management Webinar</h3>
                                <p>Advanced PM techniques</p>
                                <button class="resource-btn video" onclick="playVideo('Project Management Video Lecture')">Watch Video</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">🎬</div>
                                <h3>Physics Lectures</h3>
                                <p>Recorded lectures by Prof. Smith</p>
                                <button class="resource-btn video" onclick="playVideo('Physics Lectures')">Watch Video</button>
                            </div>
                        </div>
                    </div>

                    <!-- Programming Tutorials Section -->
                    <div class="category-section">
                        <h2>💻 Programming Tutorials</h2>
                        <div class="resource-grid">
                            <div class="resource-item">
                                <div class="resource-icon">🐍</div>
                                <h3>Python Programming</h3>
                                <p>Interactive Python coding tutorials</p>
                                <button class="resource-btn code" onclick="playVideo('Programming Tutorials - Python')">Watch Tutorial</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">☕</div>
                                <h3>Java Programming</h3>
                                <p>Complete Java development guide</p>
                                <button class="resource-btn code" onclick="playVideo('Programming Tutorials - Java')">Watch Tutorial</button>
                            </div>
                            <div class="resource-item">
                                <div class="resource-icon">🔤</div>
                                <h3>C Programming</h3>
                                <p>C language fundamentals and advanced concepts</p>
                                <button class="resource-btn code" onclick="playVideo('Programming Tutorials - C')">Watch Tutorial</button>
                            </div>
                        </div>
                    </div>

                    <!-- Useful Links Section -->
                    <div class="category-section">
                        <h2>🔗 Useful Links</h2>
                        <div class="links-grid">
                            <div class="link-item">
                                <h3>📚 Online Library</h3>
                                <p>Access digital textbooks and journals</p>
                                <a href="#" class="link-btn" onclick="visitLibrary(event)">Visit Library →</a>
                            </div>
                            <div class="link-item">
                                <h3>📅 Academic Calendar</h3>
                                <p>View exam schedules and important dates</p>
                                <a href="#" class="link-btn" onclick="showAcademicCalendar(event)">View Calendar →</a>
                            </div>
                            <div class="link-item">
                                <h3>🔬 Research Portal</h3>
                                <p>Submit and access research papers</p>
                                <a href="#" class="link-btn" onclick="visitResearchPortal(event)">Go to Portal →</a>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            default:
                newContent = `
                    <div class="welcome-section">
                        <h1>Page Not Found</h1>
                        <p>The requested section is not available.</p>
                    </div>
                `;
                break;
        }
        
        console.log('Setting content for:', section);
        console.log('Content length:', newContent.length);
        
        contentWrapper.innerHTML = newContent;
        
        // Re-attach event listeners to new elements
        attachNewEventListeners();
    }

    // Function to handle card clicks
    function handleCardClick(cardTitle) {
        showNotification(`Opening ${cardTitle} details...`, 'info');
        
        // Navigate to appropriate section based on card
        switch(cardTitle) {
            case 'Subjects Overview':
                updateMainContent('Academics');
                // Update active nav item
                navItems.forEach(item => item.classList.remove('active'));
                navItems[2].classList.add('active'); // Academics
                break;
            case 'Tasks':
                updateMainContent('Tasks');
                // Update active nav item
                navItems.forEach(item => item.classList.remove('active'));
                navItems[1].classList.add('active'); // Tasks
                break;
            case 'Performance':
                updateMainContent('Academics');
                // Update active nav item
                navItems.forEach(item => item.classList.remove('active'));
                navItems[2].classList.add('active'); // Academics
                break;
        }
    }

    // Function to attach event listeners to dynamically created elements
    function attachNewEventListeners() {
        // Task filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                showNotification(`Filtering tasks: ${filter}`, 'info');
                filterTasks(filter);
            });
        });

        // Task action buttons
        const taskBtns = document.querySelectorAll('.task-btn');
        taskBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const taskItem = this.closest('.task-detail-item');
                const taskTitle = taskItem.querySelector('h3').textContent;
                
                if (this.classList.contains('complete')) {
                    markTaskComplete(taskItem, taskTitle);
                } else if (this.classList.contains('view')) {
                    viewTaskDetails(taskItem, taskTitle);
                }
            });
        });

        // Resource buttons
        const resourceBtns = document.querySelectorAll('.resource-btn');
        resourceBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const resourceTitle = this.closest('.resource-item').querySelector('h3').textContent;
                showNotification(`Opening ${resourceTitle}...`, 'info');
            });
        });

        // Link buttons
        const linkBtns = document.querySelectorAll('.link-btn');
        linkBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const linkTitle = this.closest('.link-item').querySelector('h3').textContent;
                showNotification(`Navigating to ${linkTitle}...`, 'info');
            });
        });
    }

    // Function to filter tasks
    function filterTasks(filter) {
        const allTasks = document.querySelectorAll('.task-detail-item');
        
        allTasks.forEach(task => {
            const priority = task.querySelector('.task-priority').textContent.toLowerCase();
            let shouldShow = true;
            
            if (filter === 'pending') {
                // Show tasks that are not completed
                shouldShow = !task.classList.contains('completed');
            } else if (filter === 'completed') {
                // Show only completed tasks
                shouldShow = task.classList.contains('completed');
            }
            // 'all' shows everything
            
            if (shouldShow) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }

    // Function to mark task as complete
    function markTaskComplete(taskItem, taskTitle) {
        if (taskItem.classList.contains('completed')) {
            showNotification('Task is already completed!', 'info');
            return;
        }
        
        // Add completed class and visual feedback
        taskItem.classList.add('completed');
        taskItem.style.opacity = '0.7';
        
        // Update the priority badge
        const priorityBadge = taskItem.querySelector('.task-priority');
        priorityBadge.textContent = 'Completed';
        priorityBadge.style.background = '#48bb78';
        priorityBadge.style.color = 'white';
        
        // Disable the complete button
        const completeBtn = taskItem.querySelector('.task-btn.complete');
        completeBtn.textContent = 'Completed';
        completeBtn.style.background = '#a0aec0';
        completeBtn.disabled = true;
        
        showNotification(`Task "${taskTitle}" marked as complete!`, 'success');
    }

    // Function to view task details
    function viewTaskDetails(taskItem, taskTitle) {
        console.log('viewTaskDetails called with:', { taskItem, taskTitle });
        
        if (!taskItem) {
            console.error('Task item not found');
            showNotification('Error: Task item not found', 'error');
            return;
        }
        
        try {
            // Get task description
            const descriptionElement = taskItem.querySelector('.task-description');
            const description = descriptionElement ? descriptionElement.textContent : 'No description available';
            
            // Get meta information
            const metaElements = taskItem.querySelectorAll('.task-meta span');
            const metaInfo = Array.from(metaElements).map(span => span.textContent).join(' | ');
            
            console.log('Task details extracted:', { description, metaInfo });
            
            // Show notification with task details
            const detailsMessage = `${taskTitle}\n${description}\n${metaInfo}`;
            showNotification(`Viewing: ${taskTitle}`, 'info');
            
            // Create a simple modal for better detail viewing
            showTaskModal(taskTitle, description, metaInfo);
            
            // Also log to console for debugging
            console.log('Task Details:', {
                title: taskTitle,
                description: description,
                meta: metaInfo
            });
        } catch (error) {
            console.error('Error in viewTaskDetails:', error);
            showNotification('Error loading task details', 'error');
        }
    }

    // Function to show task details in a modal
    function showTaskModal(title, description, metaInfo) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        `;
        
        modalContent.innerHTML = `
            <h2 style="color: #1a365d; margin-bottom: 20px;">${title}</h2>
            <div style="margin-bottom: 20px;">
                <h3 style="color: #4a5568; margin-bottom: 10px;">Description:</h3>
                <p style="color: #718096; line-height: 1.6;">${description}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <h3 style="color: #4a5568; margin-bottom: 10px;">Details:</h3>
                <p style="color: #718096;">${metaInfo}</p>
            </div>
            <button id="closeModal" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Add close functionality
        document.getElementById('closeModal').addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });
        
        // Close on overlay click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + L to focus on login
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            const studentIdInput = document.getElementById('studentId');
            if (studentIdInput && loginSection.style.display !== 'none') {
                studentIdInput.focus();
            }
        }
        
        // Escape to logout (if on dashboard)
        if (e.key === 'Escape' && dashboardSection.style.display !== 'none') {
            if (confirm('Are you sure you want to logout?')) {
                loginSection.style.display = 'flex';
                dashboardSection.style.display = 'none';
                document.getElementById('loginForm').reset();
            }
        }
    });

    // Add form validation feedback
    const studentIdInput = document.getElementById('studentId');
    const passwordInput = document.getElementById('password');
    
    if (studentIdInput) {
        studentIdInput.addEventListener('input', function() {
            if (this.value.length < 3) {
                this.style.borderColor = '#fc8181';
            } else {
                this.style.borderColor = '#48bb78';
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.value.length < 6) {
                this.style.borderColor = '#fc8181';
            } else {
                this.style.borderColor = '#48bb78';
            }
        });
    }

    // Initial load: Display dashboard content
    updateMainContent('Dashboard');

    // Prepare the calendar summary counts (does not open the modal)
    if (typeof generateCalendar === 'function') {
        generateCalendar();
    }
});

// Handle Login for index.html
function handleLogin(event) {
    event.preventDefault();
    
    const studentID = document.getElementById('studentID').value;
    const password = document.getElementById('password').value;
    
    // Validate inputs
    if (!studentID || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Store student info
    localStorage.setItem('studentID', studentID);
    localStorage.setItem('studentName', 'Student ' + studentID.substring(0, 3).toUpperCase());
    
    // Hide login section and show dashboard
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    
    // Update welcome message
    const studentName = localStorage.getItem('studentName');
    document.getElementById('studentName').textContent = studentName;
    
    // Clear form
    document.getElementById('loginForm').reset();
}

// Handle Logout for index.html
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear stored data
        localStorage.removeItem('studentID');
        localStorage.removeItem('studentName');
        
        // Show login section and hide dashboard
        document.getElementById('loginSection').style.display = 'flex';
        document.getElementById('dashboard').classList.remove('active');
        
        // Reset form
        document.getElementById('loginForm').reset();
    }
}

// Enhanced showSection function with task filtering
function showSection(section) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.style.display = 'none');
    
    // Show selected section
    const selectedSection = document.getElementById(section + 'Section');
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    
    // Update sidebar active state
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    
    // Handle different sections
    if (section === 'tasks') {
        showOnlyPendingTasks();
    } else if (section === 'academics') {
        showAcademicsContent();
    } else if (section === 'resources') {
        showResourcesContent();
    }
}

// Task data
const tasksData = {
    pending: [
        {
            title: 'Mathematics Assignment - Chapter 5',
            description: 'Complete exercises 5.1 to 5.10 on calculus and integration. Show all work step by step.',
            dueDate: '2 days',
            subject: 'Mathematics',
            estimatedTime: '3 hours',
            priority: 'High Priority',
            status: 'pending'
        },
        {
            title: 'Physics Lab Report - Experiment 3',
            description: 'Write detailed lab report for optics experiment. Include hypothesis, procedure, observations, and conclusion.',
            dueDate: '4 days',
            subject: 'Physics',
            estimatedTime: '5 hours',
            priority: 'Medium Priority',
            status: 'pending'
        },
        {
            title: 'History Essay - World War II',
            description: 'Research and write 1500-word essay on causes and consequences of World War II with proper citations.',
            dueDate: '1 week',
            subject: 'History',
            estimatedTime: '10 hours',
            priority: 'High Priority',
            status: 'pending'
        },
        {
            title: 'Chemistry Homework - Stoichiometry',
            description: 'Solve problems 7.1 to 7.15 from Chapter 7. Balance equations and calculate molar masses.',
            dueDate: 'Tomorrow',
            subject: 'Chemistry',
            estimatedTime: '2 hours',
            priority: 'Low Priority',
            status: 'pending'
        }
    ],
    completed: [
        {
            title: 'English Literature Reading - Macbeth',
            description: 'Read Act 3 of Macbeth and analyze character development. Completed with full understanding.',
            completedDate: '2024-03-15',
            subject: 'English',
            estimatedTime: '1.5 hours',
            priority: 'Medium Priority',
            status: 'completed'
        },
        {
            title: 'Computer Science Project - Database Design',
            description: 'Designed and implemented student management database with proper normalization and relationships.',
            completedDate: '2024-03-14',
            subject: 'Computer Science',
            estimatedTime: '8 hours',
            priority: 'High Priority',
            status: 'completed'
        },
        {
            title: 'Biology Lab Report - Cell Division',
            description: 'Completed microscope observation and report on mitosis phases with detailed diagrams.',
            completedDate: '2024-03-13',
            subject: 'Biology',
            estimatedTime: '4 hours',
            priority: 'Medium Priority',
            status: 'completed'
        }
    ]
};

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    switch(type) {
        case 'success':
            notification.style.background = '#48bb78';
            break;
        case 'error':
            notification.style.background = '#f56565';
            break;
        case 'warning':
            notification.style.background = '#ed8936';
            break;
        default:
            notification.style.background = '#4299e1';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Show only pending tasks
function showOnlyPendingTasks() {
    const tasksSection = document.getElementById('tasksSection');
    if (!tasksSection) return;
    
    const cardContent = tasksSection.querySelector('.card-content');
    if (!cardContent) return;
    
    let tasksHTML = '';
    tasksData.pending.forEach(task => {
        tasksHTML += `
            <div class="task-detail-item">
                <h3>${task.title}</h3>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                    <span><i class="fas fa-calendar-alt"></i> Due: ${task.dueDate}</span>
                    <span><i class="fas fa-book"></i> Subject: ${task.subject}</span>
                    <span><i class="fas fa-clock"></i> Estimated: ${task.estimatedTime}</span>
                </div>
                <div class="task-actions">
                    <span class="priority ${task.priority.toLowerCase().replace(' ', '-')}">${task.priority}</span>
                    <button class="task-btn complete" onclick="markTaskComplete('${task.title}')">Mark Complete</button>
                    <button class="task-btn view" onclick="viewTaskDetails('${task.title}')">View Details</button>
                </div>
            </div>
        `;
    });
    
    cardContent.innerHTML = `
        <div class="tasks-header">
            <h3>Pending Tasks</h3>
            <div class="filter-buttons">
                <button class="filter-btn" onclick="showAllTasks()">All Tasks</button>
                <button class="filter-btn active" onclick="showOnlyPendingTasks()">Pending</button>
                <button class="filter-btn" onclick="showOnlyCompletedTasks()">Completed</button>
            </div>
        </div>
        <div class="tasks-list">
            ${tasksHTML || '<p style="color: #666; text-align: center; padding: 20px;">No pending tasks</p>'}
        </div>
    `;
}

// Show all tasks
function showAllTasks() {
    const tasksSection = document.getElementById('tasksSection');
    if (!tasksSection) return;
    
    const cardContent = tasksSection.querySelector('.card-content');
    if (!cardContent) return;
    
    let allTasksHTML = '';
    
    // Add pending tasks
    tasksData.pending.forEach(task => {
        allTasksHTML += `
            <div class="task-detail-item">
                <h3>${task.title}</h3>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                    <span><i class="fas fa-calendar-alt"></i> Due: ${task.dueDate}</span>
                    <span><i class="fas fa-book"></i> Subject: ${task.subject}</span>
                    <span><i class="fas fa-clock"></i> Estimated: ${task.estimatedTime}</span>
                </div>
                <div class="task-actions">
                    <span class="priority ${task.priority.toLowerCase().replace(' ', '-')}">${task.priority}</span>
                    <button class="task-btn complete" onclick="markTaskComplete('${task.title}')">Mark Complete</button>
                    <button class="task-btn view" onclick="viewTaskDetails('${task.title}')">View Details</button>
                </div>
            </div>
        `;
    });
    
    // Add completed tasks
    tasksData.completed.forEach(task => {
        allTasksHTML += `
            <div class="task-detail-item completed">
                <h3>${task.title}</h3>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                    <span><i class="fas fa-check-circle"></i> Completed: ${task.completedDate}</span>
                    <span><i class="fas fa-book"></i> Subject: ${task.subject}</span>
                    <span><i class="fas fa-clock"></i> Time spent: ${task.estimatedTime}</span>
                </div>
                <div class="task-actions">
                    <span class="priority ${task.priority.toLowerCase().replace(' ', '-')}">${task.priority}</span>
                    <button class="task-btn view" onclick="viewTaskDetails('${task.title}')">View Details</button>
                </div>
            </div>
        `;
    });
    
    cardContent.innerHTML = `
        <div class="tasks-header">
            <h3>All Tasks</h3>
            <div class="filter-buttons">
                <button class="filter-btn active" onclick="showAllTasks()">All Tasks</button>
                <button class="filter-btn" onclick="showOnlyPendingTasks()">Pending</button>
                <button class="filter-btn" onclick="showOnlyCompletedTasks()">Completed</button>
            </div>
        </div>
        <div class="tasks-list">
            ${allTasksHTML || '<p style="color: #666; text-align: center; padding: 20px;">No tasks found</p>'}
        </div>
    `;
}

// Show only completed tasks
function showOnlyCompletedTasks() {
    const tasksSection = document.getElementById('tasksSection');
    if (!tasksSection) return;
    
    const cardContent = tasksSection.querySelector('.card-content');
    if (!cardContent) return;
    
    let completedTasksHTML = '';
    tasksData.completed.forEach(task => {
        completedTasksHTML += `
            <div class="task-detail-item completed">
                <h3>${task.title}</h3>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                    <span><i class="fas fa-check-circle"></i> Completed: ${task.completedDate}</span>
                    <span><i class="fas fa-book"></i> Subject: ${task.subject}</span>
                    <span><i class="fas fa-clock"></i> Time spent: ${task.estimatedTime}</span>
                </div>
                <div class="task-actions">
                    <span class="priority ${task.priority.toLowerCase().replace(' ', '-')}">${task.priority}</span>
                    <button class="task-btn view" onclick="viewTaskDetails('${task.title}')">View Details</button>
                </div>
            </div>
        `;
    });
    
    cardContent.innerHTML = `
        <div class="tasks-header">
            <h3>Completed Tasks</h3>
            <div class="filter-buttons">
                <button class="filter-btn" onclick="showAllTasks()">All Tasks</button>
                <button class="filter-btn" onclick="showOnlyPendingTasks()">Pending</button>
                <button class="filter-btn active" onclick="showOnlyCompletedTasks()">Completed</button>
            </div>
        </div>
        <div class="tasks-list">
            ${completedTasksHTML || '<p style="color: #666; text-align: center; padding: 20px;">No completed tasks</p>'}
        </div>
    `;
}

// View task details
function viewTaskDetails(taskName) {
    // Find task in pending or completed
    let task = null;
    let taskType = null;
    
    for (const pendingTask of tasksData.pending) {
        if (pendingTask.title === taskName) {
            task = pendingTask;
            taskType = 'pending';
            break;
        }
    }
    
    if (!task) {
        for (const completedTask of tasksData.completed) {
            if (completedTask.title === taskName) {
                task = completedTask;
                taskType = 'completed';
                break;
            }
        }
    }
    
    if (!task) {
        task = {
            title: taskName,
            description: 'Complete Assignment 1 - Data Structures',
            dueDate: '2024-03-20',
            priority: 'High',
            estimatedTime: '2 hours',
            subject: 'Data Structures',
            status: taskType || 'pending'
        };
    }
    
    const modalHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
            <div style="background: white; padding: 30px; border-radius: 12px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <h2 style="color: #2d3748; margin-bottom: 20px; border-bottom: 2px solid #4299e1; padding-bottom: 10px;">${task.title}</h2>
                <div style="margin-bottom: 20px;">
                    <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">${task.description}</p>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px;">
                    <div style="background: #f7fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #4299e1;">
                        <strong style="color: #2d3748; display: block; margin-bottom: 5px;">${taskType === 'completed' ? 'Completed Date' : 'Due Date'}</strong>
                        <span style="color: #4a5568;">${taskType === 'completed' ? task.completedDate : task.dueDate}</span>
                    </div>
                    <div style="background: #f7fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #48bb78;">
                        <strong style="color: #2d3748; display: block; margin-bottom: 5px;">Subject</strong>
                        <span style="color: #4a5568;">${task.subject}</span>
                    </div>
                    <div style="background: #f7fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #ed8936;">
                        <strong style="color: #2d3748; display: block; margin-bottom: 5px;">Priority</strong>
                        <span style="color: #4a5568;">${task.priority}</span>
                    </div>
                    <div style="background: #f7fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #9f7aea;">
                        <strong style="color: #2d3748; display: block; margin-bottom: 5px;">Estimated Time</strong>
                        <span style="color: #4a5568;">${task.estimatedTime}</span>
                    </div>
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 10px;">
                    <button onclick="this.closest('div[style*=fixed]').remove()" style="background: #e2e8f0; color: #4a5568; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;">Close</button>
                    ${taskType === 'pending' ? `<button onclick="markTaskComplete('${task.title}'); this.closest('div[style*=fixed]').remove();" style="background: #48bb78; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;">Mark Complete</button>` : ''}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close task modal
function closeTaskModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Mark task as complete
function markTaskComplete(taskName) {
    // Find and move task from pending to completed
    const taskIndex = tasksData.pending.findIndex(task => task.title === taskName);
    if (taskIndex !== -1) {
        const task = tasksData.pending.splice(taskIndex, 1)[0];
        task.status = 'completed';
        task.completedDate = new Date().toISOString().split('T')[0];
        tasksData.completed.unshift(task);
        
        showNotification(`Task "${taskName}" marked as complete!`, 'success');
        showOnlyPendingTasks(); // Refresh the current view
    } else {
        showNotification('Task not found or already completed!', 'info');
    }
}

// Show academics content
function showAcademicsContent() {
    const academicsSection = document.getElementById('academicsSection');
    if (!academicsSection) return;
    
    const cardContent = academicsSection.querySelector('.card-content');
    if (cardContent) {
        cardContent.innerHTML = `
            <div class="academics-grid">
                <div class="academics-item">
                    <h4>📚 Current Semester</h4>
                    <p>4th Semester - Computer Science Engineering</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 65%;"></div>
                    </div>
                </div>
                <div class="academics-item">
                    <h4>📈 Academic Performance</h4>
                    <p>GPA: 3.8/4.0 | Attendance: 94%</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 94%;"></div>
                    </div>
                </div>
                <div class="academics-item">
                    <h4>🏆 Achievements</h4>
                    <p>Dean's List - Fall 2023</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 88%;"></div>
                    </div>
                </div>
                <div class="academics-item">
                    <h4>📅 Upcoming Events</h4>
                    <p>Midterm Exams: March 25-30</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 45%;"></div>
                    </div>
                </div>
            </div>
            
            <!-- Attendance Calendar Section -->
            <div class="calendar-section">
                <h3>📅 Attendance Calendar</h3>
                <div class="calendar-summary">
                    <div class="attendance-stat">
                        <span class="stat-label">Present</span>
                        <span class="stat-value present">85%</span>
                    </div>
                    <div class="attendance-stat">
                        <span class="stat-label">Absent</span>
                        <span class="stat-value absent">10%</span>
                    </div>
                    <div class="attendance-stat">
                        <span class="stat-label">Half Day</span>
                        <span class="stat-value halfday">5%</span>
                    </div>
                </div>
                <button class="view-calendar-btn" onclick="showCalendar()">
                    <i class="fas fa-calendar-alt"></i> View Calendar
                </button>
            </div>
        `;
    }
}

// Show resources content
function showResourcesContent() {
    const resourcesSection = document.getElementById('resourcesSection');
    if (!resourcesSection) return;
    
    const cardContent = resourcesSection.querySelector('.card-content');
    if (cardContent) {
        cardContent.innerHTML = `
            <div class="resources-grid">
                <div class="resource-category">
                    <h4>📚 Study Materials</h4>
                    <div class="resource-list">
                        <div class="resource-item">
                            <span>Data Structures & Algorithms</span>
                            <button class="resource-btn" onclick="downloadResource('DSA Notes')">Download</button>
                        </div>
                        <div class="resource-item">
                            <span>Database Management Systems</span>
                            <button class="resource-btn" onclick="downloadResource('DBMS Notes')">Download</button>
                        </div>
                        <div class="resource-item">
                            <span>Web Development Guide</span>
                            <button class="resource-btn" onclick="downloadResource('Web Dev Notes')">Download</button>
                        </div>
                        <div class="resource-item">
                            <span>Operating Systems Concepts</span>
                            <button class="resource-btn" onclick="downloadResource('OS Notes')">Download</button>
                        </div>
                    </div>
                </div>
                <div class="resource-category">
                    <h4>🔗 Online Resources</h4>
                    <div class="resource-list">
                        <div class="resource-item">
                            <span>Digital Library</span>
                            <button class="resource-btn" onclick="openResource('Library')">Access</button>
                        </div>
                        <div class="resource-item">
                            <span>Video Lectures</span>
                            <button class="resource-btn" onclick="openResource('Lectures')">Watch</button>
                        </div>
                        <div class="resource-item">
                            <span>Practice Problems</span>
                            <button class="resource-btn" onclick="openResource('Practice')">Solve</button>
                        </div>
                        <div class="resource-item">
                            <span>Research Papers</span>
                            <button class="resource-btn" onclick="openResource('Papers')">Read</button>
                        </div>
                    </div>
                </div>
                <div class="resource-category">
                    <h4>🛠️ Tools & Software</h4>
                    <div class="resource-list">
                        <div class="resource-item">
                            <span>Code Editor (VS Code)</span>
                            <button class="resource-btn" onclick="openResource('VSCode')">Launch</button>
                        </div>
                        <div class="resource-item">
                            <span>Database Tool (MySQL)</span>
                            <button class="resource-btn" onclick="openResource('MySQL')">Open</button>
                        </div>
                        <div class="resource-item">
                            <span>Git Repository</span>
                            <button class="resource-btn" onclick="openResource('Git')">Clone</button>
                        </div>
                        <div class="resource-item">
                            <span>Cloud Platform</span>
                            <button class="resource-btn" onclick="openResource('Cloud')">Access</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Download resource
function downloadResource(resourceName) {
    // Map of resources to their file paths
    const downloadMap = {
        'Mathematics Notes': 'Discrete-Mathematical-Structures.pdf',
        'Machine Learning Notes PDF': 'Machine Learning.pdf',
        'Technical Paper Writing Notes PDF': 'Technical paper writing.pdf',
        'Software Project Management Notes PDF': 'Software Project Management.pdf',
        'Cloud Computing Notes PDF': 'cloudcomputing.pdf',
        'Cryptography and Network Security Notes PDF': 'Cryptography & Network Security.pdf',
        'Cyber Security Notes PDF': 'Cyber Security.pdf'
    };

    const filePath = downloadMap[resourceName];
    
    if (filePath) {
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(`${resourceName} download started!`, 'success');
    } else {
        showNotification(`Downloading ${resourceName}...`, 'info');
        setTimeout(() => {
            showNotification(`${resourceName} downloaded successfully!`, 'success');
        }, 1500);
    }
}

// Open resource
function openResource(resourceName) {
    showNotification(`Opening ${resourceName}...`, 'info');
    setTimeout(() => {
        showNotification(`${resourceName} is now accessible!`, 'success');
    }, 1000);
}

// Show programming tutorial selection
function showTutorialChoices() {
    console.log('Opening tutorial selection modal');
    const modal = document.getElementById('tutorialModal');
    modal.style.zIndex = '10001';
    modal.style.display = 'block';
}

// Close tutorial selection modal
function closeTutorialModal() {
    const modal = document.getElementById('tutorialModal');
    modal.style.display = 'none';
}

// Play video
function playVideo(videoName) {
    console.log('playVideo called with:', videoName);
    
    // Close the tutorial selection modal (if open)
    closeTutorialModal();

    const modal = document.getElementById('videoModal');
    const videoTitle = document.getElementById('videoTitle');
    const videoPlayer = document.getElementById('videoPlayer');

    console.log('Modal elements found:', { modal, videoTitle, videoPlayer });

    videoTitle.textContent = videoName;

    // Sample video URLs - including YouTube and tutorial videos
    const videoSources = {
        'Physics Lectures': 'https://youtu.be/b1t41Q3xRM8?si=ma2hM1Y-CzVng_JH',
        'Programming Tutorials': 'https://www.w3schools.com/html/movie.mp4',
        'Programming Tutorials - C': 'https://www.geeksforgeeks.org/c/c-programming-language/',
        'Programming Tutorials - Java': 'https://www.geeksforgeeks.org/java/java/',
        'Programming Tutorials - Python': 'https://www.geeksforgeeks.org/python/python-programming-language-tutorial/',
        'Machine Learning Video Lecture': 'https://youtu.be/ZqjBPYX_2bk?si=W-snDR_eNtdAI-PO',
        'Cloud Computing Video Lecture': 'https://www.youtube.com/live/q3m1AB9ECXo?si=CDT4YWhE-mnp2AJ7',
        'Cybersecurity Video Lecture': 'https://youtu.be/TYG005runIk?si=jRl1XKqeiqckanES',
        'Network Security Video Lecture': 'https://youtu.be/inWWhr5tnEA?si=rJmZ3u0BGrskKCf_',
        'Project Management Video Lecture': 'https://www.w3schools.com/html/mov_bbb.mp4'
    };

    const videoUrl = videoSources[videoName] || 'https://www.w3schools.com/html/mov_bbb.mp4';
    console.log('Video URL:', videoUrl);

    // Decide how to open the resource
    const isVideoFile = videoUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i);
    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

    if (isYouTube || !isVideoFile) {
        console.log('Opening external URL');
        window.open(videoUrl, '_blank');
        showNotification(`Opening ${videoName}...`, 'info');
        modal.style.display = 'none';
    } else {
        console.log('Playing regular video');
        videoPlayer.src = videoUrl;
        videoPlayer.load();
        modal.style.display = 'block';
        showNotification(`Loading ${videoName}...`, 'info');
    }
}

// Close video modal
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    videoPlayer.pause();
    videoPlayer.src = '';
    modal.style.display = 'none';
}

// Open PDF
function openPDF(pdfName) {
    const modal = document.getElementById('pdfModal');
    const pdfTitle = document.getElementById('pdfTitle');
    const pdfViewer = document.getElementById('pdfViewer');
    
    pdfTitle.textContent = pdfName;
    
    // PDF sources (local files in the project)
    const pdfSources = {
        'Computer Networks': 'Computer-Networks-20APC0516-min.pdf'
    };
    
    pdfViewer.src = pdfSources[pdfName] || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    
    modal.style.display = 'block';
    showNotification(`Loading ${pdfName}...`, 'info');
}

// Close PDF modal
function closePDFModal() {
    const modal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    
    pdfViewer.src = '';
    modal.style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const videoModal = document.getElementById('videoModal');
    const pdfModal = document.getElementById('pdfModal');
    const tutorialModal = document.getElementById('tutorialModal');
    const calendarModal = document.getElementById('calendarModal');
    const academicCalendarModal = document.getElementById('academicCalendarModal');
    
    if (event.target === videoModal) {
        closeVideoModal();
    }
    if (event.target === pdfModal) {
        closePDFModal();
    }
    if (event.target === tutorialModal) {
        closeTutorialModal();
    }
    if (event.target === calendarModal) {
        closeCalendarModal();
    }
    if (event.target === academicCalendarModal) {
        closeAcademicCalendarModal();
    }
}

// Calendar functionality
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Sample attendance data
const attendanceData = {
    '2024-03-01': 'present',
    '2024-03-02': 'present',
    '2024-03-03': 'halfday',
    '2024-03-04': 'present',
    '2024-03-05': 'present',
    '2024-03-06': 'absent',
    '2024-03-07': 'present',
    '2024-03-08': 'present',
    '2024-03-09': 'present',
    '2024-03-10': 'halfday',
    '2024-03-11': 'present',
    '2024-03-12': 'present',
    '2024-03-13': 'present',
    '2024-03-14': 'absent',
    '2024-03-15': 'present',
    '2024-03-16': 'present',
    '2024-03-17': 'present',
    '2024-03-18': 'halfday',
    '2024-03-19': 'present',
    '2024-03-20': 'present',
    '2024-03-21': 'present',
    '2024-03-22': 'absent',
    '2024-03-23': 'present',
    '2024-03-24': 'present',
    '2024-03-25': 'halfday',
    '2024-03-26': 'present',
    '2024-03-27': 'present',
    '2024-03-28': 'present',
    '2024-03-29': 'present',
    '2024-03-30': 'absent',
    '2024-03-31': 'present'
};

function showCalendar() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'block';
    generateCalendar();
    showNotification('Loading attendance calendar...', 'info');
}

function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'none';
}

// Show Academic Calendar
function showAcademicCalendar(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById('academicCalendarModal');
    const calendarImage = document.getElementById('academicCalendarImage');
    calendarImage.src = 'tt.jpeg';
    modal.style.display = 'block';
    showNotification('Loading Academic Calendar...', 'info');
}

// Close Academic Calendar Modal
function closeAcademicCalendarModal() {
    const modal = document.getElementById('academicCalendarModal');
    modal.style.display = 'none';
}

// Visit Library
function visitLibrary(event) {
    event.preventDefault();
    window.open('https://openlibrary.org', '_blank');
}

// Visit Research Portal
function visitResearchPortal(event) {
    event.preventDefault();
    window.open('https://www.researchgate.net', '_blank');
}

function getAttendanceStatus(dateStr) {
    if (attendanceData[dateStr]) return attendanceData[dateStr];

    // Generate a deterministic placeholder status for days without explicit data.
    // This ensures the calendar always shows a mix of attendance statuses.
    const day = Number(dateStr.split('-')[2]);
    const mod = day % 10;

    let status = 'present';
    if (mod === 0) {
        status = 'absent';
    } else if (mod <= 2) {
        status = 'halfday';
    }

    attendanceData[dateStr] = status;
    return status;
}

function generateCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    
    const monthYear = document.getElementById('currentMonth');
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Counters for summary
    let presentCount = 0;
    let halfdayCount = 0;
    let absentCount = 0;
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const attendance = getAttendanceStatus(dateStr);
        
        if (attendance) {
            dayElement.classList.add(attendance);
        }

        // Update summary counts
        if (attendance === 'present') presentCount += 1;
        if (attendance === 'halfday') halfdayCount += 1;
        if (attendance === 'absent') absentCount += 1;
        
        // Highlight today
        const today = new Date();
        if (currentYear === today.getFullYear() && 
            currentMonth === today.getMonth() && 
            day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        dayElement.textContent = day;
        dayElement.title = `${dateStr}: ${attendance.charAt(0).toUpperCase() + attendance.slice(1)}`;
        
        calendarGrid.appendChild(dayElement);
    }

    // Update summary values in dashboard (if present)
    const presentEl = document.getElementById('presentCount');
    const halfdayEl = document.getElementById('halfdayCount');
    const absentEl = document.getElementById('absentCount');

    if (presentEl) presentEl.textContent = presentCount;
    if (halfdayEl) halfdayEl.textContent = halfdayCount;
    if (absentEl) absentEl.textContent = absentCount;
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
}