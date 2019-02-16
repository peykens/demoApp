//importing node framework
var express = require('express');
const promClient = require('prom-client');

//default metrics
//const collectDefaultMetrics = promClient.collectDefaultMetrics;
//collectDefaultMetrics({ timeout: 5000 });


const promCounterHelloWorld = new promClient.Counter({name: 'count_hello_world', help: 'Counting the hits on the root endpoint'});
const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
  })

var app = express();

app.use(logResponseTime);

  //Respond with "hello world" for requests that hit our root "/"
  app.get('/', function (req, res) {
      setTimeout(() => {
          res.statusCode = 200;
          res.json({ message: 'Hello World!' })
          res.end();
          promCounterHelloWorld.inc();
        }, Math.round(Math.random() * 200))
              
  });
   
  // Metrics endpoint
  app.get('/metrics', (req, res) => {
      setTimeout(() => {
          res.statusCode = 200;
          res.set('Content-Type', promClient.register.contentType);
          res.end(promClient.register.metrics());
        }, Math.round(Math.random() * 200))
  });

  app.get('/bad', (req, res,next) => {
      next(new Error('My Error'))
    })

  // Error handler
  app.use((err, req, res, next) => {
      res.statusCode = 500
      // Do not expose your error in production
      res.json({ error: err.message })
      next()
  })

    //listen to port 3000 by default
app.listen(process.env.PORT || 3000);

// response-time-logger.js
function logResponseTime(req, res, next) {
    const startHrTime = process.hrtime();
  
    res.on("finish", () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      console.log("%s : %fms", req.path, elapsedTimeInMs);
      httpRequestDurationMicroseconds
        .labels(req.method, req.path, res.statusCode)
        .observe(elapsedTimeInMs)
    });
  
    next();
  }
 
module.exports = app;