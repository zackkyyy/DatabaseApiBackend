const mongoose = require('mongoose')

class Mongoose {
    constructor () {
		//this.uri = 'mongodb://group1:hanaskog1@ds135068.mlab.com:35068/task25' 
        this.uri = 'mongodb://localhost/RestaurantDb'
      }
    
      connect(){
        mongoose.connect(this.uri,{
			useNewUrlParser:true,
		})
        let db = mongoose.connection
        db.on('connected', function () {
            console.log('Database connected')
		  })
		  
		db.once('open' , ()=>{
			console.log("success")
		})  

        process.on("SIGINT", function() {
          db.close(function() {
             console.log("Mongoose connection disconnected through app termination.")
            process.exit(0);
        })
    })

      }

}

module.exports = Mongoose;

