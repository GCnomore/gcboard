(this.webpackJsonpgcboard=this.webpackJsonpgcboard||[]).push([[0],{48:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n.n(i),a=n(11),r=n.n(a),s=(n(48),n(19)),d=n(4),o=n(72),l=n(6),h=n(7),j=n(1);function b(){return Object(j.jsxs)(u,{children:[Object(j.jsxs)(o.a,{container:!0,children:[Object(j.jsxs)(p,{children:[Object(j.jsx)(m,{href:"/",children:Object(j.jsx)(l.a,{icon:h.a})}),Object(j.jsx)(m,{href:"/",children:"Boards"})]}),Object(j.jsxs)("section",{children:[Object(j.jsx)(m,{href:"/",children:Object(j.jsx)(l.a,{icon:h.e})}),Object(j.jsx)(m,{href:"/",children:Object(j.jsx)(l.a,{icon:h.d})}),Object(j.jsx)(m,{href:"/",children:Object(j.jsx)(l.a,{icon:h.b})}),Object(j.jsx)(m,{href:"/",children:"Profile"})]})]}),Object(j.jsxs)(o.a,{container:!0,children:[Object(j.jsxs)("section",{children:[Object(j.jsx)(m,{href:"/",children:"Board View"}),Object(j.jsx)(m,{href:"/",children:"Board Name"}),Object(j.jsx)(m,{href:"/",children:Object(j.jsx)(l.a,{icon:h.f})}),"|",Object(j.jsx)(m,{href:"/",children:"Some other options"})]}),Object(j.jsx)("section",{children:Object(j.jsxs)(m,{href:"/",children:[Object(j.jsx)(l.a,{icon:h.c})," Show Menu"]})})]})]})}var u=d.a.div.withConfig({displayName:"HeaderMenu__HeaderMenuWrapper",componentId:"sc-12n7tsh-0"})(["width:100vw;position:fixed;margin-top:1rem;> div{justify-content:space-between;}>:nth-child(2){margin-top:1rem;}"]),p=d.a.div.withConfig({displayName:"HeaderMenu__TopLeftSection",componentId:"sc-12n7tsh-1"})(["margin:0 0.25rem 0.5rem 0.25rem;"]),m=d.a.a.withConfig({displayName:"HeaderMenu__MenuItem",componentId:"sc-12n7tsh-2"})(["margin:0 0.25rem 0 0.25rem;padding:0.5rem;border-radius:0.2rem;background-color:rgba(0,0,0,0.5);backdrop-filter:blur(1.5px);color:#fff;font-weight:500;transition:0.25s;&:hover{opacity:0.7;transition:0.25s;cursor:pointer;}&:active{background-color:#1c1c1b;opacity:1;}"]),f=n(18),g=n(8);function x(e){var t=e.cardData,n=Object(i.useState)(t.data),c=Object(g.a)(n,2),a=c[0],r=c[1],s=Object(i.useState)(""),d=Object(g.a)(s,2),o=d[0],b=d[1],u=Object(i.useState)(""),p=Object(g.a)(u,2),m=p[0],x=p[1],O=(new Date).getHours()>12?"".concat((new Date).getHours()-12,":").concat((new Date).getMinutes(),"PM"):"".concat((new Date).getHours(),":").concat((new Date).getMinutes(),"AM"),v="".concat(O," ").concat((new Date).getMonth(),"/").concat((new Date).getDate(),"/").concat((new Date).getFullYear());return Object(i.useEffect)((function(){return function(){console.log("card")}}),[]),Object(j.jsxs)(w,{children:[Object(j.jsxs)(y,{children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:a.title}),Object(j.jsx)(l.a,{icon:h.g})]}),Object(j.jsxs)(S,{children:["Created ",a.timeStamp]}),Object(j.jsxs)("div",{children:["in list ",t.cardTitle]})]}),Object(j.jsxs)(C,{children:[Object(j.jsxs)(_,{children:[Object(j.jsxs)(L,{children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"Description"}),Object(j.jsx)(A,{children:"Edit"})]}),Object(j.jsx)("div",{children:a.description?Object(j.jsx)("div",{children:a.description}):Object(j.jsx)(D,{value:m,onChange:function(e){return x(e.target.value)},onKeyDown:function(e){("Enter"===e.code||"NumpadEnter"===e.code)&&(e.target.value,a.description=m,r(a),x(""))}})})]}),Object(j.jsxs)(k,{children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"Comments"}),Object(j.jsx)(A,{children:"Show Details"})]}),Object(j.jsx)(M,{children:a.comments?Object(j.jsx)(j.Fragment,{children:a.comments.map((function(e,t){return Object(j.jsxs)("div",{children:[Object(j.jsx)("span",{children:e.text}),Object(j.jsx)(I,{children:e.created})]},t)}))}):null}),Object(j.jsx)(D,{value:o,onChange:function(e){return b(e.target.value)},onKeyDown:function(e){("Enter"===e.code||"NumpadEnter"===e.code)&&function(){var e=[].concat(Object(f.a)(a.comments),[{text:o,created:v}]);a.comments=e,r(a),b("")}()}})]})]}),Object(j.jsxs)(N,{children:[Object(j.jsxs)("div",{className:"addToCard",children:[Object(j.jsx)("h2",{children:"Add to card"}),Object(j.jsxs)("div",{children:[Object(j.jsx)(A,{children:"Label"}),Object(j.jsx)(A,{children:"Checklist"}),Object(j.jsx)(A,{children:"Start Date"}),Object(j.jsx)(A,{children:"Due Date"}),Object(j.jsx)(A,{children:"Attachment"}),Object(j.jsx)(A,{children:"Cover"}),Object(j.jsx)(A,{children:"Label"}),Object(j.jsx)(A,{children:"Label"})]})]}),Object(j.jsxs)("div",{className:"actions",children:[Object(j.jsx)("h2",{children:"Actions"}),Object(j.jsxs)("div",{children:[Object(j.jsx)(A,{children:"Move"}),Object(j.jsx)(A,{children:"Delete"})]})]})]})]})]})}var O,v,w=d.a.div.withConfig({displayName:"Cards__CardsContainer",componentId:"sc-7fs6g7-0"})(["width:60vw;height:70vh;padding:20px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:rgba(0,0,0,0.5);z-index:1000;color:white;backdrop-filter:blur(1rem) opacity(0.7);"]),y=d.a.div.withConfig({displayName:"Cards__CardHeader",componentId:"sc-7fs6g7-1"})(["> div{display:flex;justify-content:space-between;> h1{margin:0;}}"]),C=d.a.div.withConfig({displayName:"Cards__CardContentWrapper",componentId:"sc-7fs6g7-2"})(["display:flex;justify-content:space-between;height:100%;"]),_=d.a.div.withConfig({displayName:"Cards__CardContentLeft",componentId:"sc-7fs6g7-3"})(["width:100%;margin-right:5%;"]),L=d.a.div.withConfig({displayName:"Cards__Description",componentId:"sc-7fs6g7-4"})(["display:flex;flex-direction:column;> div:nth-child(1){display:flex;justify-content:space-between;margin-top:2rem;> h2{margin:0;}}> div:nth-child(2){margin-top:1rem;}"]),N=d.a.div.withConfig({displayName:"Cards__CardContentRight",componentId:"sc-7fs6g7-5"})(["width:40%;height:fit-content;display:flex;flex-direction:column;justify-content:space-between;> div > div{display:flex;flex-direction:column;box-shadow:0px 0px 70px 40px rgba(225,225,225,0.1);}"]),k=Object(d.a)(L).withConfig({displayName:"Cards__CommentsContainer",componentId:"sc-7fs6g7-6"})(["display:flex;justify-content:space-between;margin-top:2rem;> h2{margin:0;}> button{height:fit-content;padding:0.1rem 0 !important;}"]),M=d.a.div.withConfig({displayName:"Cards__Comments",componentId:"sc-7fs6g7-7"})(["> div{display:flex;justify-content:space-between;margin:1rem 0;> span:nth-child(1){overflow-wrap:anywhere;}}"]),I=d.a.span.withConfig({displayName:"Cards__TimeStamp",componentId:"sc-7fs6g7-8"})(["margin-left:1rem;font-size:0.8rem;text-align:right;"]),D=d.a.input.withConfig({displayName:"Cards__CardInput",componentId:"sc-7fs6g7-9"})(["width:100%;"]),A=d.a.a.withConfig({displayName:"Cards__MenuItem",componentId:"sc-7fs6g7-10"})(["padding:0.5rem 1rem;border-radius:0.2rem;background-color:rgba(225,225,225,0.1);backdrop-filter:blur(3.5px);box-shadow:0px 0px 30px 4px rgba(225,225,225,0.1);color:#fff;font-weight:500;transition:0.25s;height:fit-content;&:hover{opacity:0.4;transition:0.25s;cursor:pointer;}&:active{background-color:#1c1c1b;opacity:1;}"]),S=d.a.div.withConfig({displayName:"Cards__CardTimeStamp",componentId:"sc-7fs6g7-11"})(["font-size:0.7rem;margin:0.3rem 0 1.5rem 0;"]),E=n(15),B=n(75);function H(e){var t=e.message;return Object(j.jsx)(T,{children:Object(j.jsx)("div",{children:t})})}var z=Object(d.b)(O||(O=Object(s.a)(["\n   from{\n      opacity: 0\n   }\n   to{\n      opacity: 1\n   }\n"]))),T=d.a.div(v||(v=Object(s.a)(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: fit-content;\n  height: fit-content;\n  padding: 10vh 5vw;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  animation: "," 1s;\n  backdrop-filter: blur(15px) opacity(0.7);\n  border-radius: 0.4rem;\n  > div {\n    color: white;\n    font-size: 3rem;\n  }\n"])),z),F=n(74),W="listMenu",J="addCard",P="addList",K="showModal";function X(e,t){switch(t.type){case W:return Object(E.a)(Object(E.a)({},e),{},{listMenu:{id:t.index,show:!e.listMenu.show}});case J:return Object(E.a)(Object(E.a)({},e),{},{showAddCard:{id:t.index,show:!e.showAddCard.show}});case P:return Object(E.a)(Object(E.a)({},e),{},{addList:{add:t.add,title:t.value}});case K:return Object(E.a)(Object(E.a)({},e),{},{showModal:{show:t.payload.show,message:t.payload.message}})}}function q(e){var t=e.data,n=e.handleModalOpen,c=e.setOpen;console.log("data@@@@@@@@@@@@@@@@",t[0]);var a=Object(i.useReducer)(X,{listMenu:{id:null,show:!1},showAddCard:{id:null,show:!1},addList:{add:!1,title:""},showModal:{show:!1,message:""}}),r=Object(g.a)(a,2),s=r[0],d=r[1],o=Object(i.useState)(""),b=Object(g.a)(o,2),u=b[0],p=b[1],m=Object(i.useState)(t[0]),x=Object(g.a)(m,2),O=x[0],v=x[1],w=O.lists;console.log(t),Object(i.useEffect)((function(){localStorage.setItem("data",JSON.stringify(O))}),[O]);var y,C=function(e,t){var n=!!s.showAddCard&&(s.showAddCard.id===e&&s.showAddCard.show);return Object(j.jsxs)(te,{show:n,children:[Object(j.jsx)("input",{value:u,placeholder:"Enter card title",onChange:function(e){p(e.target.value)}}),Object(j.jsxs)("div",{children:[Object(j.jsx)(B.a,{variant:"contained",onClick:function(){""!==u?L(t):M("Card must have title")},children:"Add"}),Object(j.jsx)(Z,{children:Object(j.jsx)(l.a,{icon:h.g,onClick:function(t){e===s.showAddCard.id&&d({type:J,index:e})}})})]})]})},_=function(e){if(0!==w.length){var t=w.filter((function(t){return t.title===e}));return console.log("cards@@@@",t,"lists",w),t[0].cards.map((function(e,i){return Object(j.jsx)(V,{onClick:function(){c(!0),n(e,t[0].title)},children:e.title},i)}))}return null},L=function(e){var t=(new Date).getHours()>12?"".concat((new Date).getHours()-12,":").concat((new Date).getMinutes(),"PM"):"".concat((new Date).getHours(),":").concat((new Date).getMinutes(),"AM"),n="".concat(t," ").concat((new Date).getMonth(),"/").concat((new Date).getDate(),"/").concat((new Date).getFullYear()),i={title:u,timeStamp:n,description:"",comments:[{text:"This card was created by Isaac",created:n}]},c=w.find((function(t){return t.title===e}));c.cards=[].concat(Object(f.a)(c.cards),[i]);var a=Object(f.a)(w),r={name:O.name,selected:O.selected,lists:a};v(r),p("")},N=function(){return Object(j.jsxs)(ee,{children:[Object(j.jsx)("input",{placeholder:"Enter list title",onChange:function(e){d({type:P,add:!0,value:e.target.value})}}),Object(j.jsxs)("div",{children:[Object(j.jsx)(B.a,{variant:"contained",onClick:function(e){if(e.preventDefault(),""!==s.addList.title){var t={name:O.name,selected:O.selected,lists:w?[].concat(Object(f.a)(w),[{title:s.addList.title,cards:[]}]):[{title:s.addList.title,cards:[]}],type:O.type};v(t),d({type:P,add:!1,value:""})}else M("List must have title")},children:"Add"}),Object(j.jsx)(Z,{children:Object(j.jsx)(l.a,{icon:h.g,onClick:function(){d({type:P,add:!1,value:""})}})})]})]})},k=function(e,t){return Object(j.jsxs)(ie,{className:"listMenu",children:[Object(j.jsx)("div",{className:"listMenu",children:"Sort by"}),Object(j.jsx)("div",{className:"listMenu",onClick:function(){var n=w.filter((function(t){return t.title!==e}));v({name:O.name,selected:O.selected,lists:n,type:O.type}),d({type:W,index:t})},children:"Delete"})]})},M=function(e){d({type:K,payload:{show:!0,message:e}})},I=function(){d({type:K,payload:{show:!1,message:""}})};return 0===O.length&&0===O.lists.length?Object(j.jsxs)(Y,{children:[Object(j.jsx)("div",{}),Object(j.jsx)("div",{children:Object(j.jsx)(ne,{children:s.addList.add?N():Object(j.jsxs)("div",{onClick:function(){return d({type:P,add:!0,value:s.addList.title})},children:[Object(j.jsx)(l.a,{icon:h.e})," Add a list"]})})})]}):Object(j.jsxs)(Y,{children:[(y=s.showModal.message,Object(j.jsx)(F.a,{open:s.showModal.show,onClose:I,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",children:Object(j.jsx)(H,{message:y})})),Object(j.jsx)("div",{children:Object(j.jsx)("h1",{children:O.name.toUpperCase()})}),Object(j.jsxs)("div",{children:[w.map((function(e,t){var n=s.showAddCard.id!==t||!s.showAddCard.show;return Object(j.jsxs)(U,{className:"list",children:[s.listMenu?s.listMenu.id===t&&s.listMenu.show&&k(e.title,t):null,Object(j.jsxs)(G,{children:[Object(j.jsx)("div",{onClick:function(){d({type:W,index:t})},children:Object(j.jsx)(l.a,{icon:h.c})}),Object(j.jsx)(Q,{children:Object(j.jsx)("a",{href:"/",children:e.title})})]}),Object(j.jsx)("section",{children:_(e.title)}),Object(j.jsxs)("section",{children:[C(t,e.title),Object(j.jsxs)($,{show:n,onClick:function(e){d({type:J,index:t})},children:[Object(j.jsx)(l.a,{icon:h.e})," Add another card"]})]})]},t)})),Object(j.jsx)(ne,{children:s.addList.add?N():Object(j.jsxs)("div",{onClick:function(){return d({type:P,add:!0,value:s.addList.title})},children:[Object(j.jsx)(l.a,{icon:h.e})," ",0!==w.length?"Add Another List":"Add a list"]})})]})]})}var R,Y=d.a.div.withConfig({displayName:"Lists__ListContainer",componentId:"lh2nul-0"})(["width:100%;height:fit-content;margin-top:26vh;> div:nth-child(1){position:absolute;top:13vh;width:100vw;display:flex;justify-content:center;background-color:rgba(0,0,0,0.5);backdrop-filter:blur(1.5px);color:white;}> div:nth-child(2){display:flex;}"]),U=d.a.div.withConfig({displayName:"Lists__List",componentId:"lh2nul-1"})(["min-width:18rem;height:fit-content;background-color:rgba(0,0,0,0.5);backdrop-filter:blur(1.5px);margin:0 0.75rem 0 0.75rem;padding:0.5rem;border-radius:0.5rem;color:white;font-weight:500;"]),V=d.a.div.withConfig({displayName:"Lists__ListItems",componentId:"lh2nul-2"})(["padding:0.5rem;margin:0.75rem 0 0.75rem 0;background-color:rgba(102,101,99,0.568);backdrop-filter:blur(1.5px);border-radius:0.25rem;cursor:pointer;transition:0.5s;&:hover{filter:brightness(70%);transition:0.75s;}"]),G=d.a.div.withConfig({displayName:"Lists__ListHeader",componentId:"lh2nul-3"})(["height:5vh;display:flex;flex-direction:column;> div:nth-child(1){cursor:pointer;width:fit-content;position:absolute;}"]),Q=d.a.div.withConfig({displayName:"Lists__ListTitle",componentId:"lh2nul-4"})(["height:100%;text-align:center;font-weight:600;font-size:1.5rem;display:flex;justify-content:center;> a{cursor:pointer;text-decoration:none;color:inherit;align-self:center;}"]),Z=d.a.div.withConfig({displayName:"Lists__XButton",componentId:"lh2nul-5"})(["font-size:2rem;vertical-align:middle;"]),$=d.a.div.withConfig({displayName:"Lists__AddAnotherCard",componentId:"lh2nul-6"})(["display:",";"],(function(e){return e.show?"flex":"none"})),ee=d.a.div.withConfig({displayName:"Lists__AddList",componentId:"lh2nul-7"})(["display:flex;flex-direction:column;> input{height:1.5rem;}> div{display:flex;justify-content:space-between;margin-top:1rem;}"]),te=Object(d.a)(ee).withConfig({displayName:"Lists__AddCard",componentId:"lh2nul-8"})(["display:",";"],(function(e){return e.show?"flex":"none"})),ne=Object(d.a)(U).withConfig({displayName:"Lists__AddAnotherList",componentId:"lh2nul-9"})([""]),ie=d.a.div.withConfig({displayName:"Lists__ListMenu",componentId:"lh2nul-10"})(["position:absolute;background-color:rgba(102,101,99,0.568);backdrop-filter:blur(1.5px);width:95.5%;text-align:center;font-weight:600;bottom:105%;z-index:-10;> div{padding:0.5rem 0;cursor:pointer;}"]);function ce(e){var t=e.newBoard,n=e.setNewBoard,c=e.addNewBoard,a=Object(i.useState)(),r=Object(g.a)(a,2),s=r[0],d=r[1];return Object(j.jsxs)(ae,{children:[Object(j.jsx)("div",{children:Object(j.jsx)("h1",{children:"Create new board"})}),Object(j.jsx)("div",{children:Object(j.jsx)("input",{placeholder:"Name of new board",value:t.name,onChange:function(e){n({name:e.target.value,selected:!0,lists:[],type:""})}})}),Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"Choose board template"}),Object(j.jsx)("div",{children:[{name:"No Template",image:""},{name:"Kanban Board",image:""},{name:"Project Management",image:""}].map((function(e){return Object(j.jsx)("div",{onClick:function(){return d(e.name)},children:Object(j.jsx)("h3",{children:e.name})})}))})]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{onClick:function(){t.type=s,console.log(t),n(t),c()},children:"Create"})})]})}var ae=d.a.div(R||(R=Object(s.a)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(1.5px);\n  > div:nth-child(1) {\n    font-size: 3rem;\n    color: white;\n  }\n  > div:nth-child(2) {\n    text-align: center;\n    width: 100%;\n    > input {\n      width: 50vw;\n      height: 10vh;\n      font-size: 3rem;\n      text-align: center;\n      outline: none;\n      font-weight: 600;\n    }\n  }\n  > div:nth-child(3) {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n    color: white;\n    font-size: 2rem;\n    margin: 2rem 0 1rem 0;\n    > div {\n      width: 60vw;\n      align-self: center;\n      border: 2px white solid;\n      display: grid;\n      grid-template-columns: 1fr 1fr 1fr;\n      > div {\n        align-self: center;\n      }\n    }\n  }\n"])));function re(){var e=Object(i.useState)(),t=Object(g.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(!1),r=Object(g.a)(a,2),s=r[0],d=r[1],o=Object(i.useState)({name:"",selected:!0,lists:[],type:""}),l=Object(g.a)(o,2),h=l[0],b=l[1],u=Object(i.useState)(localStorage.getItem("data")?[JSON.parse(localStorage.getItem("data"))]:[]),p=Object(g.a)(u,2),m=p[0],O=p[1];Object(i.useEffect)((function(){document.addEventListener("keydown",(function(e){return"Escape"===e.code&&d(!1)})),function(e){var t,n,i=document.querySelector(".".concat(e)),c=!1;i.addEventListener("mousemove",(function(e){if(c){e.preventDefault();var a=2*(e.pageX-i.offsetLeft-t);i.scrollLeft=n-a}})),i.addEventListener("mousedown",(function(e){c=!0,t=e.pageX-i.offsetLeft,n=i.scrollLeft})),i.addEventListener("mouseup",(function(){c=!1})),i.addEventListener("mouseleave",(function(){c=!1}))}("boardWrapper")}),[]);var v=function(){d(!1)};return console.log("boards@@@@@",m),Object(j.jsx)(de,{className:"boardWrapper",children:0===m.length?Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(ce,{newBoard:h,setNewBoard:b,addNewBoard:function(){0===m.length?O([h]):O([].concat(Object(f.a)(m),[h]))}})}):Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(q,{data:m.filter((function(e){return e.selected})),handleModalOpen:function(e,t){d(!0),c({data:e,cardTitle:t})},setOpen:d}),Object(j.jsx)(F.a,{open:s,onClose:v,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",children:Object(j.jsx)(x,{cardData:n})})," "]})})}var se,de=d.a.div.withConfig({displayName:"Board__BoardWrapper",componentId:"sc-1ikief8-0"})(["height:100vh;overflow-x:auto;display:flex;&:active{cursor:grabbing;}"]),oe=n.p+"static/media/javascript-golden-logo-programming-language-brown-metal-background-creative-javascript-logo-besthqwallpapers.com-2133x1200.7cf2f367.jpg";function le(){return Object(j.jsxs)(he,{children:[Object(j.jsx)(b,{}),Object(j.jsx)(re,{})]})}var he=d.a.div(se||(se=Object(s.a)(["\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: 50%;\n  height: 100vh;\n  background-image: url(",");\n"])),oe);r.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(le,{})}),document.getElementById("root"))}},[[55,1,2]]]);
//# sourceMappingURL=main.2d558c39.chunk.js.map