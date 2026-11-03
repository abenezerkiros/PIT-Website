"use client";
export default function BlogError({reset}:{reset:()=>void}){return <main style={{padding:"80px 24px",textAlign:"center",background:"#f7f5ef",color:"#252720"}}><h1>The journal is temporarily unavailable.</h1><p>Please try again in a moment.</p><button onClick={reset}>Try again</button><p><a href="/">Return to Premier</a></p></main>;}
