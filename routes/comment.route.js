const { Router } = require("express")

// controllers
const { getOne, getComments, createComment, deleteComment } = require("../controllers/comment.controller.js")

// services
const fileService = require('../services/service.file')

// router
const router = Router()

// get all comments
router.get("/comment/get-all", async (req, res) => {
	try {
		const comments = await getComments()
		const allComments = comments[0]
		const response = {
			ok: true,
			length: allComments.length,
			data: allComments
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

// get one comment
router.get("/comment/:id", async (req, res) => {
	const { id } = req.params

	try {
		const comment = await getOne(id)
		const response = {
			ok: true,
			data: comment
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

// create comment
router.post("/comment/create", async (req, res) => {
	const {user_id, body} = req.body

	if (!user_id || !body) {
		res.send("All values not provided")
		return
	}

	const response = await createComment(user_id, body)
	res.send(response)
})

// delete comment
router.post("/comment/delete/:id", async (req, res) => {
	const {id} = req.params
	const response = await deleteComment(id)
	res.send(response)
})

module.exports = router
