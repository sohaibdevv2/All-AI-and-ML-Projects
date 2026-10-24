# Hello!
Thank you for taking the time to grade this project.  Below you will find the specifications and expected behaviors of the API endpoints.  They are presented in a sequence that should provide as frictionless a grading experience as possible, but feel free to tackle them in any order you choose.

# General Notes and Reminders
This file uses markdown table formatting to present the API endpoint behaviors in as clear a manor as possible. Markdown can be viewed in the browser via the GitHub page, using the `Open Preview` option in VSCode, or through your preferred markdown/text editor.  

The project uses `pipenv` to manage the dependencies for the virtual environment.  As a reminder, the process for installing dependencies via `pipenv`:
- If `pipenv` is not currently installed, run the command `pip install pipenv`
- In your termainal or console, navigate to this project's root directory (contains the files `Pipfile`, `Pipfile.lock`, and this file)
- Use the command `pipenv shell` to enter the virtual environment
- Run the command `pipenv install` to install the dependencies.  

Also, remember to include the nessesary information about your local MySQL databases in the project's `settings.py` file:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'LittleLemon', # <-- update
        'HOST': '127.0.0.1',
        'PORT': '3306',        # <-- update
        'USER': 'root',        # <-- update
        'PASSWORD': '',        # <-- update
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}
```

# Static Content

The address for serving the rendered static content is `127.0.0.1:8000/restaurant/`.  Static assests are referenced and rendered through the template page `index.html`.

# Unit Testing

There are only two unit tests provided in this project.  They can be run using the following command: `python manage.py test tests\`.

# API Endpoints
Endpoints that require an authentication token have been indicated in the table below.

| Endpoint | Method | Token Required | Client Payload | Expected Behavior |
| --- | --- | --- | --- | --- |
| _user creation and authentication_ |  |  |  |  |
| `/auth/users/` | POST | --- | `username`, `email`, `password` | Creates a new user account. Returns serialized `User` object data. |
| `/auth/token/login/` | POST | --- | `username`, `password` | Creates an authentication token for the given user.  Returns the generated token. |
| _menu items_ |  |  |  |  |
| `/api/menu-items/` | POST | yes | `title`, `price`, `inventory` | Creates new `MenuItem`.  Returns serialized data for `MenuItem` object. |
| `/api/menu-items/` | GET | yes | --- | Returns an array of serialzed `MenuItem` objects. |
| `/api/menu-items/<int:pk>` | GET | yes | --- | Returns serialzed `MenuItem` object with the corresponding id. |
| `/api/menu-items/<int:pk>` | PUT, PATCH | yes | `title`, `price`, `inventory` | Update `MenuItem` object with the corresponding id. |
| `/api/menu-items/<int:pk>` | DELETE | yes | --- | Remove `MenuItem` object with the corresponding id. |
| _booking_ |  |  |  |  |
| `/restaurant/bookings/tables/` | GET | yes | --- | Returns array of serialized `Booking` objects. |
| `/restaurant/bookings/tables/` | POST | yes | `name`, `no_of_guests`, `booking_date` | Reservers a table.  Returns serialized `Booking` object data. |
| _user creation and authentication_ |  |  |  |  |
| `/auth/token/logout/` | GET | yes | --- | Invalidates the token for the associated user.  Returns no payload. |

