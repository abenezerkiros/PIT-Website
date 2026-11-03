import { blogAuth } from "@/lib/premier-blog/firebase-admin";
import { COOKIE, SESSION_SECONDS, identity, requireEditor } from "@/lib/premier-blog/auth";
import { bodyJson, failure, HttpError, json, sameOrigin } from "@/lib/premier-blog/http";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){try{return json({user:await requireEditor()});}catch(e){return failure(e);}}
export async function POST(req:Request){try{
 sameOrigin(req);const body=await bodyJson(req,16000);
 if(typeof body.idToken!=="string")throw new HttpError(400,"Missing sign-in token.");
 let token;try{token=await blogAuth().verifyIdToken(body.idToken,true);}catch{throw new HttpError(401,"Invalid sign-in. Please try again.");}
 if(Date.now()/1000-token.auth_time>300)throw new HttpError(401,"Please sign in again.");
 const user=await identity(token);
 const cookie=await blogAuth().createSessionCookie(body.idToken,{expiresIn:SESSION_SECONDS*1000});
 const res=json({user});res.cookies.set(COOKIE,cookie,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:SESSION_SECONDS});return res;
}catch(e){return failure(e);}}
export async function DELETE(req:Request){try{sameOrigin(req);const res=json({ok:true});res.cookies.set(COOKIE,"",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:0});return res;}catch(e){return failure(e);}}
