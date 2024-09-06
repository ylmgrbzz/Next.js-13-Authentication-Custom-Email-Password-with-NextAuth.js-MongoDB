import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      status: "success",
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}
