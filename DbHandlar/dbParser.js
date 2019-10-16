const mongoose = require('mongoose')

class Mongoose {
 
  constructor() {
    this.uri = "mongodb+srv://group1:goup1@restaurantapi-7zxnu.mongodb.net/RestaurantAPI?retryWrites=true&w=majority"
  }

  connect(uri) {
    console.log()
    mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify:false
      
    })
    let db = mongoose.connection
    db.on('connected', function () {
      console.log('Database connected')
    })

    db.once('open', () => {
      console.log("success")
    })

    // process.on("SIGINT", function () {
    //   db.close(function () {
    //     console.log("Mongoose connection disconnected through app termination.")
    //     process.exit(0);
    //   })
    // })

  }

}

module.exports = Mongoose;




/**
 *
 * const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://group1:group1@restaurantapi-7zxnu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 *
 *
 */