# Live API Spec OAS/Swagger:  
- https://investor-checklist-tool-be.herokuapp.com/v1/docs/

# Accessing the API documentation:  
- git clone this repository  
- install dependencies with "yarn install"  
- set environment variables in .env.example, then change name to .env  
- run 'yarn dev'  
- go to localhost:3000/v1/docs in browser  
---


This backend was built using the boilerplate from: https://github.com/hagopj13/node-express-boilerplate  
  
endpoint = {base url from hosting service} + /v1  
example: localhost:3000/v1  
  
if /auth/login is successful, res.body.tokens.access.token and res.body.user.id should be stored in session or cookie  
