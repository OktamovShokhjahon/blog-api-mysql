// packages
const express = require("express")
require("dotenv").config()
const fileUpload = require("express-fileupload")

// routes
const BlogRoute = require("./routes/blog.route.js")
const UserRoute = require("./routes/user.route.js")
const CommentRoute = require("./routes/comment.route.js")

// app
const app = express()

// config
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(fileUpload({}))

// middleware
app.use("/api", BlogRoute)
app.use("/api", UserRoute)
app.use("/api", CommentRoute)

// start
const dev = async () => {
	try {
		const PORT = process.env.PORT || 4100
		app.listen(PORT, () => console.log(`App started on http://localhost:${PORT}`))
	} catch (err) {
		console.log(err)
	}
}

dev()
