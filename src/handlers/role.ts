import express, { Request, Response } from "express";
import { Role, Roles } from "../models/role";
// import jwt from "jsonwebtoken";
const role = new Roles();

const getAllRoles = async (req: Request, res: Response) => {
  const roles = await role.index();
  res.json(roles);
};
const showRoleById = async (req: Request, res: Response) => {
  try {
    // jwt.verify(req.headers.authorization?.split(" ")[1], process.env.JWT!);
  } catch (err) {
    res.status(401);
    res.json({ message: "Invalid token" });
    return;
  }
  const roleById = await role.showRoleById(req.params.id);
  res.json(roleById);
};
const updateRoleById = async (req: Request, res: Response) => {
  try {
    const updateRole: Role = {
      role_name: req.body.role_name,
    };
    try {
      //   jwt.verify(req.headers.authorization?.split(" ")[1], process.env.JWT!);
    } catch (err) {
      res.status(401);
      res.json({ message: "Invalid token" });
      return;
    }
    const updatedRole = await role.updateRoleById(updateRole, req.params.id);
    res.json(updatedRole);
  } catch (err) {
    res.json({ message: `Could not update Role ${err} ` });
  }
};
const createRole = async (req: Request, res: Response) => {
  try {
    // Create the new role object without the id (since it's auto-generated by the database)
    const newRole: Role = {
      role_name: req.body.role_name,
    };

    // Token verification
    try {
      //   jwt.verify(req.headers.authorization?.split(" ")[1], process.env.JWT!);
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Call the method to create the role
    const createdRole = await role.createRole(newRole);
    res.json(createdRole); // Return the created role data, including the generated id
  } catch (err) {
    res.status(500).json({ message: `Could not create Role: ${err}` });
  }
};
const deleteRoleById = async (req: Request, res: Response) => {
  try {
    // Call the delete method from the model and store the result
    const deleted = await role.deleteRoleById(req.params.id);

    // Check if the deletion was successful
    if (deleted) {
      res.json({
        message: `Role with ID ${req.params.id} has been deleted successfully.`,
      });
    } else {
      // If the deletion wasn't successful (e.g., role not found)
      res.status(404).json({
        message: `Role with ID ${req.params.id} not found.`,
      });
    }
  } catch (err) {
    // Catch any errors and return a 500 error with the message
    res.status(500).json({
      message: `Could not delete Role: ${err}`,
    });
  }
};

const rolesRoutes = (app: express.Application) => {
  app.get("/roles", getAllRoles);
  app.get("/roles/:id", showRoleById);
  app.put("/roles/:id", updateRoleById);
  app.post("/roles", createRole);
  app.delete("/roles/:id", deleteRoleById);
};

export default rolesRoutes;
