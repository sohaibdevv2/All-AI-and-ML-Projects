# Django Authentication Project

This is a required lab assignment for the **IBM Django Program** focusing on Django concepts.

## Learning Objectives

* Understand the fundamental components of the **Django authentication system**.
* Implement the necessary views and templates to enable **user log in** and **log out** functionality.
* Develop the views and templates required for **user registration**.

---

## Prerequisites

* Familiarity with the Django framework and its MVT (Model-View-Template) architecture.
* Python and Django must be installed in your environment.

---

## How to Run

1.  Clone this repository (or ensure all project files are in your working directory).
2.  Navigate to the project root directory in your terminal.
3.  Run the necessary **database migrations**:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
4.  (Optional) Create a superuser for testing:
    ```bash
    python manage.py createsuperuser
    ```
5.  Start the development server:
    ```bash
    python manage.py runserver
    ```
6.  Open your browser and go to the provided local address (usually `http://127.0.0.1:8000/`) to access the application and test the authentication features.