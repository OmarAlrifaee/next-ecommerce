"use server";
import { connectToDB } from "@/models/connection";
import { UserModel } from "@/models/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserType } from "@/types";
import itemsPerPage from "@/helper/itemPerPage";
import { revalidatePath } from "next/cache";
import { CartModel } from "@/models/cart";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";

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
    // make a cart for every new user
    const userCart = new CartModel({ userId: savedUser?.id });
    await userCart.save();
  } catch (error: any) {
    throw new Error("could'nt sign in a user");
  }
  redirect("/login");
};
export const getCurrentUser = async () => {
  // check if there is a user loggedin
  const isLoggedIn = isUserLoggedIn();
  if (!isLoggedIn) redirect("/login");
  try {
    const token = cookies().get("token")?.value;
    const decoded: any = jwt.verify(token!, process.env.TOKEN_SECRET!);
    const currentUser = await UserModel.findById<UserType>(decoded?.id);
    return currentUser;
  } catch (error) {
    throw new Error("could'nt get current user");
  }
};
export const getAllUsers = async (search: string = "", page: string = "1") => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");
    const count = await UserModel.find({
      username: { $regex: regex },
    }).countDocuments();
    const users = await UserModel.find<UserType>({
      username: { $regex: regex },
    })
      .limit(itemsPerPage) // make a limit for the users
      .skip(itemsPerPage * (parseInt(page) - 1)); // for example 2 * 0 so i wont skip any users but if its page 2 ill skip the first tow and show the second tow
    return { users, count };
  } catch (error) {
    throw new Error("faild to fetch all users");
  }
};
export const deleteUser = async (id: string) => {
  try {
    connectToDB();
    // delete the user cart too
    await CartModel.deleteOne({ userId: id });
    await UserModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("could'nt delete a user");
  }
  revalidatePath("/dashboard/users");
};
export const addUser = async (data: FormData) => {
  try {
    connectToDB();
    const userData = Object.fromEntries(data);
    const oldUser = await UserModel.findOne({ email: userData.email });
    if (oldUser) throw new Error("product already exist");
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(
      userData?.password as string,
      salt
    );
    const newUser = new UserModel({
      ...userData,
      password: hashedPassword,
      isAdmin: userData.isAdmin === "on" ? true : false,
    });
    const savedUser = await newUser.save();
    // make a cart for every new user
    const userCart = new CartModel({ userId: savedUser?.id });
    await userCart.save();
  } catch (error) {
    throw new Error("could'nt add a new user");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};
export const getOneUser = async (id: string) => {
  try {
    connectToDB();
    const user = await UserModel.findById<UserType>(id);
    return user;
  } catch (error) {
    throw new Error("could'nt find a user");
  }
};
export const updateUser = async (data: FormData, id: string) => {
  try {
    connectToDB();
  } catch (error: any) {
    throw new Error(error?.message);
  }
  const userData = Object.fromEntries(data);
  if (!userData) throw Error;
  // remove any key with an empty value or undifined
  // to prevent assign it to the database as an undifined faild
  Object.keys(userData).map(
    (key) =>
      (userData[key] === "" || userData[key] === undefined) &&
      delete userData[key]
  );
  const updatedUser = await UserModel.findByIdAndUpdate<UserType>(
    id,
    {
      ...userData,
      isAdmin: userData.isAdmin === "on" ? true : false,
    },
    { new: true }
  );
  if (!updateUser) throw Error;
  // get the current user to see if the admin is editing his account
  const currentUser = await getCurrentUser();
  if (currentUser?.id === updatedUser?.id) {
    await logout();
  } else {
    redirect("/dashboard/users");
  }
};
// export const updateUser = async (data: FormData, id: string) => {
//   try {
//     connectToDB();
//     const userData = Object.fromEntries(data);
//     // remove any key with an empty value or undifined
//     // to prevent assign it to the database as an undifined faild
//     Object.keys(userData).map(
//       (key) =>
//         (userData[key] === "" || userData[key] === undefined) &&
//         delete userData[key]
//     );
//     const updatedUser = await UserModel.findByIdAndUpdate<UserType>(
//       id,
//       {
//         ...userData,
//         isAdmin: userData.isAdmin === "on" ? true : false,
//       },
//       { new: true }
//     );
//     // get the current user to see if the admin is editing his account
//     const currentUser = await getCurrentUser();
//     if (currentUser?.id === updatedUser?.id) {
//       await logout();
//       return;
//     }
//     // else {
//     //   here i should do this
//     //   redirect("/dashboard/users");
//     //   but for some reason the fucking redirect method from nextjs does'nt work in a try catch block
//     // }
//   } catch (error) {
//     throw new Error("could'nt update a user");
//   }
//   redirect("/dashboard/users");
// };
