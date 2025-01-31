import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function middleware(req: NextRequest) {
  // Ambil token dari header Authorization
  const token = req.headers.get("Authorization")?.split(" ")[1]; // 'Bearer <token>'

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url)); // Jika tidak ada token, redirect ke login
  }

  try {
    const jwtSecret = process.env.JWT;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Verifikasi JWT token dan cek apakah kadaluarsa
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik

    if (decoded.exp && decoded.exp < currentTime) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect jika token kedaluwarsa
    }

    // Jika token valid dan tidak kedaluwarsa, lanjutkan ke request berikutnya
    return NextResponse.next();
  } catch (error) {
    // Jika verifikasi token gagal (misalnya token tidak valid)
    console.error(error); // Log error untuk debugging
    return NextResponse.redirect(new URL("/", req.url)); // Redirect ke halaman login
  }
}

export const config = {
  matcher: ["/crm/:path*"], // atau yang sesuai dengan struktur routing Anda
};
