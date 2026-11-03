import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { publicPosts } from "@/lib/premier-blog/posts";
import styles from "@/components/premier-blog/blog.module.css";
export const runtime="nodejs";export const dynamic="force-dynamic";
export const metadata:Metadata={title:"The Premier Journal | Travel & Chauffeur Insights",description:"Thoughtful perspectives on travel, service, and the journeys that matter."};
export default async function BlogPage({searchParams}:{searchParams:Promise<{after?:string}>}){
 const query=await searchParams;const {posts,next}=await publicPosts(query.after);
 return <><Navbar/><main className={styles.public}><div className={styles.publicContainer}><header className={styles.masthead}><div><p className={styles.eyebrow}>Perspectives from Premier</p><h1>The Journal.</h1></div><p>Thoughtful perspectives on travel, service, and the journeys that matter.</p></header>{posts.length?<div className={styles.grid}>{posts.map(post=><Link key={post.id} href={`/blog/${post.slug}`} className={styles.card}><img src={post.cover} alt={post.coverAlt} loading="lazy"/><p className={styles.eyebrow}>{post.category||"Premier insights"}</p><h2>{post.title}</h2><p>{post.excerpt}</p><time dateTime={post.publishedAt!}>{new Date(post.publishedAt!).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"})}</time><br/><span className={styles.readMore}>Read the story ↗</span></Link>)}</div>:<p className={styles.excerpt}>{!query.after?"Our first stories are on their way. We look forward to sharing them with you.":"No more articles on this page."}</p>}<nav aria-label="Blog pages" className={styles.pagination}>{query.after?<Link href="/blog">← Latest articles</Link>:<span/>}{next&&<Link href={`/blog?after=${encodeURIComponent(next)}`}>Older articles →</Link>}</nav></div></main><Footer/></>;
}
