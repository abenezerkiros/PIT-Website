"use client";
import { useEffect, useRef, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { loginAuth } from "@/lib/premier-blog/firebase-client";
import { blankPost, slugify, type Post, type PostInput } from "@/lib/premier-blog/model";
import Editor from "./Editor";
import Article from "./Article";
import styles from "./blog.module.css";
type User={email:string;name:string};
type Summary=Omit<Post,"content">;
async function api(path:string,init?:RequestInit){
 const response=await fetch(`/api/blog/${path}`,{...init,cache:"no-store",credentials:"same-origin",headers:{...(init?.body instanceof FormData?{}:{"Content-Type":"application/json"}),...init?.headers}});
 const data=await response.json();if(!response.ok)throw new Error(data.error||"Request failed.");return data;
}
export default function BlogAdmin(){
 const [user,setUser]=useState<User|null>(null),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState("");
 const [posts,setPosts]=useState<Summary[]>([]),[current,setCurrent]=useState<Post|null>(null),[draft,setDraft]=useState<PostInput|null>(null),[dirty,setDirty]=useState(false),[preview,setPreview]=useState(false),[editorKey,setEditorKey]=useState(0),[notice,setNotice]=useState("");
 const [nextPage,setNextPage]=useState<string|null>(null);
 const [search,setSearch]=useState(""),[filter,setFilter]=useState("all");
 const [imageTarget,setImageTarget]=useState<"cover"|"content"|null>(null),[imageFile,setImageFile]=useState<File|null>(null),[imageAlt,setImageAlt]=useState("");
 const dialogRef=useRef<HTMLElement>(null);
 useEffect(()=>{if(!imageTarget)return;const previous=document.activeElement as HTMLElement|null;const node=dialogRef.current;const focusable=()=>Array.from(node?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),[tabindex="0"]')||[]);focusable()[0]?.focus();const handle=(e:KeyboardEvent)=>{if(e.key==="Escape"&&!busy){setImageTarget(null);setImageFile(null);}if(e.key==="Tab"){const items=focusable(),first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};document.addEventListener("keydown",handle);return()=>{document.removeEventListener("keydown",handle);previous?.focus();};},[imageTarget,busy]);
 const formRef=useRef<HTMLDivElement>(null);
 async function refresh(){const data=await api("posts");setPosts(data.posts);setNextPage(data.next);}
 async function loadMore(){setBusy(true);try{const data=await api(`posts?after=${encodeURIComponent(nextPage!)}`);setPosts(p=>[...p,...data.posts.filter((row:Summary)=>!p.some(existing=>existing.id===row.id))]);setNextPage(data.next);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 useEffect(()=>{let alive=true;(async()=>{try{const data=await api("session");if(!alive)return;setUser(data.user);await refresh();}catch{/* Sign-in screen is expected without a session. */}finally{if(alive)setLoading(false);}})();return()=>{alive=false;};},[]);
 useEffect(()=>{const warn=(e:BeforeUnloadEvent)=>{if(dirty){e.preventDefault();e.returnValue="";}};window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn);},[dirty]);
 async function login(){setBusy(true);setError("");try{const auth=await loginAuth();try{const provider=new GoogleAuthProvider();provider.setCustomParameters({prompt:"select_account"});const result=await signInWithPopup(auth,provider);const data=await api("session",{method:"POST",body:JSON.stringify({idToken:await result.user.getIdToken()})});setUser(data.user);await refresh();}finally{await signOut(auth);}}catch(e){setError(e instanceof Error?e.message:"Sign-in failed.");}finally{setBusy(false);}}
 async function logout(){if(dirty&&!confirm("Discard your unsaved changes and sign out?"))return;setBusy(true);try{await api("session",{method:"DELETE"});setUser(null);setDraft(null);setCurrent(null);setDirty(false);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 async function open(id?:string){if(dirty&&!confirm("Discard your unsaved changes?"))return;setBusy(true);setError("");setNotice("");try{const post=id?(await api(`posts?id=${encodeURIComponent(id)}`)).post as Post:null;setCurrent(post);setDraft(post||blankPost());setDirty(false);setPreview(false);setEditorKey(k=>k+1);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 function update(patch:Partial<PostInput>){setDraft(d=>d?{...d,...patch}:null);setDirty(true);setNotice("");}
 async function save(action:"save"|"publish"|"unpublish"|"delete"){
  if(!draft)return;if(action==="delete"&&!confirm("Permanently delete this post? Its public article will also be removed."))return;
  if(action==="unpublish"&&!confirm("Remove this article from the public website? The saved draft will remain."))return;
  setBusy(true);setError("");setNotice("");
  try{const result=await api("posts",{method:"POST",body:JSON.stringify({action,id:current?.id,version:current?.version,post:draft})});
   if(result.deleted){setCurrent(null);setDraft(null);setDirty(false);}else{setCurrent(result.post);if(action!=="unpublish"){setDraft(result.post);setDirty(false);}}
   setNotice(action==="publish"?"Published. Your article is now on the public website.":action==="unpublish"?"Unpublished. The article is no longer public.":action==="delete"?"Post deleted.":"Draft saved. Publish when you are ready to update the public website.");await refresh();
  }catch(e){setError((e as Error).message);}finally{setBusy(false);}
 }
 async function upload(){if(!imageFile)return;setBusy(true);setError("");try{const form=new FormData();form.append("file",imageFile);const {url}=await api("upload",{method:"POST",body:form});if(imageTarget==="cover")update({cover:url,coverAlt:imageAlt});else{formRef.current?.querySelector(".tiptap")?.dispatchEvent(new CustomEvent("premier-blog-image",{detail:{url,alt:imageAlt}}));}setImageTarget(null);setImageFile(null);setImageAlt("");}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 const status=(post:Summary)=>!post.publishedVersion?"Draft":post.version===post.publishedVersion?"Published":"Published · draft edits";
 const filtered=posts.filter(p=>p.title.toLowerCase().includes(search.toLowerCase())&&(filter==="all"||(filter==="published"?Boolean(p.publishedVersion):!p.publishedVersion)));
 if(loading)return <main className={styles.admin}><p className={styles.loading}>Opening Premier Journal…</p></main>;
 if(!user)return <main className={styles.login}><div className={styles.loginCard}><p className={styles.eyebrow}>Premier International Transportation</p><h1>The Journal<br/><span>Editorial desk.</span></h1><p>Write, refine, and publish stories from Premier.</p><button className={styles.primary} onClick={login} disabled={busy}>{busy?"Signing in…":"Continue with Google"}</button><p className={styles.muted}>Access for wend@pitdrives.com and abenezer@pitdrives.com.</p>{error&&<p role="alert" className={styles.error}>{error}</p>}<a href="/">Return to Premier ↗</a></div></main>;
 return <main className={styles.admin}>
  <header className={styles.adminHeader}><a href="/admin/blog" className={styles.brand}>PREMIER <span>Journal / Editorial</span></a><div><a href="/blog" target="_blank" rel="noreferrer">View journal ↗</a><span className={styles.account}>{user.email}</span><button onClick={logout} disabled={busy}>Sign out</button></div></header>
  <div className={styles.workspace}>
   <aside className={styles.sidebar}><div className={styles.sideTop}><h1>Your articles</h1><button className={styles.primary} disabled={busy} onClick={()=>open()}>+ New post</button></div><input aria-label="Search articles" placeholder="Search articles" value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label="Filter articles" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All posts</option><option value="draft">Drafts</option><option value="published">Published</option></select><p className={styles.muted}>{posts.length} loaded posts · search applies to loaded posts</p><div className={styles.postList}>{filtered.map(p=><button key={p.id} disabled={busy} className={current?.id===p.id?styles.selected:""} onClick={()=>open(p.id)}><span className={styles.eyebrow}>{status(p)}</span><strong>{p.title}</strong><small>{new Date(p.updatedAt).toLocaleDateString()}</small></button>)}{filtered.length===0&&<p className={styles.muted}>No articles here yet.</p>}</div>{nextPage&&<button disabled={busy} onClick={loadMore}>Load older posts</button>}</aside>
   <section className={styles.editArea}>
    {error&&<div role="alert" className={styles.error}>{error}</div>}{notice&&<div role="status" className={styles.notice}>{notice}</div>}
    {!draft?<div className={styles.empty}><p className={styles.eyebrow}>The Premier perspective</p><h2>A good story<br/>begins here.</h2><p>Choose an article or start a new draft.</p><button className={styles.primary} onClick={()=>open()}>Create your first draft</button></div>:<>
     <div className={styles.actions}><div><span className={styles.badge}>{current?status(current):"New draft"}</span><span className={styles.muted}>{dirty?"Unsaved changes":"Saved"}</span></div><div><button disabled={busy} onClick={()=>setPreview(!preview)}>{preview?"Back to editor":"Preview"}</button><button disabled={busy} onClick={()=>save("save")}>Save draft</button><button className={styles.primary} disabled={busy} onClick={()=>save("publish")}>{busy?"Working…":current?.publishedVersion?"Publish changes":"Publish"}</button></div></div>
     {preview?<div className={styles.preview}><p className={styles.previewLabel}>Private preview · includes unsaved changes</p><Article post={draft} date={current?.publishedAt}/></div>:<div ref={formRef} className={styles.form}>
      <fieldset disabled={busy} className={styles.fields}>
       <label>Article title<input className={styles.titleInput} maxLength={160} value={draft.title} placeholder="A story worth sharing" onChange={e=>{const title=e.target.value;update({title,...(!current&&draft.slug===slugify(draft.title)?{slug:slugify(title)}:{})});}}/></label>
       <label>Article URL <span className={styles.muted}>/blog/</span><input value={draft.slug} maxLength={100} readOnly={Boolean(current)} placeholder="your-article-title" onChange={e=>update({slug:slugify(e.target.value)})}/><small>Choose before the first save. Saved URLs stay fixed to protect article links.</small></label>
       <label>Short introduction<textarea maxLength={350} rows={3} value={draft.excerpt} placeholder="A short summary for the journal listing." onChange={e=>update({excerpt:e.target.value})}/></label>
       <div className={styles.twoCol}><label>Author<input maxLength={100} value={draft.author} onChange={e=>update({author:e.target.value})}/></label><label>Category<input maxLength={60} value={draft.category} placeholder="Travel, Premier insights…" onChange={e=>update({category:e.target.value})}/></label></div>
       <div className={styles.coverControl}><div><label>Cover image</label><p>JPEG, PNG or WebP, up to 3 MB.</p><button type="button" onClick={()=>{setImageTarget("cover");setImageAlt(draft.coverAlt);}}>{draft.cover?"Replace cover":"Upload cover"}</button></div>{draft.cover&&<img src={draft.cover} alt={draft.coverAlt}/>}</div>
       {draft.cover&&<label>Cover image description<input maxLength={250} value={draft.coverAlt} onChange={e=>update({coverAlt:e.target.value})}/></label>}
      </fieldset>
      <label>Article content</label><Editor key={editorKey} content={draft.content} disabled={busy} onChange={content=>update({content})} onImage={()=>{setImageTarget("content");setImageAlt("");}}/>
      <details className={styles.seo}><summary>Search appearance</summary><label>SEO title <small>Optional · up to 70 characters</small><input disabled={busy} maxLength={70} value={draft.seoTitle} onChange={e=>update({seoTitle:e.target.value})}/></label><label>SEO description <small>Optional · up to 180 characters</small><textarea disabled={busy} maxLength={180} value={draft.seoDescription} onChange={e=>update({seoDescription:e.target.value})}/></label></details>
      {current&&<div className={styles.postOptions}>{current.publishedVersion&&<><a href={`/blog/${current.slug}`} target="_blank" rel="noreferrer">View published article ↗</a><button disabled={busy} onClick={()=>save("unpublish")}>Unpublish</button></>}<button disabled={busy} className={styles.danger} onClick={()=>save("delete")}>Delete post</button><small>Last saved by {current.updatedBy}</small></div>}
     </div>}
    </>}
   </section>
  </div>
  {imageTarget&&<div className={styles.modalBackdrop}><section ref={dialogRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="upload-title"><h2 id="upload-title">Add an image</h2><label>Image file<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={e=>setImageFile(e.target.files?.[0]||null)}/></label><label>Describe the image<input autoFocus maxLength={250} disabled={busy} value={imageAlt} onChange={e=>setImageAlt(e.target.value)} placeholder="For readers who cannot see the image"/></label><p className={styles.muted}>Up to 3 MB. Images are resized and converted to WebP (350 KB optimized limit).</p>{error&&<p role="alert" className={styles.error}>{error}</p>}<div className={styles.actions}><button disabled={busy} onClick={()=>{setImageTarget(null);setImageFile(null);}}>Cancel</button><button className={styles.primary} disabled={busy||!imageFile||!imageAlt.trim()} onClick={upload}>{busy?"Uploading…":"Add image"}</button></div></section></div>}
 </main>;
}
