const courses = [
    { name: "Mathematics - I", semester: 1, type: "Core" },
            { name: "English for Engineers - I", semester: 1, type: "Core" },
            { name: "Engineering Physics", semester: 1, type: "Core" },
            { name: "Applied Chemistry - I", semester: 1, type: "Core" },
            { name: "Basic Electrical and Electronics Engineering", semester: 1, type: "Core" },
            { name: "Problem Solving Using Python Programming", semester: 1, type: "Core" },
            { name: "Physics and Chemistry Laboratory", semester: 1, type: "Lab" },
            { name: "Python Programming Laboratory", semester: 1, type: "Lab" },
            { name: "Basic Electrical and Electronics Engineering Laboratory", semester: 1, type: "Lab" },
            { name: "French", semester: 1, type: "Elective" },
            { name: "English for Engineers - II", semester: 2, type: "Core" },
            { name: "Discrete Mathematics", semester: 2, type: "Core" },
            { name: "Material Science", semester: 2, type: "Core" },
            { name: "Applied Chemistry - II", semester: 2, type: "Core" },
            { name: "Programming in C", semester: 2, type: "Core" },
            { name: "Engineering Graphics", semester: 2, type: "Core" },
            { name: "Workshop Practice", semester: 2, type: "Lab" },
            { name: "C Programming Laboratory", semester: 2, type: "Lab" },
            { name: "French", semester: 2, type: "Elective" },
            { name: "Probability and Statistics", semester: 3, type: "Core" },
            { name: "Data Structures", semester: 3, type: "Core" },
            { name: "Computer Architecture", semester: 3, type: "Core" },
            { name: "Computer and Information Ethics", semester: 3, type: "Core" },
            { name: "Object Oriented Programming", semester: 3, type: "Core" },
            { name: "Communication Systems", semester: 3, type: "Core" },
            { name: "Data Structures Laboratory", semester: 3, type: "Lab" },
            { name: "Object Oriented Programming Laboratory", semester: 3, type: "Lab" },
            { name: "Environment and Climate Science", semester: 3, type: "Mandatory" },
            { name: "Soft Skills and Aptitude - I", semester: 3, type: "Elective" },
            { name: "Numerical and Regression Analysis", semester: 4, type: "Core" },
            { name: "Operating Systems", semester: 4, type: "Core" },
            { name: "Database Management Systems", semester: 4, type: "Core" },
            { name: "Design and Analysis of Algorithms", semester: 4, type: "Core" },
            { name: "Principles of Management", semester: 4, type: "Core" },
            { name: "Operating Systems Laboratory", semester: 4, type: "Lab" },
            { name: "Database Management Systems Laboratory", semester: 4, type: "Lab" },
            { name: "Soft Skills and Aptitude - II", semester: 4, type: "Elective" },
            { name: "Essence of Indian Traditional Knowledge", semester: 4, type: "Mandatory" },
            { name: "Computer Networks", semester: 5, type: "Core" },
            { name: "Software Engineering", semester: 5, type: "Core" },
            { name: "Theory of Computation", semester: 5, type: "Core" },
            { name: "Embedded System Design", semester: 5, type: "Core" },
            { name: "Computer Networks Laboratory", semester: 5, type: "Lab" },
            { name: "Software Development Laboratory", semester: 5, type: "Lab" },
            { name: "Agile Methodologies", semester: 5, type: "Elective" },
            { name: "Soft Skills and Aptitude - III", semester: 5, type: "Elective" },
            { name: "NPTEL: Software Testing", semester: 5, type: "Elective" },
            { name: "DevOps", semester: 6, type: "Core" },
            { name: "Cloud Security", semester: 6, type: "Core" },
            { name: "Principles of Compiler Design", semester: 6, type: "Core" },
            { name: "Full Stack Development", semester: 6, type: "Core" },
            { name: "Artificial Intelligence", semester: 6, type: "Core" },
            { name: "Compiler Design Laboratory", semester: 6, type: "Lab" },
            { name: "Artificial Intelligence Laboratory", semester: 6, type: "Lab" },
            { name: "Cyber Security", semester: 6, type: "Open Elective" },
            { name: "Machine Learning", semester: 6, type: "Elective" },
            { name: "Green Computing", semester: 6, type: "Elective" },
            { name: "Front End Web Development", semester: 7, type: "Core" },
            { name: "Back End Web Development", semester: 7, type: "Core" },
            { name: "Blockchain Technologies", semester: 7, type: "Core" },
            { name: "Cryptography", semester: 7, type: "Core" },
            { name: "Internet of Things", semester: 7, type: "Core" },
            { name: "Internet of Things Laboratory", semester: 7, type: "Lab" },
            { name: "Cloud Computing", semester: 7, type: "Open Elective" },
            { name: "Human Computer Interaction", semester: 7, type: "Elective" },
            { name: "Cyber Law and Ethics", semester: 7, type: "Elective" },
            { name: "Project", semester: 8, type: "Core" }
];

const coursesPerPage = 5; 
let currentPage = 1;

function displayCourses() {
    const semester = localStorage.getItem("semester");
    const container = document.getElementById("courses-container");
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

    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    // Paginate results
    const startIndex = (currentPage - 1) * coursesPerPage;
    const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

    container.innerHTML = "";

    if (paginatedCourses.length === 0) {
        container.innerHTML = "<p>No courses found.</p>";
        return;
    }

    paginatedCourses.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-card");
        div.innerHTML = `<h3>${course.name}</h3><p>Semester: ${course.semester} | Type: ${course.type.toUpperCase()}</p>`;
        container.appendChild(div);
    });

    displayPaginationControls(totalPages);
}

function displayPaginationControls(totalPages) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    if (totalPages > 1) {
        if (currentPage > 1) {
            paginationContainer.innerHTML += `<button onclick="changePage(${currentPage - 1})">Previous</button>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.innerHTML += `<button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
        }

        if (currentPage < totalPages) {
            paginationContainer.innerHTML += `<button onclick="changePage(${currentPage + 1})">Next</button>`;
        }
    }    
}

function changePage(page) {
    currentPage = page;
    displayCourses();
}

document.addEventListener("DOMContentLoaded", displayCourses);
