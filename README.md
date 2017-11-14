# event-codex
[![Waffle.io - Issues in progress](https://badge.waffle.io/480Random5/event-codex.png?label=in%20progress&title=In%20Progress)](http://waffle.io/480Random5/event-codex)
## Public URL
cs480 github.io homepage : http://cs480-projects.github.io/teams-fall2017/random5/index.html<br>
public domain: http://eventcodex.org </br>
public DNS (EC2): http://ec2-54-215-238-243.us-west-1.compute.amazonaws.com/ </br>
Circle CI: https://circleci.com/gh/480Random5 </br>
Jenkins: http://ec2-54-215-238-243.us-west-1.compute.amazonaws.com:8080
## Event API
| method        |route               | input                  |output |
| ------------- |:-------------:     | -----:                 |----------: |
| GET           | /api/event         |                        |  all events mongo database  |
| GET           | /api/event/title/:info|                     | all events with specific title |
| GET           | /api/event/category/:info|                  | all events with specific category |
| GET           | /api/event/tag/:info|                       | all events with specific tag |
| POST          | /api/event         |                        |           |

## Run
[Node.js](http://nodejs.org/) is required.

```shell
$ git clone https://github.com/480Random5/event-codex.git
$ cd event-codex
$ cd client 
$ npm install
$ cd ../server
$ npm install
$ npm run dev
```

You can access <http://localhost:3000> on your web browser to client.
You can access <http://localhost:5000> on your web browser to server.
