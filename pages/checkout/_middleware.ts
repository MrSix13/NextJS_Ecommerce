import {NextFetchEvent, NextRequest, NextResponse} from 'next/server';
import { jwt } from '../../utils';

export async function middleware(req:NextRequest, ev:NextFetchEvent){

    const {token = ''} = req.cookies;
    
    try {
        await jwt.isValidToken(token);
        return NextResponse.next();
    } catch (error) {

        return NextResponse.rewrite(new URL('/auth/login', req.url))
    }
}

//?p=${requestedPage}