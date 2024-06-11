"use server";
import { connectToDB } from "@/models/connection";
import { UserModel } from "@/models/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (data: FormData) => {
  try {
    // connect to db
    connectToDB();
    const { email, password } = Object.fromEntries(data);
    // check if there is a user
    const user = await UserModel.findOne({ email });
    if (!user.email) {
      throw new Error("user not found");
    }
    // check if password is correct
    const isPasswordValid = await bcryptjs.compare(
      password as string,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("password not valid");
    }
    // create a jwt
    const tokenData = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    cookies().set("token", token, { httpOnly: true });
    console.log("login successfully");
  } catch (error: any) {
    throw new Error("could'nt login a user");
  }
  redirect("/");
};
export const logout = async () => {
  try {
    // remove the token from the cookies
    cookies().set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    console.log("logged out successfully");
  } catch (error: any) {
    throw new Error("could'nt logout a user");
  }
  redirect("/login");
};
export const signUp = async (data: FormData) => {
  try {
    // connect to db
    connectToDB();
    const { username, email, password } = Object.fromEntries(data);
    const user = await UserModel.findOne({ email });
    // check if the user is already exist in the db
    if (user) {
      throw new Error("user is already exist");
    }
    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password as string, salt);
    // create a new user
    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
  } catch (error: any) {
    throw new Error("could'nt sign in a user");
  }
  redirect("/login");
};
