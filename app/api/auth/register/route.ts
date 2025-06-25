import { NextResponse, NextRequest } from "next/server";
import { ConnectionwithDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // npm i bcryptjs

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    await ConnectionwithDatabase();

    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { error: "User already exists. Please login." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Account registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Account registration failed. Try again." },
      { status: 500 }
    );
  }
}
