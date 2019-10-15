
let mongoose = require('mongoose')
var crypto = require('crypto')

var UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, "can't be blank"], unique: true },
  email: { type: String, required: [true, "can't be blank"], unique: true },
  role : {type : Number, required :[true, "cannot be blank"], }
  hash: String,
  salt: String
}, { timestamps: true }) // timestamps is for automatically update of changes (createAt, updateAt)

UserSchema.methods.setPassword = function (password) {
  // creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex')

  // hashing user's salt and password with 1000 iterations,  64 length and sha512 digest
  this.hash = crypto.pbkdf2Sync(password, this.salt,
    1000, 64, `sha512`).toString(`hex`)
}

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password,
    this.salt, 1000, 64, `sha512`).toString(`hex`)
  return this.hash === hash
}

let User = mongoose.model('users', UserSchema)

module.exports = User
