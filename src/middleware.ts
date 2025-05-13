 //nextjs middleware

import { NextRequest } from "next/server";

 export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

 }

 export const config = {
    matcher: "/",
 }