#Technologies Used
MERN stack (MongoDB, Express, React and Node.js) and full CRUD functionality. The app uses authorization, consiting of sign up/log in functionality, encrypted passwords and an authorization flow. 3 models total for quizzes, users, and seed data.
#Approach
We started with authorization, since we evaluated sign up/log to be the highest complexity user story of our MVP. For users sign in, we created functionality for them to create, delete, and take quizzes using quiz controller in the back-end and a showAllQuizzes component in the front-end. Once we created the create quiz form and a show page for all the quizzes, we built a seedModel so users can see pre-made quizzes. Styling the homepage quizzes to be cards and making a carousel for taking quizzes are two highlights of our priority for seamless user experience.
https://www.pivotaltracker.com/n/projects/2387552
#Unsolved Problems
When typing in the log in modal, background images change color for some reason. 
Upon logging in, the state does not refresh to show the delete buttons (you must refresh the page to do so).
#User Stories 
Users can create an account to the website so they can log in. If users dont create an account, they can just take quizzes on the website. Once logged in, users can create quizzes and delete quizzes they've made.
#Next Steps
Add update quiz functionality so users in a session can edit quiz data.
Make a Logo
Toggle button for showing the user only their quizzes
Shareable link to a quiz
#Link to hosted working app

