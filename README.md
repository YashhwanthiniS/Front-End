This project is a Semester Course Dashboard that allows students to log in, select a semester, and view their courses. It includes features such as:

Authentication (login/logout)
Semester Selection
Course Filtering (Core, Elective, Lab)
Search and Sorting
Pagination for course navigation
Responsive UI for desktop, laptop, tablet, and mobile
Logout Confirmation Modal
Real-time updates and notifications
File Structure & Comments
1. index.html (Login Page)
Implements a simple login form where users enter their credentials.
Authentication is simulated; it checks for a fixed username and password (admin/password).
LocalStorage is used to track login status.
If login is successful, the user is redirected to semester.html.
2. semester.html (Semester Selection Page)
Allows users to select their semester from a dropdown.
Stores the selected semester in localStorage to persist user preference.
If a user is not authenticated, they are redirected to the login page (index.html).
A toast notification appears after a successful login.
3. dashboard.html (Course Dashboard)
Displays courses based on the selected semester.
Features:
Search Functionality: Users can search for specific courses.
Filtering Options: Users can filter courses by Core, Elective, or Lab.
Sorting: Courses can be sorted A-Z or Z-A.
Pagination: Only a limited number of courses are displayed per page, with Next/Previous buttons.
Logout Button: Opens a modal confirmation before logging out.
4. courses.js (Course Data & Filtering)
Contains course data in an array, categorized by semester and type.
Functions to:
Filter courses based on semester, type, and search query.
Sort courses alphabetically.
Paginate results to improve UI performance.
5. script.js (Main JavaScript File)
Handles:
Authentication logic (redirecting unauthorized users).
Real-time updates (simulated using setInterval).
Pagination logic for course display.
Event Listeners for filtering, searching, and sorting.
Modal popup control for logging out.
6. style.css (Styling & Responsiveness)
Implements a modern, clean UI with smooth animations.
Ensures mobile-friendliness:
On small screens (max-width: 768px), controls stack vertically.
Course cards resize dynamically (flex: 1 1 100% on mobile).
Ensures buttons, inputs, and text remain readable on all devices.
Key Features & Improvements
✅ Authentication: Users must log in before accessing the dashboard.
✅ LocalStorage Integration: Keeps track of login state and selected semester.
✅ Course Filtering & Sorting: Provides a dynamic, real-time search and filter experience.
✅ Pagination: Ensures smooth navigation when viewing multiple courses.
✅ Mobile-Friendly UI: Works well on desktops, tablets, and phones.
✅ Logout Confirmation Modal: Prevents accidental logouts.

🔧 Possible Improvements:

Implement real authentication (e.g., Firebase, JWT-based login) instead of a fixed password.
Add a database (e.g., MongoDB, MySQL) for storing courses dynamically instead of hardcoded data.
Improve UI/UX by using Material UI or Bootstrap for a more polished design.
Enable user registration and password reset functionality.
How to Run the Project
Clone the repository:
bash
Copy
Edit
git clone <repo-link>
Open index.html in a browser.
Login using:
pgsql
Copy
Edit
Username: admin
Password: password
Select a semester.
Browse, search, and filter available courses.
Logout when done.
