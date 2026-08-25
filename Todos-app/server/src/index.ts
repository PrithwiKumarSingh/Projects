import express from "express"
import { registerSchema, loginSchema, contentSchema } from "./validation/zodValidatin.js";
import {prisma} from "./lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { middleware } from "./middleware/middleware.js";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors())

app.post("/register", async(req, res) => {
  try {
    const parsedData = registerSchema.safeParse(req.body);

    if(!parsedData.success){
      res.json({
        message : "Incorrect Input"
      }) 
      return;
    }

    // check user already exists or not
    const existingUser = await prisma.user.findFirst({
      where : {
        email : parsedData.data?.email
      }
    })
    
    if(existingUser){
      res.json({
        message : "Already exist user with Email"
      })
      return;
    }
    // password hash 

    const passHash = await bcrypt.hash(parsedData.data?.password, 10);
    
    // db configuration
    const response = await prisma.user.create({
      data : {
        username : parsedData.data?.username,
        email : parsedData.data?.email, 
        password : passHash
      }
    })

    console.log(response);

    const token = jwt.sign(
      {
        userId : response.id, 
        username : response.username
      },
      process.env.JWT_SECRET_KEY!
    )

     res.status(200).json({
      message : "Account created succesfully", 
      userId : response.id,
      token
    })



  } catch (err) {
    console.log(err);
    res.status(411).json({
      message : err
    })
  }
})


app.post("/login", async (req,res)=>{
  try {
    const parsedData = loginSchema.safeParse(req.body);

    if(!parsedData.success){
      res.json({
        message : "Invalid Credentials!"
      })
      return;
    }
    console.log(parsedData);

    const response = await prisma.user.findFirst({
      where : {
        email : parsedData.data?.email
      }
    })

    console.log(response);

    if(!response){
      res.json({
        message : "Invalid Email"
      })
      return;
    }

    const verifyPass = await bcrypt.compare(parsedData.data.password, response?.password);

    if(!verifyPass){
      res.json({
        message : "Invalid Credentials"
      })
      return;
    }

    const token = jwt.sign(
      {
        userId : response.id, 
        username : response.username
      },
      process.env.JWT_SECRET_KEY!
    )

    res.json({
      message : "Login Succesfully", 
      userId : response.id,
      token
    })


  } catch (err) {
    console.log(err);
    res.json({
      message : err
    })
  }
})


app.post("/todo",middleware, async(req,res)=>{
  try {
    const parsedData = contentSchema.safeParse(req.body);
    console.log(parsedData);

    if(!parsedData.success){
      res.json({
        message : "Invalid Input !"
      })
      return;
    }
    const title = parsedData.data?.title;
    const description = parsedData.data?.description;

     const todo = await prisma.todos.create({
      data : {
        title,
        description,
        userId : req.userId
      }
    })

    res.json({
      message : "Todo created successfully",
      todo
    })

    
  } catch (err) {
    console.log(err);
    res.json({
      message : err
    })
  }
})

app.get("/todo/:id",middleware, async(req,res)=>{
  try {
    const id = req.params.id as string;

    const user = await prisma.user.findUnique({
      where : {
        id 
      }
    })

    if(!user || user.id != req.userId){
      res.json({
        message : "userId is Invalid"
      })
      return;
    }

    const data = await prisma.todos.findMany({
      where : {
        userId : id
      }
    })

    console.log(data);
    
    if(data.length > 0){
      res.json({
      todos : data
    })
    return;
    }

    res.json({
      todos : "No Todos"
    })

    

    
  } catch (err) {
    console.log(err);
    res.json({
      message : err
    })
  }
})


app.patch("/todo/:id", async (req,res)=>{
  try {
    const todoId = Number(req.params.id);
    const parsedData = contentSchema.partial().safeParse(req.body);

    if(!parsedData.success){
      res.json({
        message : "Invalid Input"
      })
      return
    }

    const data = await prisma.todos.update({
      where : {
        id : todoId,
        userId : req.userId
      },
      data : parsedData.data
    })

    res.json({
      message : "Successfully Updated", 
      data
    })
  } catch (err) {
    console.log(err);
    res.json({
      message : err
    })
  }
})

app.delete("/todo/:id", middleware, async (req,res)=>{
  const id = Number(req.params.id);

  try {

    const response = await prisma.todos.delete({
      where : {
        id,
        userId : req.userId
      }
    })

    res.send(200).json({
      message : "Todo Delete Succesfully",
      response
    })
  } catch (err) {
    console.log(err);
    res.json({
      message : err
    })
  }
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
  console.log(`server started on http://localhost:${PORT}`);
})