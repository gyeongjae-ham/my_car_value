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

## Things to remember

- DI Container Flow

1. At startup, register all classes with the container
2. Container will figure out what each dependency each class has
   > 1~2 : Use the 'injectable' decorator on each class and add them to the modules list of providers
3. We then ask the container to create an instance fo a class for us
4. Container creates all required dependencies and gives us the instance
   > Happens automatically - Nest will try to create controller instances for us
5. **Container will hold onto the created dependency instances and reuse them if needed**
