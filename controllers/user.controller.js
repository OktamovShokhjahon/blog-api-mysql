// pool
const pool = require("../database/database.js")

// get users
async function getAllUsers() {
	try {
		const q = `SELECT * FROM user`
		const res = await pool.query(q)
		return res
	} catch (err) {
		return err
	}
}

// get user by id
async function getOne(id) {
	try {
		const q = `SELECT * FROM user WHERE id=${id}`
		const res = await pool.query(q)
		return res
	} catch (err) {
		return err
	}
}

// create user
async function createUser(first_name, last_name, email, password) {
	try {
		const q = `INSERT INTO user (first_name, last_name, email, password) values(${first_name} ${last_name} ${email} ${password}`
		const res = await pool.query(q)
		return res
	} catch (err) {
		return err
	}
}

// update user
async function updateUser(id, first_name, last_name, email, password) {
	try {
		if (first_name) {
			const q = `UPDATE user SET first_name = ${first_name} WHERE id = ${id} `
			const res = await pool.query(q)
		}

		if (last_name) {
			const q = `UPDATE user SET last_name = ${last_name} WHERE id = ${id} `
			const res = await pool.query(q)
		}

		if (email) {
			const q = `UPDATE user SET email = ${email} WHERE id = ${id} `
			const res = await pool.query(q)
		}

		if (password) {
			const q = `UPDATE user SET password = ${password} WHERE id = ${id} `
			const res = await pool.query(q)
		}
	} catch (err) {
		return err
	}
}

// delete user
async function deleteUser(id) {
	try {
		const {id} = req.params
		const q = `DELETE FROM user WHERE id = ${id}`
		const res = await pool.query(q)
		return res
	} catch (err) {
		return err
	}
}

// check password
async function checkPassword(pass, email) {
	try {
		const q = `SELECT * FROM user WHERE email = "${email}" `
		const res = await pool.query(q)
		if (res[0].length === 0) {
			return {
				ok: false,
				message: "User doesn't exists"
			}
		} 		

		const userPass = res[0][0].password === pass
		if (userPass) {
			return {
				ok: true,
				message: "Password is correct"
			}
		} else {
			return {
				ok: false,
				message: "Password is incorrect"
			}
		}
	} catch (err) {
		return err
	}
}

module.exports = { getAllUsers, getOne, createUser, updateUser, checkPassword, deleteUser }