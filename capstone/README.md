Project: Mini HR



Description of project:

This web application allows all registered users to plan when they will go to the holiday in department( free days from work). 
After that, manager(user with role manager) has:
 - global overview about absence situation,
 - can agree with employee with his plan or
 - reject with annotation to correct for example because of too much employees has planned free day with the same days.
 
Main reason to use application is to coupe with absence of employees 
in department and maintain absence (caused by for example holidays or leave) on desired level.

In addition, user with role admin can:
	- set year of planning,	
	- set users roles,
	- set dimension of days to plan





Distinctiveness and Complexity:

Distinctiveness:
Project is not like previous one projects, its main functionality is to plan holidays by employees in agreement with manager.
Has its own web forms to cope with the problem as a employee, as a manager, and as a admin.
Information is being stored in database and exchanged between three forms :
1. form to plan free days
2. form to get all plans together and make decision about chosen employee/employees
3. form to set program basic parameters.

Complexity:
Project uses python and Django framework, html with css pages,
functionality at the front end is based in javascript(with elements of REACT and JQuery)
I was writing this application with my personal goal to consolidate my knowledge gained from previous projects. 
In this project I develop new skills of creating dynamically interface (I created myself  tables like datapicker to manage operations on dates) 
and communicating between database and front end interface.
 
I have tried to build application as mobile responsive at front-end view as I could - interface is changing when size of browser is changing.
In this case I commonly use flexible layouts. But in case of manager form,
 there is also mechanism of showing content related to window width. I divided showing month on three parts,
 and we can see all parts on wide screen, but on narrow screen we can see one or two parts of month
 ( depends on width of showing web browser). 
 When we have narrow screen we can choose which part of month we want to see.





How to run application:

Application is build (has the same structure) as previous projects in this course.
At the beginning, download the distribution code. There are two ways of running application,
depends if you want fresh start without old data or not.

A. Copy with data:

1.(terminal) In your terminal, cd into the uploaded project directory.
2.(terminal) run commands in project folder:
	a) python3 manage.py makemigrations capstone
	b) python3 manage.py migrate
	c) python3 manage.py run server
in database is created superuser: test1@o2.pl with password !pass123
3. you can login at page: http://127.0.0.1:8000/admin/ with superuser account
or just at index page with the same credentials or create new user.


B. Copy without data:

1.(terminal) delete file and folder:
	a)file - db.sqlite3 
	b)folder - capstone/migrations
	
2.(terminal) run commands in project folder:
	a) python3 manage.py makemigrations capstone
	b) python3 manage.py migrate
	c) python3 manage.py run server
	
3.(browser) open browser at http://127.0.0.1:8000/ and stay here. Do not click any links right now.
When index page shows, in the database will be created roles ( employee, manager, admin). Then go to step 4.

4. (terminal)run command:
python3 manage.py createsuperuser
and create superuser ( with username and password). Step no 3 is needed first to create roles.

5. (browser) login at page: http://127.0.0.1:8000/admin/ with superuser account

6.  at http://127.0.0.1:8000/admin/capstone/user/ change superuser Role attribute from employee - Roles object(1) - 
to Roles object(3). It will give admin privileges to superuser.

7. (browser) then you can register all other users at index page. Admin(superuser) can change default role ( "employee")
to another that exists.





 
Description of functionality:

Settings form (adminmanager.html):

- set year of planning.
- set additional holidays
- set role and amount of free days for every user

Planner form (leaveplanner.html):

- choose days in year of planning.
- save chosen days as a working copy.
- send days to manager to approve plan.

Manager form (leavemanager.html):
- check overall of plans
- accept/reject plan of employee with statuses != planning
- accept/reject plan of chosen group of employees.
 
 
 
 
List of files with description:

urls.py - file with url configuration
models.py - file with django models
admin.py - file with definitions for django admin interface
views.py - file with python code to manage server side part of application

\templates\capstone\layout.html - file with template for user side part of application
\templates\capstone\register.html - user register page 
\templates\capstone\login.html - user login page 

\templates\capstone\index.html - index page  to choose from one of available functionalities 

\templates\capstone\adminmanager.html - page for admin to administrate basic parameters 
\templates\capstone\leaveplanner.html - page for all users to plan free days 
\templates\capstone\leavemanager.html - page for  manage employees propositions of free days dates

\static\capstone\adminmanager.js - additional javascript file to adminmanager.html file
\static\capstone\leaveplanner.js - additional javascript file to leaveplanner.html file
\static\capstone\javascript.js - additional javascript file to index.html file

\static\capstone\leavemanager.css - css file to leavemanager.html file
\static\capstone\leaveplanner.css - css file to leaveplanner.html file
\static\capstone\styles.css - css file to layout.html file







 



