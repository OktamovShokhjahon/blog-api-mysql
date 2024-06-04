const { Router } = require("express")

// controllers
const { getBlogs, getOne, createBlog, updateBlog, deleteBlog } = require("../controllers/blog.controller.js")

// services
const fileService = require('../services/service.file')

// router
const router = Router()

// get all blogs
router.get("/blog/get-all", async (req, res) => {
	try {
		const blogs = await getBlogs()
		const all_blogs = blogs[0]
		const response = {
			ok: true,
			length: all_blogs.length,
			data: all_blogs
		}
		res.send(response)
	} catch (err) {
		const response = {
			ok: false,
			data: "Something went wrong",
			err
		}
		res.send(response)
	}
});

// get one blog
router.get("/blog/:id", async (req, res) => {
	const { id } = req.params

	try {
		const blog = await getOne(id)
		const response = {
			ok: true,
			data: blog
		}
		res.send(response)
	} catch (err) {
		const response = {
			ok: false,
			data: "Something went wrong",
			err
		}
		res.send(response)
	}
});

// create blog
router.post("/blog/create", async (req, res) => {
	const {image_id, title, body} = req.body

	if (!image_id || !title || !body) {
		res.send("All values not provided")
		return
	}

	const response = await createBlog(image_id, title, body)
	res.send(response)
})

// update blog
router.post('/blog/update/:id', async (req, res) => {
	const {id} = req.params
	const {title, body, image_id, comments} = req.body

	const response = await updateBlog(id, title, body, image_id, comments)
	res.send(response)
})

// delete blog
router.post("/blog/delete/:id", async (req, res) => {
	const {id} = req.params
	const response = await deleteBlog(id)
	res.send(response)
})

// upload image
router.post("/upload", (req, res) => {
	try {
		const fileName = fileService(req.body.picture) 
		res.status(200).send(fileName)	
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
