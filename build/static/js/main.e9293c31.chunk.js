(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t(1),a=t.n(o),c=t(14),u=t.n(c),i=(t(20),t(3)),s=function(e){var n=e.person,t=e.deleteHandler;return Object(r.jsxs)("div",{children:[n.name," ",n.number," ",Object(r.jsx)("button",{onClick:t,children:"delete"})]})},l=function(e){var n=e.name,t=e.num,o=e.nameHandler,a=e.numHandler,c=e.personHandler;return Object(r.jsxs)("form",{onSubmit:c,children:[Object(r.jsxs)("div",{children:["name:",Object(r.jsx)("input",{value:n,onChange:o}),Object(r.jsx)("br",{}),"number:",Object(r.jsx)("input",{value:t,onChange:a})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.filterVal,t=e.filterHandler;return Object(r.jsxs)("div",{children:["filter shown with",Object(r.jsx)("input",{value:n,onChange:t})]})},f=(t(21),function(e){var n=e.message,t=e.isError;if(null===n)return null;var o=t?"error":"info";return Object(r.jsx)("div",{className:o,children:n})}),m=t(4),j=t.n(m),b="/api/persons",h=function(){return j.a.get(b).then((function(e){return e.data}))},g=function(e){return j.a.post(b,e).then((function(e){return e.data}))},O=function(e,n){return j.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return j.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},p=function(){var e=Object(o.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],c=Object(o.useState)(""),u=Object(i.a)(c,2),m=u[0],j=u[1],b=Object(o.useState)(""),p=Object(i.a)(b,2),x=p[0],w=p[1],C=Object(o.useState)(""),E=Object(i.a)(C,2),H=E[0],k=E[1],S=Object(o.useState)({message:null,isError:null}),L=Object(i.a)(S,2),T=L[0],y=L[1];Object(o.useEffect)((function(){console.log("effect triggered"),h().then((function(e){a(e)}))}),[]),console.log("render",t.length,"person(s)");var F=function(e){var n=t.filter((function(n){return n.name.toLowerCase()===e.name.toLowerCase()}))[0];console.log(n),window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))&&(console.log(n.id),O(n.id,e).then((function(e){y({message:"Changed ".concat(n.name,"'s number to ").concat(n.number),isError:!1}),setTimeout((function(){y({message:null,isError:null})}),5e3),a(t.map((function(t){return t.id!==n.id?t:e})))})).catch((function(e){y({message:"Information of ".concat(n.name," has already been removed from the server"),isError:!0}),setTimeout((function(){y({message:null,isError:null})}),5e3)})))},I=function(e){console.log("Name usage check:",e);var n=t.findIndex((function(n){return n.name===e}))>=0;return console.log("Has name been used?",n),n},D=H.length>0?t.filter((function(e){return e.name.toLowerCase().includes(H.toLowerCase())})):t;return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(f,{message:T.message,isError:T.isError}),Object(r.jsx)(d,{persons:t,filterVal:H,filterHandler:function(e){console.log(e.target.value),k(e.target.value)}}),Object(r.jsx)("h2",{children:"add a new"}),Object(r.jsx)(l,{name:m,num:x,nameHandler:function(e){console.log(e.target.value),j(e.target.value)},numHandler:function(e){console.log(e.target.value),w(e.target.value)},personHandler:function(e){e.preventDefault();var n={name:m,number:x};I(n.name)?F(n):g(n).then((function(e){y({message:"Added ".concat(e.name),isError:!1}),setTimeout((function(){y({message:null,isError:null})}),5e3),a(t.concat(e))})),j(""),w("")}}),Object(r.jsx)("h2",{children:"Numbers"}),D.map((function(e){return Object(r.jsx)(s,{person:e,deleteHandler:function(){return function(e){window.confirm("Delete ".concat(e.name,"?"))&&v(e.id).then(a(t.filter((function(n){return n.id!==e.id}))))}(e)}},e.name)}))]})},x=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,40)).then((function(n){var t=n.getCLS,r=n.getFID,o=n.getFCP,a=n.getLCP,c=n.getTTFB;t(e),r(e),o(e),a(e),c(e)}))};u.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(p,{})}),document.getElementById("root")),x()}},[[39,1,2]]]);
//# sourceMappingURL=main.e9293c31.chunk.js.map