# google-sheet-auth

The routes for the application

1. `/user/signup`

Requires

- email
- password

2. `/user/login`

Requires

- email
- password
- Copy the authToken

3. `/spreadsheet/:id`

Requires

- Make sure to use the id as 1BZITU6m1ONfLM4Og1TK2jiiBsEE3xiC3OR602Objexw as this sheet only is authorised for this application.
- authToken

4. `/spreadsheet/update`

Requires

- Make sure to use the id as 1BZITU6m1ONfLM4Og1TK2jiiBsEE3xiC3OR602Objexw as this sheet only is authorised for this application.
- authToken
- spreadsheet_id
- sheet_id
- row_number
- column_number
- value

To view all the changes while using the application you can use https://docs.google.com/spreadsheets/d/1BZITU6m1ONfLM4Og1TK2jiiBsEE3xiC3OR602Objexw/edit?usp=sharing