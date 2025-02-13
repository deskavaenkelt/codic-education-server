import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = Schema({
	username: {
		type: String,
		unique: true,
		allowNull: false,
		required: true,
		lowercase: true,
	},
	email: {
		type: String,
		unique: true,
		allowNull: false,
		required: true,
		lowercase: true,
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true,
		sparse: true,
		trim: true
	},
	accountValidation: {
		isEmailVerified: { type: Boolean, default: false },
		isAccountDisabled: { type: Boolean, default: false },
		isAccountBanned: { type: Boolean, default: false }
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['basic', 'employee', 'admin'],
		default: 'basic'
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	personalDetails: {
		firstName: { type: String, default: '' },
		lastName: { type: String, default: '' },
		gender: { type: String, enum: ['male', 'female'] },
		country: { type: String, default: '' },
		adress: { type: String, default: '' },
		secondaryAdress: { type: String, default: '' },
		zipCode: { type: String, default: '' },
		county: { type: String, default: '' },
		postOffice: { type: String, default: '' },
		phone: { type: String, default: '' },
		secondaryPhone: { type: String, default: '' }
	},
	creditCard: {
		method: String,
		number: String
	},
	avatar: {
		fileName: { type: String },
		filePath: { type: String },
		fileType: { type: String },
		fileSize: { type: String }
	},
	shoppingCart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'shoppingcart',
		required: true
	},
	newsLetterSubscription: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'newslettersubscription',
		required: true
	},
	favouriteProducts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
	}]
}, { timestamps: true, strict: true })

const UserModel = mongoose.model('user', userSchema)
export default UserModel