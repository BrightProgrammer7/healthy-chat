import * as MongoClient from "mongodb";
import webSocket from 'ws';


const uri = "mongodb://localhost:27017";
const url = "mongodb://localhost:27017/heart_rate_db";
const wss = new webSocket.Server({ port: 4000 });


// create a mongodb connection to the database object for the collection
function connect() {
  return new Promise((resolve, reject) => {
   
    MongoClient.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        // if (err) throw err;
        if (err) {
          reject(err);
        } else {
          resolve(client);
        }

        // Connect to the `heart_rate_db` database in MongoDB
        const db = client.db("heart_rate_db");
        // Create a collection called `heart_rate_collection`.
        const collection = db.collection("heart_rate_collection");

        // Insert heart rate data into the collection
        // const heartRate = 80;
        // const timestamp = new Date();

        // collection.insertOne(
        //   { heartRate: heartRate, timestamp: timestamp },
        //   (err, result) => {
        //     if (err) throw err;

        //     console.log("Heart rate data inserted into collection");
        //     client.close();
        //   }
        // );

        // Collect heart rate data from users via a WebSocket connection to an Arduino heart rate sensor,
        wss.on("connection", (ws) => {
          console.log(`WebSocket client connected: ${ws.id} `);

          ws.on("message", (data) => {
            console.log(`Received message: ${data}`);

            const heartRate = parseInt(data);
            const timestamp = new Date();

            // Store heart rate data in MongoDB 
            collection.insertOne(
              { heartRate: heartRate, timestamp: timestamp },
              (err, result) => {
                if (err) throw err;

                console.log("Heart rate data inserted into MongoDB");
              }
            );
          });

          ws.on("close", (code) => {
            console.log(`WebSocket client disconnected: ${code}`);
          });
        });
      }
    );
  });
}

connect()
  .then((client) => {
    console.log("Connected successfully to server");
    return client;
    // client.close();
    // return;
  })
  .catch((err) => {
    console.log(err);
  });
