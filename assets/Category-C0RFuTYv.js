import{r as m,i as W,m as L,u as A,a as B,j as t,F as D,U as $,d as G,e as U,f as Y}from"./index-B8v1Da-l.js";const J=()=>{m.useEffect(()=>{window.scrollTo(0,0)},[]);const _=W(),[y,j]=m.useState([]);m.useState(!1);const C=m.useContext(L),{selectedCategory:u,setSelectedCategory:v,accessoriesCategory:F,setAccessoriesCategory:I,products:x,selectedPrice:n,setSearchQuery:S,offer:h,isNewProduct:z}=C,g=A(),k=(e,l)=>{const a=e.product_size.split(","),r=e.product_color1.split(","),s={...e,product_size:a[0],product_color1:r[0]};g(G(s)),g(U({message:"Product added successfully!",index:l})),setTimeout(()=>{g(Y())},1e3)},P=B(e=>e.cart);if(F!==""){const e=`/accessories?selectedCategory=${encodeURIComponent(F)}`;_(e)}const[w,E]=m.useState(Array(x.length).fill(!1)),R=(e,l)=>{const a=[...w];a[l]=!a[l],E(a),g(addItemToWishlist(e)),g(showSnackbarForWishlist({message:"Item added to wishlist!",index:l})),setTimeout(()=>{g(hideSnackbarForWishlist())},1e3)};m.useEffect(()=>{if(u!==""){const e=`/category?selectedCategory=${encodeURIComponent(u)}`;_(e)}},[u,_]),m.useEffect(()=>{S(""),I("");let e=x;if(u!==""&&u!=="AllCategory"){console.log("CATEGORY",u),v(u);const l=u.toLowerCase(),a=x.filter(r=>r.category.toLowerCase()===l);if(a.length>0){e=a;let r=[...e];if(n!==""&&n!=="500 +"){const[s,i]=n.split("-").map(Number),c=r.filter(p=>{const d=parseInt(p.product_price);return d>=s&&d<=i}),o=r.filter(p=>parseInt(p.product_price)>i);let f=[...c,...o];f.sort((p,d)=>parseFloat(p.product_price)-parseFloat(d.product_price));const b=e.filter(p=>{if(n!==""){const[d]=n.split("-").map(Number);return parseInt(p.product_price)<d}else return!0});b.sort((p,d)=>parseFloat(p.product_price)-parseFloat(d.product_price)),r=[...f,...b]}if(n==="500 +"){console.log("Before",r),console.log("above 500");const s=r.filter(c=>parseInt(c.product_price)>=500);s.sort((c,o)=>parseFloat(o.product_price)-parseFloat(c.product_price));const i=e.filter(c=>n!==""?parseInt(c.product_price)<500:!0);i.sort((c,o)=>parseFloat(c.product_price)-parseFloat(o.product_price)),r=[...s,...i]}if(h!==""){const s=parseInt(h),i=r.filter(c=>parseInt(c.offers)>=s);i.sort((c,o)=>parseFloat(c.offers)-parseFloat(o.offers)),r=i}r.length===0&&(r=[...e],r.sort((s,i)=>parseFloat(s.product_price)-parseFloat(i.product_price))),j(r)}else{e=x;let r=[...e];if(n!==""&&n!=="500 +"){const[s,i]=n.split("-").map(Number),c=r.filter(p=>{const d=parseInt(p.product_price);return d>=s&&d<=i}),o=r.filter(p=>parseInt(p.product_price)>i);let f=[...c,...o];f.sort((p,d)=>parseFloat(p.product_price)-parseFloat(d.product_price));const b=e.filter(p=>{if(n!==""){const[d]=n.split("-").map(Number);return parseInt(p.product_price)<d}else return!0});b.sort((p,d)=>parseFloat(p.product_price)-parseFloat(d.product_price)),r=[...f,...b]}if(n==="500 +"){console.log("above 500");const s=r.filter(c=>parseInt(c.product_price)>=500);s.sort((c,o)=>parseFloat(o.product_price)-parseFloat(c.product_price));const i=e.filter(c=>n!==""?parseInt(c.product_price)<500:!0);i.sort((c,o)=>parseFloat(c.product_price)-parseFloat(o.product_price)),r=[...s,...i]}if(h!==""){const s=parseInt(h),i=r.filter(c=>parseInt(c.offers)>=s);i.sort((c,o)=>parseFloat(c.offers)-parseFloat(o.offers)),r=i}r.length===0&&(r=[...e],console.log("length :",r),r.sort((s,i)=>parseFloat(s.product_price)-parseFloat(i.product_price))),j(r)}}else{if(console.log("ELSE CATEGORY:",u),e=x,n!==""&&n!=="500 +"){const[l,a]=n.split("-").map(Number),r=e.filter(o=>{const f=parseInt(o.product_price);return f>=l&&f<=a}),s=e.filter(o=>parseInt(o.product_price)>a);let i=[...r,...s];i.sort((o,f)=>parseFloat(o.product_price)-parseFloat(f.product_price));const c=e.filter(o=>{if(n!==""){const[f]=n.split("-").map(Number);return parseInt(o.product_price)<f}else return!0});c.sort((o,f)=>parseFloat(o.product_price)-parseFloat(f.product_price)),e=[...i,...c]}if(n==="500 +"){console.log("above 500");const l=e.filter(r=>parseInt(r.product_price)>=500);l.sort((r,s)=>parseFloat(s.product_price)-parseFloat(r.product_price));const a=e.filter(r=>{if(n!==""){let s=500;return console.log("ELSE MIN",s),parseInt(r.product_price)<s}else return!0});console.log("ELSE REMAINING PROD",a),a.sort((r,s)=>parseFloat(r.product_price)-parseFloat(s.product_price)),e=[...l,...a]}if(h!==""){const l=parseInt(h),a=e.filter(r=>parseInt(r.offers)>=l);a.sort((r,s)=>parseFloat(r.offers)-parseFloat(s.offers)),a.length===0?(console.log("LENGTH 0",e),e=e):e=a}j(e)}},[u,n,x,h]);const[H,O]=m.useState(window.innerWidth);m.useEffect(()=>{const e=()=>{O(window.innerWidth)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[]);const N=JSON.parse(localStorage.getItem("user"));return N&&(N.lat,N.log),t.jsxs(t.Fragment,{children:[t.jsx("br",{}),t.jsx("br",{}),t.jsxs("div",{className:"container",children:[t.jsxs("h6",{children:["|",t.jsx(D,{className:"fs-3 p-1"}),"Find Near You"," "]}),t.jsxs("div",{className:"row",children:[t.jsx($,{brand:"Test"}),t.jsx("div",{className:"col-md-10",children:t.jsx("div",{className:"row ",children:y==null?void 0:y.map((e,l)=>t.jsx("div",{className:"col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 py-2 ",children:t.jsxs("div",{className:"product-card ",children:[t.jsxs("a",{href:`/${e.product_id}`,target:"_blank",style:{textDecoration:"none",color:"black"},children:[t.jsxs("div",{className:"product-image",style:{position:"relative"},children:[t.jsx("img",{src:e.product_image1,alt:"Product 1"}),t.jsx("div",{className:"offer-tag text-center p-1 text-bold mt-2",style:{position:"absolute",bottom:"15px",right:"15px",fontSize:"0.8rem",padding:"1rem",textDecorationColor:"HighlightText",border:"2px solid",borderRadius:"50px",fontWeight:"bold",backgroundColor:e.offers==="0"?"":"#e8d9b7",opacity:e.offers==="0"?0:.5},children:e.offers==="0"?"No Offer":`${e.offers}% Off`})]}),t.jsxs("div",{className:"product-content d-flex flex-column gap-1 pt-3  px-2",children:[t.jsxs("div",{style:{fontSize:"14px"},className:"d-flex justify-content-between",children:[t.jsx("span",{children:e.category}),t.jsx("div",{children:z(e.date)&&t.jsx("span",{className:"btn  btn-secondary p-0 px-1",style:{color:"#ffc107",fontSize:"14px"},children:"New"})})]}),t.jsxs("div",{className:"flex-container ",children:[t.jsxs("h6",{className:"fs-9 text-start",children:[t.jsx("span",{className:"fw-semibold",children:e.product_title})," ","|",t.jsx("span",{className:"fw-bold",children:" Color:"})," ",e.product_color1," |",t.jsxs("span",{className:"fw-bold",children:[" ",e.material]})," "]}),t.jsxs("h5",{className:"mt-1 flext-item  ",children:["₹",e.product_price,t.jsx("span",{className:"text-decoration-line-through text-muted fs-6 fw-light",children:"599"}),t.jsx("span",{className:"text-muted",style:{fontSize:"13px"},children:" "})]}),t.jsxs("div",{children:[t.jsx("span",{className:" fw-bold",style:{fontSize:"12px"},children:"Available size:"})," ",e.product_size.includes(",")?t.jsx("select",{className:"px-1",style:{backgroundColor:"#d9725f",fontSize:"0.875rem",borderRadius:"5px"},onChange:a=>handleSizeChange(e.id,a.target.value),value:selectedSizes[e.id]||e.product_size.split(",")[0],children:e.product_size.split(",").map((a,r)=>t.jsx("option",{value:a,children:a},r))}):t.jsx("span",{className:"px-1",style:{backgroundColor:"#d9725f",fontSize:"0.875rem"},children:e.product_size})]}),t.jsx("div",{children:t.jsxs("span",{className:" fw-bold",style:{fontSize:"12px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[e.product_stock<=1?"Only one left":"In stock",t.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#d9725f"}})]})})]}),P.snackbar.open&&P.snackbar.index===l&&t.jsx("div",{style:{fontSize:"12px"},className:"border text-center rounded w-75 mx-auto",children:P.snackbar.message})]})]}),t.jsxs("div",{className:"cart-btn px-1",children:[t.jsx("button",{onClick:()=>k(e,l),className:"btn btn-primary my-2  ms-2 px-2 ",children:"Add to cart"}),t.jsx("button",{className:`btn ${w[l]?"btn-success":"btn-primary"} w-21 my-2`,onClick:()=>R(e,l),children:"❤"})]})]})},l))})})]})]})]})};export{J as default};
