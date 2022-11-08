import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req){
    //Token is there if user logged in
    const token = await getToken({req,secret:process.env.JWT_SECRET});

    const{pathname} = req.nextUrl
    //Allow request if true
    // A request for next-auth session & provider fetching 
    // or token exists 


    if(pathname.includes('/api/auth') || token)
    {
        //✅➡️ continue on 
        return NextResponse.next();
    }
    // Redirect if neither requirements meet and a request is for protected route 
    if(!token && pathname !== '/login')
    {
        //return NextResponse.rewrite(new URL('/login',req.nextUrl))
        return NextResponse.redirect(loginUrl)
    }

    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('from',req.nextUrl.pathname)
    
    //return NextResponse.redirect(loginUrl)
    
}

export const config={
    matcher:["/login/:path*","/index/:path*"]
}