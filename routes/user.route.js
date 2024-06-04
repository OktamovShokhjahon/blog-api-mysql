const { Router } = require("express")

// controllers
const { getAllUsers, getOne, createUser, updateUser, checkPassword, deleteUser } = require("../controllers/user.controller.js")

// router
const router = Router()

// get all users
router.get("/user/get-all", async (req, res) => {
	try {
		const users = await getAllUsers()
		const allUsers = users[0]
		const response = {
			ok: true,
			length: allUsers.length,
			data: allUsers
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

// get one user
router.get("/user/:id", async (req, res) => {
	const { id } = req.params

	try {
		const user = await getOne(id)
		const response = {
			ok: true,
			data: user
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

// create user
router.post("/user/create", async (req, res) => {
	const {first_name, last_name, email, password} = req.body

	if (!first_name || !last_name || !email || !password) {
		res.send("All values not provided")
		return
	}

	const response = await createUser(first_name, last_name, email, password)
	res.send(response)
})

// update user
router.post('/user/update/:id', async (req, res) => {
	const {id} = req.params
	const {first_name, last_name, email, password} = req.body

	const response = await updateUser(id, first_name, last_name, email, password)
	res.send(response)
})

// delete user
router.post("/user/delete/:id", async (req, res) => {
	const {id} = req.params
	const response = await deleteUser(id)
	res.send(response)
})

// check password
router.post("/user/check-user", async (req, res) => {
	const {password, email} = req.body

	if (!password || !email) {
		res.send("Password or Email not provided")
		return
	}

	const response = await checkPassword(password, email)
	res.send(response)
})

module.exports = router
