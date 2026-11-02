import pool from "../config/db.js";
import argon2 from "argon2";

export const register = async (req, res) => {
    const { fullName, email, slug, role, password } = req.body;
    try {
        if (!fullName?.trim() || !email?.trim() || !slug?.trim() || !role?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const hashedPassword = await argon2.hash(password);
        console.log(`Hashed password: ${hashedPassword}`);
        
        const user = await pool.query(`
            INSERT INTO users (fullname, email, slug, role, password_hash) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [fullName.trim(), normalizedEmail, slug, role, hashedPassword]);
        
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        // PostgreSQL unique violation
        if (error.code === "23505") {
            return res.status(409).json({
                message: "An account with this email already exists",
        });}
        console.error("Registration error: ", error.message)
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const login = async (req, res) => {
    const {email,  password} = req.body;
    try {
        if (!email?.trim() || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }
        const normalizedEmail = email.toLowerCase().trim();
        const result = await pool.query(
            `SELECT id, fullname, email, role, password_hash
            FROM users
            WHERE email = $1
            `, [normalizedEmail]
        );

        const user = result.rows[0];
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"})
        }
        
        const isPasswordValid = await argon2.verify(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        // Access Token

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                name: user.fullname,
                email: user.email
            }
        })

    } catch(error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}