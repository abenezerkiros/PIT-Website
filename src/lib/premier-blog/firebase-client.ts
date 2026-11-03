"use client";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
export async function loginAuth(){
 const config={apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID};
 if(Object.values(config).some(v=>!v))throw new Error("Firebase web configuration is missing. Add the public Firebase environment variables and redeploy.");
 const app=getApps().find(a=>a.name==="premier-blog-client")||initializeApp(config,"premier-blog-client");
 const auth=getAuth(app);await setPersistence(auth,inMemoryPersistence);return auth;
}
