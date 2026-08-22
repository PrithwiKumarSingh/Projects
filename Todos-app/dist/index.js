import express from "express";
import { registerSchema, loginSchema, contentSchema } from "./validation/zodValidatin.js";
import client from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { middleware } from "./middleware/middleware.js";
const app = express();
app.use(express.json());
app.post("/register", async (req, res) => {
    try {
        const parsedData = registerSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.json({
                message: "Incorrect Input"
            });
            return;
        }
        console.log(parsedData);
        // check user already exists or not
        const existingUser = await client.user.findFirst({
            where: {
                email: parsedData.data?.email
            }
        });
        if (existingUser) {
            res.json({
                message: "Already exist user with Email"
            });
            return;
        }
        // password hash 
        const passHash = await bcrypt.hash(parsedData.data?.password, 10);
        console.log("password Hashed");
        // db configuration
        const response = await client.user.create({
            data: {
                username: parsedData.data?.username,
                email: parsedData.data?.email,
                password: passHash
            }
        });
        console.log(response);
        const token = jwt.sign({
            userId: response.id,
            username: response.username
        }, process.env.JWT_SECRET_KEY);
        res.status(200).json({
            message: "Account created succesfully",
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(411).json({
            message: err
        });
    }
});
app.post("/login", async (req, res) => {
    try {
        const parsedData = loginSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.json({
                message: "Invalid Credentials!"
            });
            return;
        }
        const response = await client.user.findFirst({
            where: {
                email: parsedData.data?.password
            }
        });
        if (!response) {
            res.json({
                message: "Invalid Email"
            });
            return;
        }
        const verifyPass = bcrypt.compare(parsedData.data.password, response?.password);
        if (!verifyPass) {
            res.json({
                message: "Invalid Credentials"
            });
            return;
        }
        const token = jwt.sign({
            userId: response.id,
            username: response.username
        }, process.env.JWT_SECRET_KEY);
        res.json({
            message: "Login Succesfully",
            token
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            message: err
        });
    }
});
app.post("/todo", middleware, async (req, res) => {
    try {
        const parsedData = contentSchema.safeParse(req.body);
        if (!parsedData) {
            res.json({
                message: "Invalid Input"
            });
            return;
        }
        const title = parsedData.data?.title || " ";
        const description = parsedData.data?.description || " ";
        const completed = parsedData.data?.completed || false;
        await client.todos.create({
            data: {
                title,
                description,
                completed,
                userId: req.userId
            }
        });
        res.json({
            message: "Todo created successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            message: err
        });
    }
});
app.get("/todo/:id", middleware, async (req, res) => {
    try {
        const data = await client.todos.findFirst({
            where: {
                userId: req.userId
            }
        });
        res.json({
            todos: data
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            message: err
        });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server started on http://localhsot:${PORT}`);
});
//# sourceMappingURL=index.js.map