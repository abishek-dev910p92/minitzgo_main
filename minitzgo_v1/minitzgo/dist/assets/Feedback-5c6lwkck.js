import{r as l,i as b,j as e,v as f,K as h}from"./index-B8v1Da-l.js";function g(){l.useEffect(()=>{window.scrollTo(0,0)},[]);const i=localStorage.getItem("user"),c=JSON.parse(i);console.log("parsedSignInData",c);const d=b(),[r,m]=l.useState({from:c.email,to:"raghabm7@gmail.com",subject:"Feedback from user",text:""}),u=a=>{const{name:s,value:o}=a.target;m({...r,[s]:o})},x=async a=>{a.preventDefault();const s=document.querySelector('input[name="flexRadioDefault"]:checked').nextSibling.textContent.trim(),o=document.getElementById("feedbackText").value,n={...r,text:`${s}

${o}`};console.log(n);try{const t=await f.post("http://localhost:3001/send-email",n);console.log(t.status),t.status===200&&h.success("Message successfully sent",{autoClose:1e3,hideProgressBar:!0,onClose:()=>{d("/")}})}catch(t){alert("Error submitting feedback: "+t.message)}};return e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("br",{}),e.jsx("br",{className:"d-md-block d-none"}),e.jsx("div",{className:"container py-2 mb-4",style:{marginTop:"4vh"},children:e.jsx("div",{className:"row justify-content-center",children:e.jsxs("div",{className:"col-md-6 shadow py-4 border rounded",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("i",{className:"far fa-file-alt text-primary fs-2 mb-2"}),e.jsx("p",{children:e.jsx("strong",{className:"fs-3",children:"Your opinion matters"})}),e.jsxs("p",{children:["Have some ideas on how to improve our product? ",e.jsx("strong",{className:"d-block",children:"Give us your feedback."})]})]}),e.jsx("hr",{}),e.jsxs("form",{className:"px-md-4",onSubmit:x,children:[e.jsx("p",{className:"text-start",children:e.jsx("strong",{children:"Your rating:"})}),e.jsx("div",{className:"d-flex justify-content-between mb-3",children:["Very good","Good","Mediocre","Bad"].map((a,s)=>e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"radio",name:"flexRadioDefault",id:`flexRadioDefault${s+1}`,className:"form-check-input",defaultChecked:s===0}),e.jsx("label",{htmlFor:`flexRadioDefault${s+1}`,className:"form-check-label",children:a})]},s))}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"feedbackText",className:"form-label",children:e.jsx("strong",{children:"Your feedback:"})}),e.jsx("textarea",{className:"form-control",id:"feedbackText",name:"text",rows:"4",value:r.text,onChange:u,required:!0})]}),e.jsx("button",{className:"btn btn-primary btn-lg rounded-pill",type:"submit",children:"Submit"})]})]})})}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("br",{})]})}export{g as default};
