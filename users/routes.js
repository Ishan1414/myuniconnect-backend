import bcrypt from 'bcrypt';
import { generateToken, verifyToken, jwtDecode } from "../Jwt.js"
import * as dao from "./dao.js";

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export default function UserRoutes(app) {
    app.get("/api/users/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const user = await dao.findUserById(id);
            delete user.password;
            res.json(user);
        } catch (e) {
            res.status(400).send('invalid userid');
        }
    });

    app.put("/api/users/:id", verifyToken, async (req, res) => {
        const id = req.params.id;
        const user = req.body;
        if (!isValidEmail(user.email)) {
          res.status(400).send('invalid email');
          return;
        }
        const existingUser = await dao.findUserById(id);
        if (existingUser && existingUser._id != id) {
          res.status(400).send("Username already taken");
          return;
        }
        try {
          await dao.updateUser(id, user);
          const updatedUser = await dao.findUserById(id);
          const token = generateToken(updatedUser);
          res.status(200).send({ token });
        } catch (e) {
          res.status(400).send("error in updating user, try again")
        }
      });
}