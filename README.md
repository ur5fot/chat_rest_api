# Express & mongoose REST API 
## Getting Started

Clone the repo:
```sh
git clone https://github.com/ur5fot/chat_rest_api.git
cd chat_rest_api
```

Install dependencies:
```sh
npm i
```
Install Mongo DB:
Need Install to Mongo DB and need to change `config/common_settings.json` 

Start server:
```sh
npm run start 
```
and run Mongo DB

## End Points
POST method for creating a new message `/messages/create`  
```
    {
        email: {
          type: String,
          required: true,
          match: [/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/, props => `${props.value} is not a valid email!`]
        },
        text: {
          type: String,
          required: true,
          min: 1,
          max: 99
        },
        create: {
          type: Date,
          required: true
        },
        update: {
          type: Date,
        },
      }
```
GET method for creating a new message `/messages/list/:page` 
`:page` is it this number page message

GET method for creating a new message `/messages/single/:id` 
`:id` is it this id single message

