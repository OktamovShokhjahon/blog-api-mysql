// pool
const pool = require("../database/database.js")

// get blog
async function getBlogs() {
	const allBlogs = await pool.query(`SELECT * FROM blog`)
	return allBlogs
}

// get by id
async function getOne(id) {
	try {
		const res = await pool.query(`
		SELECT * FROM blog
		WHERE id=?
		`, [id])
		const blog = res[0][0]
		return blog
	} catch (err) {
		return res
	}
}

// create blog
async function createBlog(image_id, title, body) {
	try {
        const q = `INSERT INTO blog (image_id, title, body) values (${image_id}, ${title}, ${body})`
        const res = await pool.query(q)
    } catch (error) {
        return error
    }
}

// update blog
async function updateBlog(id, title, body, image_id, comments) {
	try {
		if (title) {
			const q = `UPDATE blog SET title=${title} WHERE id=${id}`
			const res = await pool.query(q)
		}

		if (body) {
			const q = `UPDATE blog SET body=${body} WHERE id=${id}`
			const res = await pool.query(q)
		}

		if (image_id) {
			const q = `UPDATE blog SET image_id=${image_id} WHERE id=${id}`
			const res = await pool.query(q)
		}

		if (comments) {
			const q = `UPDATE blog SET comments=${comments} WHERE id=${id}`
			const res = await pool.query(q)
		}

		return "Updated successfully"
	} catch (err) {
		return err
	}
}

// delete blog
async function deleteBlog(id) {
	try {
		const q = `DELETE FROM blog WHERE id=${id}`
		const res = await pool.query(q)
		return res
	} catch (err) {
		return err
	}
}

module.exports = { getOne, getBlogs, createBlog, updateBlog, deleteBlog }