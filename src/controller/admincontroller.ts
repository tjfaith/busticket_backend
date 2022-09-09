import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { AdminInstance } from "../model/admin";
import bcrypt from "bcryptjs";
import {
  options,
  loginSchema,
  generateToken,
  registerSchema,
  updateAdminSchema,
  imageLoginSchema,
} from "../utils/utils";

export async function RegisterAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = registerSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);

    if(await AdminInstance.findOne({where:{email:req.body.email}})){
      return res.status(409).json({
         message:"Email already Exist"
      })
     }

    const record = await AdminInstance.create({
      id: id,
      email: req.body.email,
      password: passwordHash,
      fullname: req.body.fullname,
      phone: req.body.phone,
      image: req.body.image,
      face_id: req.body.face_id,
    });
    return res.status(200).json({
      message: "registered successfully",
      record,
    });
  } catch (err) {
    console.log('@48',err);
    res.status(500).json({
      msg: "failed to register",
      route: "/register",
    });
  }
}

export async function ImageLoginAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const id = uuidv4();
  try {
    const validationResult = imageLoginSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const User = (await AdminInstance.findOne({
      where: { face_id: req.body.face_id },
    })) as unknown as { [key: string]: string };

    const { id } = User;
    const token = generateToken({ id });

    
    // const validUser = await bcrypt.compare(req.body.password, User.password);

    if (!User) {
     return  res.status(401).json({
        message: "Email do not match",
      });
    }

    if (User) {
      return res.status(200).json({ message: "Login successful", token, User:{id:User.id,email: User.email, phone:User.phone, image:User.image, face_id:User.face_id, fullname:User.fullname, } });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: "failed to login",
      route: "/login",
    });
  }
}


export async function LoginAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const id = uuidv4();
  try {
    const validationResult = loginSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const User = (await AdminInstance.findOne({
      where: { email: req.body.email }
    })) as unknown as { [key: string]: string };

    if(!User){
      return res.status(401).json({
        message: "Incorrect Email or password",
      });
    }

    const { id } = User;
    const token = generateToken({ id });

    
    const validUser = await bcrypt.compare(req.body.password, User.password);

    if (!validUser) {
     return  res.status(401).json({
        message: "Incorrect Email or password",
      });
    }

    if (validUser) {
      return res.status(200).json({ message: "Login successful", token, User:{id:User.id,email: User.email, phone:User.phone, image:User.image, face_id:User.face_id, fullname:User.fullname, } });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: "failed to login",
      route: "/login",
    });
  }
}

export async function updateAdmin(req: Request, res: Response) {
  // res.json({ message: 'Hello User' });
  try {
    const { id } = req.params;
    const { email, password, fullname, phone, image, face_id } = req.body;
    const validateUpdate = updateAdminSchema.validate(req.body, options);
    if (validateUpdate.error) {
      return res
        .status(400)
        .json({ Error: validateUpdate.error.details[0].message });
    }
    const record = await AdminInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(400).json({
        Error: "Cannot find admin",
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);

    const updatedAdmin = await record.update({
      email,
      password:passwordHash,
      fullname,
      phone,
      image,
      face_id,
    });
    return res.status(200).json({
      message: "You have successfully updated admin",
      record: updatedAdmin,
    });
  } catch (err) {
    return res.status(500).json({
      message: "failed to update admin",
      route: "/update/:id",
    });
  }
}

export async function deleteAdmin(req: Request, res: Response) {
  // res.json({ message: 'Hello User' });
  try {
    const { id } = req.params;
    const record = await AdminInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(400).json({
        message: "cannot find user",
      });
    }
    const deletedRecord = await record.destroy();
    return res.status(200).json({
      message: "Admin deleted successfully",
      deletedRecord,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to delete admin",
      route: "/delete/:id",
    });
  }
}


export async function checkEmail(req: Request, res: Response) {
  // res.json({ message: 'Hello User' });
  try {
    const { email } = req.params;
    const record = await AdminInstance.findOne({ where: { email } });
    if (!record) {
      return res.status(400).json({
        message: "record not found",
      });
    }
    
    return res.status(200).json({
      message: "record found",
      // record,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to fetch data",
      route: "/email/:email",
    });
  }
}


export async function getAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await TodoInstance.findAll({where: {},limit, offset})
    const record = await AdminInstance.findAndCountAll({
      limit,
      offset,
    });
    return res.status(200).json({
      msg: "You have successfully fetched all admins",
      count: record.count - 1,
      record: record.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/allAdmins",
    });
  }
}

export async function getSingleAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    //   const limit = req.query?.limit as number | undefined;
    //   const offset = req.query?.offset as number | undefined;
    //  const record = await TodoInstance.findAll({where: {},limit, offset})
    const record = await AdminInstance.findOne({
      where: { id },
    });
    return res.status(200).json({
      msg: "You have successfully fetched this admin",
      record,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "failed to fetch this admin",
      route: "/singleAdmin",
    });
  }
}
