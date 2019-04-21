1. git clone the repo
2. run `docker-compose up`
3. Access localhost:3000 or 0.0.0.0:3000 to play around with the app

API

1. Order API - 0.0.0.0:3001
1. Payment API - 0.0.0.0:3002

Access this order API to see the data

1. 0.0.0.0:3001/api/v1/order/all
2. 0.0.0.0:3002/api/v1/order/:order_id

The architecture

1. Client is written in Vue.js + Nuxt to handle the client and it is connected to the order API
2. Both order and payment app is written in Node.js + Express
3. I used mlab to create the database
4. The app functioning as the basic given task problem
5. I added multiple API's and as well as wrote the clientside
6. I used Zomato API to consumed the food data and map it to the clientside
7. Using Docker to containerized each app.

Warning:

Theres a bug in Nuxt vue.js app `asyncData()` function

1. If user refresh the page it wont fetch the data because connection error to the Docker IP

2. Just navigate it normally without refreshing the page especially on

Don't refresh on page

localhost:3000 or 0.0.0.0:3000 -> /order-status and /order-status/:order_id

Thanks!
