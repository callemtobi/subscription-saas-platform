import pool from "../config/db.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, slug, role } = req.body;
        const user = await pool.query("UPDATE users SET fullname = $1, email = $2, slug = $3, role = $4 WHERE id = $5", [fullname, email, slug, role, id]);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}