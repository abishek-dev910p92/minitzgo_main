import{r as n,i as K,m as q,y as H,u as J,a as Q,j as s,F as Y,U as V,b as X,s as Z,h as ee,d as se,e as te,f as re}from"./index-B8v1Da-l.js";import{S as g,R as oe}from"./index-xg-p_p3a.js";const de=()=>{const[P,_]=n.useState(!0);n.useEffect(()=>{window.scrollTo(0,0);const e=setTimeout(()=>{_(!1)},2e3);return()=>clearTimeout(e)},[]);const I=K(),[S,L]=n.useState({}),[j,T]=n.useState([]);n.useState([]),n.useState(!1);const W=n.useContext(q),{selectedCategory:y,setSelectedCategory:b,accessoriesCategory:m,setAccessoriesCategory:ae,products:h,selectedPrice:f,setSearchQuery:R,offer:v,isNewProduct:E}=W,{search:O}=H(),k=new URLSearchParams(O);k.get("suggestion");const p=k.get("category");console.log("catagory",p),console.log("selected",y);const u=J(),w=Q(e=>e.cart),A=(e,t,o)=>{const x=o||e.product_size.split(",")[0],r=e.product_color1.split(",")[0],i={...e,product_size:x,product_color1:r};u(se(i)),u(te({message:"Product added successfully!",index:t})),setTimeout(()=>{u(re())},1e3)},D=(e,t)=>{L(o=>({...o,[e]:t}))},M=(e,t)=>{const o=S[e.id]||e.product_size.split(",")[0];A(e,t,o)},[z,$]=n.useState(Array(h.length).fill(!1)),U=(e,t)=>{const o=[...z];o[t]=!o[t],$(o),u(X(e)),u(Z({message:"Item added to wishlist!",index:t})),setTimeout(()=>{u(ee())},1e3)};if(y!==""){const e=`/category?selectedCategory=${encodeURIComponent(y)}`;I(e)}n.useEffect(()=>{R(""),b("");let e=h;console.log("selectcategory",y),p&&(p==="Other"?(e=h.filter(r=>!["Men","Women","Kids"].some(i=>Object.values(r).some(a=>typeof a=="string"&&a.includes(i)))),console.log("other",e)):p==="Offer"?(e=h.filter(r=>r.offers&&r.offers>0),console.log("offer",e)):p==="BestDeals"?(e=h.filter(r=>r.offers&&r.offers>=50),console.log("bestDels",e)):e=h.filter(r=>r.category===p)),(m==="Mens"||m==="Womens"||m==="Kids")&&(m.toLowerCase()==="mens"?(b(""),e=e.filter(r=>r.category&&r.category.toLowerCase().startsWith("men")||r.product_name&&r.product_name.toLowerCase().startsWith("men"))):m.toLowerCase()==="womens"?(b(""),e=e.filter(r=>r.category&&r.category.toLowerCase().includes("women")||r.product_name&&r.product_name.toLowerCase().includes("women"))):m.toLowerCase()==="kids"&&(e=e.filter(r=>r.category&&r.category.toLowerCase().includes("kids")||r.product_name&&r.product_name.toLowerCase().includes("kids"))));let t=[...e];if(console.log("filterd",t),f!==""&&f!=="500 +"){const[r,i]=f.split("-").map(Number),a=t.filter(l=>{const d=parseInt(l.product_price);return d>=r&&d<=i}),c=t.filter(l=>parseInt(l.product_price)>i);let C=[...a,...c];C.sort((l,d)=>parseFloat(l.product_price)-parseFloat(d.product_price));const F=t.filter(l=>{if(f!==""){const[d]=f.split("-").map(Number);return parseInt(l.product_price)<d}else return!0});F.sort((l,d)=>parseFloat(l.product_price)-parseFloat(d.product_price)),t=[...C,...F]}if(f==="500 +"){console.log("above 500");const r=t.filter(a=>parseInt(a.product_price)>=500);r.sort((a,c)=>parseFloat(c.product_price)-parseFloat(a.product_price));const i=t.filter(a=>{if(f!==""){let c=500;return console.log("ELSE MIN",c),parseInt(a.product_price)<c}else return!0});console.log("ELSE REMAINING PROD",i),i.sort((a,c)=>parseFloat(a.product_price)-parseFloat(c.product_price)),r.length>0?t=[...r,...i]:t=t}if(v!==""){const r=parseInt(v),i=t.filter(a=>parseInt(a.offers)>=r);i.sort((a,c)=>parseFloat(a.offers)-parseFloat(c.offers)),t=i}t.length===0&&(t=[...e],t.sort((r,i)=>parseFloat(r.product_price)-parseFloat(i.product_price)));const o=B(t);T(o);const x=setTimeout(()=>{_(!1)},2e3);return()=>clearTimeout(x)},[h,f,m,p]);function B(e){return e.map(t=>({value:t,sort:Math.random()})).sort((t,o)=>t.sort-o.sort).map(({value:t})=>t)}const[ie,G]=n.useState(window.innerWidth);n.useEffect(()=>{const e=()=>{G(window.innerWidth)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[]);const N=JSON.parse(localStorage.getItem("user"));return N&&(N.lat,N.log),s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsx("br",{}),s.jsxs("div",{className:"container",children:[s.jsxs("h6",{children:["|",s.jsx(Y,{className:"fs-3 p-1"}),"Find Near You"," "]}),s.jsxs("div",{className:"row",children:[s.jsx(V,{brand:"Test"}),s.jsx("div",{className:"col-md-10",children:s.jsx("div",{className:"row",children:P?Array.from({length:8}).map((e,t)=>s.jsxs("div",{className:"col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 py-2",children:[s.jsx(g,{height:200}),s.jsx(g,{height:20,width:"80%"}),s.jsx(g,{height:20,width:"60%"}),s.jsx(g,{height:20,width:"40%"}),s.jsx(g,{height:20,width:"30%"})]},t)):j.length===0?s.jsx("div",{className:"col-12 text-center py-5",children:s.jsxs("h5",{children:["MINITGO is cooming soon with the  ",p,"."]})}):j==null?void 0:j.map((e,t)=>s.jsx("div",{className:"col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 py-2",children:s.jsxs("div",{className:"product-card",children:[s.jsxs("a",{href:`/${e.pid}`,target:"_blank",style:{textDecoration:"none",color:"black"},children:[s.jsxs("div",{className:"product-image",style:{position:"relative"},children:[s.jsx("img",{src:e.product_image1,alt:"Product 1"}),s.jsx("div",{className:"offer-tag text-center p-1 text-bold mt-2",style:{position:"absolute",bottom:"15px",right:"15px",fontSize:"0.8rem",padding:"1rem",textDecorationColor:"HighlightText",border:"2px solid",borderRadius:"50px",fontWeight:"bold",backgroundColor:e.offers==="0"?"":"#e8d9b7",opacity:e.offers==="0"?0:.5},children:e.offers==="0"?"No Offer":`${e.offers}% Off`})]}),s.jsx("div",{className:"product-content d-flex flex-column gap-1 pt-3  ",children:s.jsxs("div",{style:{fontSize:"14px"},className:"d-flex justify-content-between",children:[s.jsxs("div",{style:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",justifyContent:"space-between"},children:[s.jsx("span",{className:"line-clamp-1",style:{width:"50%"},children:e.client_name}),s.jsxs("span",{children:[s.jsx(oe,{style:{marginRight:"5px"}}),s.jsx("span",{style:{color:"orange"},children:"36 min"})]})]}),s.jsx("div",{children:E(e.date)&&s.jsx("span",{className:"btn  btn-secondary p-0 px-1",style:{color:"#ffc107",fontSize:"14px"},children:"New"})})]})}),s.jsxs("div",{className:"flex-container ",children:[s.jsxs("h6",{className:"fs-9 text-start",children:[s.jsx("span",{className:"fw-semibold",children:e.product_title})," ","|",s.jsx("span",{className:"fw-bold",children:" Color:"})," ",e.product_color1," |",s.jsxs("span",{className:"fw-bold",children:[" ",e.material]})," "]}),s.jsxs("h5",{className:"mt-1 flext-item  ",children:["₹",e.product_price,s.jsx("span",{className:"text-decoration-line-through text-muted fs-6 fw-light",children:"599"}),s.jsx("span",{className:"text-muted",style:{fontSize:"13px"},children:" "})]}),s.jsxs("div",{children:[s.jsx("span",{className:" fw-bold",style:{fontSize:"12px"},children:"Available size:"})," ",e.product_size.includes(",")?s.jsx("select",{className:"px-1",style:{backgroundColor:"#d9725f",fontSize:"0.875rem",borderRadius:"5px"},onChange:o=>D(e.id,o.target.value),value:S[e.id]||e.product_size.split(",")[0],children:e.product_size.split(",").map((o,x)=>s.jsx("option",{value:o,children:o},x))}):s.jsx("span",{className:"px-1",style:{backgroundColor:"#d9725f",fontSize:"0.875rem"},children:e.product_size})]}),s.jsx("div",{children:s.jsxs("span",{className:" fw-bold",style:{fontSize:"12px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[e.product_stock<=1?"Only one left":"In stock",s.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#d9725f"}})]})})]}),w.snackbar.open&&w.snackbar.index===t&&s.jsx("div",{style:{fontSize:"12px"},className:"border text-center rounded w-75 mx-auto",children:w.snackbar.message})]}),s.jsxs("div",{className:"cart-btn px-1",children:[s.jsx("button",{onClick:()=>M(e,t),className:"btn btn-primary my-2   px-2 ",children:"Add to cart"}),s.jsx("button",{className:`btn ${z[t]?"btn-success":"btn-primary"} w-21 my-2`,onClick:()=>U(e,t),children:"❤"})]})]})},t))})})]})]}),s.jsx("br",{}),s.jsx("br",{})]})};export{de as default};
