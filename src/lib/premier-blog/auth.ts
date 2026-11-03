import "server-only";
import { cookies } from "next/headers";
import { blogAuth } from "./firebase-admin";
import { allowedIdentity } from "./model";
import { HttpError } from "./http";
export const COOKIE=process.env.NODE_ENV==="production"?"__Host-premier_blog":"premier_blog";
export const SESSION_SECONDS=60*60*8;
export async function identity(token:{uid:string;email?:string;email_verified?:boolean;firebase?:{sign_in_provider?:string}}){
 if(!allowedIdentity(token.email,token.email_verified,token.firebase?.sign_in_provider))throw new HttpError(403,"This account does not have blog access.");
 const user=await blogAuth().getUser(token.uid);
 if(user.disabled||!user.emailVerified||user.email?.toLowerCase()!==token.email?.toLowerCase())throw new HttpError(403,"This account does not have blog access.");
 return {uid:token.uid,email:token.email!.toLowerCase(),name:user.displayName||token.email!};
}
export async function requireEditor(){
 const session=(await cookies()).get(COOKIE)?.value;
 if(!session)throw new HttpError(401,"Please sign in.");
 try{return await identity(await blogAuth().verifySessionCookie(session,true));}
 catch(e){if(e instanceof HttpError)throw e;throw new HttpError(401,"Your session has expired. Please sign in again.");}
}
