// pool
const pool = require("../database/database.js")

// get comments
async function getComments() {
	const allComments = await pool.query(`SELECT * FROM comment`)
	return allComments
}

// get by id
async function getOne(id) {
	try {
		const res = await pool.query(`
		SELECT * FROM comment
		WHERE id=?
		`, [id])
		const comment = res[0][0]
		return comment
	} catch (err) {
		return res
	}
}

// create comment
async function createComment(user_id, body) {
	try {
        const q = `INSERT INTO comment (user_id, body) values (${user_id}, ${body})`
        const res = await pool.query(q)
    } catch (error) {
        return error
    }
}

// delete comment
async function deleteComment(id) {
	try {
		const q = `DELETE FROM comment WHERE id=${id}`
		const res = await pool.query(q)
		return res
	} catch (err) {
		return err
	}
}

module.exports = { getOne, getComments, createComment, deleteComment }