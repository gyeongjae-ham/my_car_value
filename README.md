## Explain

| Used Car Pricing API                                                                       |
| ------------------------------------------------------------------------------------------ |
| Users sign up with email/password                                                          |
| Users get an estimate for how much their car is worth based on the make/model/year/mileage |
| Users can report what they sold their vehicles for                                         |
| Admins have to approve reported sales                                                      |

## API

| Role                                   | Method and Route  | Body or Query String                                               | Description                                    |
| :------------------------------------- | :---------------: | :----------------------------------------------------------------- | :--------------------------------------------- |
| Users sign up with email/password      | POST /auth/signup | Body - { email, password }                                         | Create a new user and sign in                  |
| Users sign up with email/password      | POST /auth/signin | Body - { email, password }                                         | Sign in as an existing user                    |
| Users get an estimate for how much ... |   GET /reports    | QS - make, model, year, mileage, longitude, latitude               | Get an estimate for the cars value             |
| Users can report what they sold ...    |   POST /reports   | Body - { make, model, year, mileage, longtityde, latitude, price } | Report how much a vehicle sold for             |
| Admins have to approve reported sales  |  PATCH /reports   | Body - { approved }                                                | Approve or reject a report submitted by a user |

## Flow

|     Module     |     Controller     |     Service     |     Repository     |
| :------------: | :----------------: | :-------------: | :----------------: |
|  User Module   |  Users Controller  |  Users Service  |  Users Repository  |
| Reports Module | Reports Controller | Reports Service | Reports Repository |
