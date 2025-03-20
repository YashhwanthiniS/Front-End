document.addEventListener("DOMContentLoaded", () => {
    // Simulated authentication
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "password") {
                localStorage.setItem("authenticated", "true");
                window.location.href = "semester.html";
            } else {
                alert("Invalid credentials. Please try again.");
            }
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("authenticated");
            window.location.href = "index.html";
        });
    }

    // Ensure protected routes
    if (window.location.pathname.includes("dashboard.html")) {
        if (!localStorage.getItem("authenticated")) {
            window.location.href = "index.html";
        }
    }

    // Pagination Variables
    let currentPage = 1;
    const itemsPerPage = 5;
    const container = document.getElementById("courses-container");
    const pagination = document.getElementById("pagination");

    function displayCourses() {
        const semester = localStorage.getItem("semester");
        const searchQuery = document.getElementById("search-input").value.toLowerCase();
        const filterType = document.getElementById("filter-select").value;
        const sortType = document.getElementById("sort-select").value;

        if (!semester) {
            window.location.href = "semester.html";
            return;
        }

        let filteredCourses = courses.filter(course => course.semester == semester);

        // Search filter
        if (searchQuery) {
            filteredCourses = filteredCourses.filter(course => course.name.toLowerCase().includes(searchQuery));
        }

        // Type filter (core/elective)
        if (filterType !== "all") {
            filteredCourses = filteredCourses.filter(course => course.type === filterType);
        }

        // Sorting
        if (sortType === "az") {
            filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            filteredCourses.sort((a, b) => b.name.localeCompare(a.name));
        }

        renderItems(filteredCourses);
    }

    function renderItems(items) {
        container.innerHTML = "";
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = items.slice(start, end);

        paginatedItems.forEach(course => {
            const div = document.createElement("div");
            div.classList.add("course-card");
            div.innerHTML = `<h3>${course.name}</h3><p>Semester: ${course.semester} | Type: ${course.type.toUpperCase()}</p>`;
            container.appendChild(div);
        });

        renderPagination(items.length);
    }

    function renderPagination(totalItems) {
        pagination.innerHTML = "";
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.addEventListener("click", () => {
                currentPage = i;
                displayCourses();
            });
            pagination.appendChild(btn);
        }
    }

    // Event listeners for search, filter, and sort
    document.getElementById("search-input").addEventListener("input", () => {
        currentPage = 1;
        displayCourses();
    });

    document.getElementById("filter-select").addEventListener("change", () => {
        currentPage = 1;
        displayCourses();
    });

    document.getElementById("sort-select").addEventListener("change", () => {
        currentPage = 1;
        displayCourses();
    });

    displayCourses();

    // Real-time updates (Simulated with setInterval)
    setInterval(() => {
        console.log("Checking for updates...");
    }, 5000);

    // Modal functionality
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");

    if (openModalBtn && modal) {
        openModalBtn.addEventListener("click", () => {
            modal.style.display = "block";
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
});
