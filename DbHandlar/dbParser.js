const mongoose = require('mongoose')

class mongoose {

	constructor (){
		this.uri = 'mongodb://<dbuser>:<dbpassword>@ds135068.mlab.com:35068/task25' 
	}

	connect(){
		mongoose.connect(this.uri);
		
		var db = mongoose.connection
        db.on('connected', function () {
            console.log('Database connected')
          })
        db.on('error', console.error.bind(console, 'MongoDB connection error:'))

	}


}
