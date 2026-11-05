import pool from "../config/db.js";
import argon2 from "argon2";

export const register = async (req, res) => {
    try {
        const { fullName, email, slug, role, password } = req.body;
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
    try {
        const {email,  password} = req.body;

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
        console.log("User: ", user)
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"})
        }
        
        const isPasswordValid = await argon2.verify(user.password_hash, password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        // Access Token
        const accessToken = await generateToken({ id: user.id, email: user.email });
        const refreshToken = await generateRefreshToken({ id: user.id, email: user.email });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
        });
        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // sameSite: "none" + secure: true is required if frontend (Netlify)
        // and backend are on different domains —
        // otherwise the cookie won't be sent cross-site.
        // use "lax" in dev and "none" (with secure: true) in production,

        console.log("-> Login successful");

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
        console.error("Login error: ", error.message)
        res.status(500).json({ message: "Internal server error", error });
    }
}