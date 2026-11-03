import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Article from "@/components/premier-blog/Article";
import { publicPost } from "@/lib/premier-blog/posts";
import styles from "@/components/premier-blog/blog.module.css";
export const runtime="nodejs";export const dynamic="force-dynamic";
const readPost=cache(publicPost);
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const post=await readPost((await params).slug);if(!post)return {title:"Article not found"};
 const origin=process.env.NEXT_PUBLIC_SITE_URL;
 const canonical=origin?new URL(`/blog/${post.slug}`,origin).toString():undefined;
 return {title:post.seoTitle||post.title,description:post.seoDescription||post.excerpt,alternates:canonical?{canonical}:undefined,openGraph:{type:"article",title:post.seoTitle||post.title,description:post.seoDescription||post.excerpt,publishedTime:post.publishedAt!,modifiedTime:post.updatedAt,authors:[post.author],images:origin?[{url:new URL(post.cover,origin).toString(),alt:post.coverAlt}]:undefined}};
}
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
 const post=await readPost((await params).slug);if(!post)notFound();
 return <><Navbar/><main className={styles.public}><div className={styles.publicContainer} style={{paddingBottom:0,paddingTop:25}}><Link href="/blog" className={styles.back}>← Back to the journal</Link></div><Article post={post} date={post.publishedAt}/><section className={styles.publicCta}><h2>Every journey begins with a conversation.</h2><a href="/#contact">Speak with our Client Experience Team ↗</a></section></main><Footer/></>;
}
