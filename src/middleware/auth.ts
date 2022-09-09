import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AdminInstance } from "../model/admin";


// verify token
export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerHeader = req["headers"]["authorization"];
    if (!bearerHeader) {
      return res.status(404).json({ Error: "Admin  not verified" });
    }
    // const token = bearerHeader?.slice(7, bearerHeader.length) as string;
    const token = bearerHeader?.split(' ')[1];

 
    let verified = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!verified) {
      return res.status(403).json({ Error: "Unauthorized user" });
    }
 
    const { id } = verified as Record<string, string>;

    const admin = await AdminInstance.findOne({ where: { id } });

    if (!admin) {
      return res.status(403).json({ Error: "Author not verified" });
    }

    req.adminId = id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ Error: "An error courred" });
  }
}
