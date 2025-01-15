const mysql2 = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const host = 'localhost';

const app = express();

app.use(bodyParser.json());
app.use(cors());

class Connection {
    constructor () {
      this.con =  mysql2.createConnection({
        host: host,
        user: 'username',
        password: 'password',
        database: 'dbname'
      })}
  
    connect(callback) {
      this.con.connect((err) => callback(err));
    }
  
    query(querySql, callback) {
      this.con.query(querySql, (err, result) => callback(err, result));
    }
  
    end(callback) {
      this.con.end((err) => {if (callback) callback(err)});
    }
}

app.get('/', function(_, response) {
    response.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    })

    const c = new Connection();
    c.connect(function (error) {
      if (error) {
        console.log(new Error(error));
      }
    });

    c.query('select * from Blocks', function(e, results) {
        if (e) {
            response.status(500);
            response.send({e: e});
        } else {
            response.status(200);
            response.send({blocks: results});
        }
    })

    c.end();
});

app.post('/add', function(request, response) {
    response.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    const c = new Connection();
    c.connect(function (error) {
      if (error) {
        console.log(new Error(error));
      }
    });

    c.query(`insert into Blocks (title, text) values ('${request.body.title}', '${request.body.text}')`, function(e, _) {
        if (e) {
            console.log('e');
            response.status(500);
            response.send({e: e});
        } else {
            response.status(200);
            response.send();
        }
    })

    c.end();
});

app.delete('/delete', function(request, response) {
    console.log(request.body);
    response.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    const c = new Connection();
    c.connect(function (error) {
      if (error) {
        console.log(new Error(error));
      }
    });

    c.query(`delete from Blocks where id = ${request.body.id}`, function(e, _) {
        if (e) {
            console.log(e);
            response.status(500);
            response.send({e: e});
        } else {
            response.status(200);
            response.send();
        }
    })

    c.end();
})

app.listen(5000);