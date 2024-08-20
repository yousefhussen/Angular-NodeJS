import * as express from "express";
import { ObjectId } from "mongodb";
import { Admin } from "../Schemas/admin-navbar.schema";
import { writeImageToDisk } from "../helpers/image.helper";

export const AdminRouter = express.Router();

AdminRouter.use(express.json());

AdminRouter.use(express.urlencoded({ extended: true }));

AdminRouter.get("/", async (_req, res) => {
    try {
        const Admins = await Admin?.find({});
        res.status(200).send(Admins);
    } catch (error) {
        
    }

})

AdminRouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = new Admin({ username, password });
        const result = await admin.save();
        console.log(result);
        if (result) {
            res.status(200).send(result);
        } else {
            console.log("Failed to create an Admin");
            res.status(400).send("Failed to create an Admin");
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})  



