!function(n){"use strict";function r(n,r,t){return t.a=n,t.f=r,t}function t(n){return r(2,n,(function(r){return function(t){return n(r,t)}}))}function e(n){return r(3,n,(function(r){return function(t){return function(e){return n(r,t,e)}}}))}function u(n){return r(4,n,(function(r){return function(t){return function(e){return function(u){return n(r,t,e,u)}}}}))}function a(n){return r(5,n,(function(r){return function(t){return function(e){return function(u){return function(a){return n(r,t,e,u,a)}}}}}))}function i(n){return r(6,n,(function(r){return function(t){return function(e){return function(u){return function(a){return function(i){return n(r,t,e,u,a,i)}}}}}}))}function f(n,r,t){return 2===n.a?n.f(r,t):n(r)(t)}function o(n,r,t,e){return 3===n.a?n.f(r,t,e):n(r)(t)(e)}function c(n,r,t,e,u){return 4===n.a?n.f(r,t,e,u):n(r)(t)(e)(u)}function v(n,r,t,e,u,a){return 5===n.a?n.f(r,t,e,u,a):n(r)(t)(e)(u)(a)}function s(n,r,t,e,u,a,i){return 6===n.a?n.f(r,t,e,u,a,i):n(r)(t)(e)(u)(a)(i)}function b(n,r,t){if("object"!=typeof n)return n===r?0:r>n?-1:1;if(void 0===n.$)return(t=b(n.a,r.a))||(t=b(n.b,r.b))?t:b(n.c,r.c);for(;n.b&&r.b&&!(t=b(n.a,r.a));n=n.b,r=r.b);return t||(n.b?1:r.b?-1:0)}var l=t((function(n,r){var t=b(n,r);return 0>t?Zn:t?Xn:Vn}));function d(n,r){return{a:n,b:r}}function h(n,r,t){return{a:n,b:r,c:t}}function $(n,r){var t={};for(var e in n)t[e]=n[e];for(var e in r)t[e]=r[e];return t}var g={$:0};function m(n,r){return{$:1,a:n,b:r}}var p=t(m);function y(n){for(var r=g,t=n.length;t--;)r=m(n[t],r);return r}function w(n){for(var r=[];n.b;n=n.b)r.push(n.a);return r}var A=e((function(n,r,t){for(var e=Array(n),u=0;n>u;u++)e[u]=t(r+u);return e})),j=t((function(n,r){for(var t=Array(n),e=0;n>e&&r.b;e++)t[e]=r.a,r=r.b;return t.length=e,d(t,r)}));function k(n){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+n+".md")}var _=Math.ceil,F=Math.floor,B=Math.round,L=Math.log;var C=t((function(n,r){return r.join(n)}));function N(n){return n+""}function E(n){return{$:2,b:n}}E((function(n){return"number"!=typeof n?P("an INT",n):n>-2147483647&&2147483647>n&&(0|n)===n?fr(n):!isFinite(n)||n%1?P("an INT",n):fr(n)})),E((function(n){return"boolean"==typeof n?fr(n):P("a BOOL",n)})),E((function(n){return"number"==typeof n?fr(n):P("a FLOAT",n)})),E((function(n){return fr(n)})),E((function(n){return"string"==typeof n?fr(n):n instanceof String?fr(n+""):P("a STRING",n)}));var T=t((function(n,r){return x(n,r)}));function x(n,r){switch(n.$){case 2:return n.b(r);case 5:return null===r?fr(n.c):P("null",r);case 3:return z(r)?q(n.b,r,y):P("a LIST",r);case 4:return z(r)?q(n.b,r,O):P("an ARRAY",r);case 6:var t=n.d;if("object"!=typeof r||null===r||!(t in r))return P("an OBJECT with a field named `"+t+"`",r);var e=x(n.b,r[t]);return Nr(e)?e:er(f(ar,t,e.a));case 7:var u=n.e;if(!z(r))return P("an ARRAY",r);if(u>=r.length)return P("a LONGER array. Need index "+u+" but only see "+r.length+" entries",r);e=x(n.b,r[u]);return Nr(e)?e:er(f(ir,u,e.a));case 8:if("object"!=typeof r||null===r||z(r))return P("an OBJECT",r);var a=g;for(var i in r)if(r.hasOwnProperty(i)){e=x(n.b,r[i]);if(!Nr(e))return er(f(ar,i,e.a));a=m(d(i,e.a),a)}return fr(lr(a));case 9:for(var o=n.f,c=n.g,v=0;c.length>v;v++){e=x(c[v],r);if(!Nr(e))return e;o=o(e.a)}return fr(o);case 10:e=x(n.b,r);return Nr(e)?x(n.h(e.a),r):e;case 11:for(var s=g,b=n.g;b.b;b=b.b){e=x(b.a,r);if(Nr(e))return e;s=m(e.a,s)}return er(or(lr(s)));case 1:return er(f(ur,n.a,r));case 0:return fr(n.a)}}function q(n,r,t){for(var e=r.length,u=Array(e),a=0;e>a;a++){var i=x(n,r[a]);if(!Nr(i))return er(f(ir,a,i.a));u[a]=i.a}return fr(t(u))}function z(n){return Array.isArray(n)||"undefined"!=typeof FileList&&n instanceof FileList}function O(n){return f(Cr,n.length,(function(r){return n[r]}))}function P(n,r){return er(f(ur,"Expecting "+n,r))}function R(n,r){if(n===r)return!0;if(n.$!==r.$)return!1;switch(n.$){case 0:case 1:return n.a===r.a;case 2:return n.b===r.b;case 5:return n.c===r.c;case 3:case 4:case 8:return R(n.b,r.b);case 6:return n.d===r.d&&R(n.b,r.b);case 7:return n.e===r.e&&R(n.b,r.b);case 9:return n.f===r.f&&I(n.g,r.g);case 10:return n.h===r.h&&R(n.b,r.b);case 11:return I(n.g,r.g)}}function I(n,r){var t=n.length;if(t!==r.length)return!1;for(var e=0;t>e;e++)if(!R(n[e],r[e]))return!1;return!0}function M(n){return{$:0,a:n}}function S(n){return{$:2,b:n,c:null}}var Y=t((function(n,r){return{$:3,b:n,d:r}}));var D=0;function G(n){var r={$:0,e:D++,f:n,g:null,h:[]};return U(r),r}function J(n){return S((function(r){r(M(G(n)))}))}function W(n,r){n.h.push(r),U(n)}var Q=t((function(n,r){return S((function(t){W(n,r),t(M(0))}))}));var H=!1,K=[];function U(n){if(K.push(n),!H){for(H=!0;n=K.shift();)V(n);H=!1}}function V(n){for(;n.f;){var r=n.f.$;if(0===r||1===r){for(;n.g&&n.g.$!==r;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else{if(2===r)return void(n.f.c=n.f.b((function(r){n.f=r,U(n)})));if(5===r){if(0===n.h.length)return;n.f=n.f.b(n.h.shift())}else n.g={$:3===r?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}}function X(n,r,t,e,u,a){var i=f(T,n,r?r.flags:void 0);Nr(i)||k(2);var o={},c=(i=t(i.a)).a,v=a(b,c),s=function(n,r){var t;for(var e in Z){var u=Z[e];u.a&&((t=t||{})[e]=u.a(e,r)),n[e]=rn(u,r)}return t}(o,b);function b(n,r){v(c=(i=f(e,n,c)).a,r),on(o,i.b,u(c))}return on(o,i.b,u(c)),s?{ports:s}:{}}var Z={};function nn(n,r,t,e,u){return{b:n,c:r,d:t,e:e,f:u}}function rn(n,r){var t={g:r,h:void 0},e=n.c,u=n.d,a=n.e,i=n.f;function v(n){return f(Y,v,{$:5,b:function(r){var f=r.a;return 0===r.$?o(u,t,f,n):a&&i?c(e,t,f.i,f.j,n):o(e,t,a?f.i:f.j,n)}})}return t.h=G(f(Y,v,n.b))}var tn=t((function(n,r){return S((function(t){n.g(r),t(M(0))}))})),en=t((function(n,r){return f(Q,n.h,{$:0,a:r})}));function un(n){return function(r){return{$:1,k:n,l:r}}}var an=[],fn=!1;function on(n,r,t){if(an.push({p:n,q:r,r:t}),!fn){fn=!0;for(var e;e=an.shift();)cn(e.p,e.q,e.r);fn=!1}}function cn(n,r,t){var e={};for(var u in vn(!0,r,e,null),vn(!1,t,e,null),n)W(n[u],{$:"fx",a:e[u]||{i:g,j:g}})}function vn(n,r,t,e){switch(r.$){case 1:var u=r.k,a=function(n,r,t,e){function u(n){for(var r=t;r;r=r.t)n=r.s(n);return n}return f(n?Z[r].e:Z[r].f,u,e)}(n,u,e,r.l);return void(t[u]=function(n,r,t){return t=t||{i:g,j:g},n?t.i=m(r,t.i):t.j=m(r,t.j),t}(n,a,t[u]));case 2:for(var i=r.m;i.b;i=i.b)vn(n,i.a,t,e);return;case 3:return void vn(n,r.o,t,{s:r.n,t:e})}}var sn;var bn="undefined"!=typeof document?document:{};function ln(n,r){n.appendChild(r)}function dn(n){return{$:0,a:n}}var hn=t((function(n,r){return t((function(t,e){for(var u=[],a=0;e.b;e=e.b){var i=e.a;a+=i.b||0,u.push(i)}return a+=u.length,{$:1,c:r,d:pn(t),e:u,f:n,b:a}}))})),$n=hn(void 0);t((function(n,r){return t((function(t,e){for(var u=[],a=0;e.b;e=e.b){var i=e.a;a+=i.b.b||0,u.push(i)}return a+=u.length,{$:2,c:r,d:pn(t),e:u,f:n,b:a}}))}))(void 0);var gn=t((function(n,r){return{$:"a3",n:n,o:r}}));var mn;function pn(n){for(var r={};n.b;n=n.b){var t=n.a,e=t.$,u=t.n,a=t.o;if("a2"!==e){var i=r[e]||(r[e]={});"a3"===e&&"class"===u?yn(i,u,a):i[u]=a}else"className"===u?yn(r,u,a):r[u]=a}return r}function yn(n,r,t){var e=n[r];n[r]=e?e+" "+t:t}function wn(n,r){var t=n.$;if(5===t)return wn(n.k||(n.k=n.m()),r);if(0===t)return bn.createTextNode(n.a);if(4===t){for(var e=n.k,u=n.j;4===e.$;)"object"!=typeof u?u=[u,e.j]:u.push(e.j),e=e.k;var a={j:u,p:r};return(i=wn(e,a)).elm_event_node_ref=a,i}if(3===t)return An(i=n.h(n.g),r,n.d),i;var i=n.f?bn.createElementNS(n.f,n.c):bn.createElement(n.c);sn&&"a"==n.c&&i.addEventListener("click",sn(i)),An(i,r,n.d);for(var f=n.e,o=0;f.length>o;o++)ln(i,wn(1===t?f[o]:f[o].b,r));return i}function An(n,r,t){for(var e in t){var u=t[e];"a1"===e?jn(n,u):"a0"===e?Fn(n,r,u):"a3"===e?kn(n,u):"a4"===e?_n(n,u):("value"!==e&&"checked"!==e||n[e]!==u)&&(n[e]=u)}}function jn(n,r){var t=n.style;for(var e in r)t[e]=r[e]}function kn(n,r){for(var t in r){var e=r[t];void 0!==e?n.setAttribute(t,e):n.removeAttribute(t)}}function _n(n,r){for(var t in r){var e=r[t],u=e.f,a=e.o;void 0!==a?n.setAttributeNS(u,t,a):n.removeAttributeNS(u,t)}}function Fn(n,r,t){var e=n.elmFs||(n.elmFs={});for(var u in t){var a=t[u],i=e[u];if(a){if(i){if(i.q.$===a.$){i.q=a;continue}n.removeEventListener(u,i)}i=Bn(r,a),n.addEventListener(u,i,mn&&{passive:2>Tr(a)}),e[u]=i}else n.removeEventListener(u,i),e[u]=void 0}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){mn=!0}}))}catch(n){}function Bn(n,r){function t(r){var e=t.q,u=x(e.a,r);if(Nr(u)){for(var a,i=Tr(e),f=u.a,o=i?3>i?f.a:f.y:f,c=1==i?f.b:3==i&&f.aM,v=(c&&r.stopPropagation(),(2==i?f.b:3==i&&f.aG)&&r.preventDefault(),n);a=v.j;){if("function"==typeof a)o=a(o);else for(var s=a.length;s--;)o=a[s](o);v=v.p}v(o,c)}}return t.q=r,t}function Ln(n,r){return n.$==r.$&&R(n.a,r.a)}function Cn(n,r){var t=[];return En(n,r,t,0),t}function Nn(n,r,t,e){var u={$:r,r:t,s:e,t:void 0,u:void 0};return n.push(u),u}function En(n,r,t,e){if(n!==r){var u=n.$,a=r.$;if(u!==a){if(1!==u||2!==a)return void Nn(t,0,e,r);r=function(n){for(var r=n.e,t=r.length,e=Array(t),u=0;t>u;u++)e[u]=r[u].b;return{$:1,c:n.c,d:n.d,e:e,f:n.f,b:n.b}}(r),a=1}switch(a){case 5:for(var i=n.l,f=r.l,o=i.length,c=o===f.length;c&&o--;)c=i[o]===f[o];if(c)return void(r.k=n.k);r.k=r.m();var v=[];return En(n.k,r.k,v,0),void(v.length>0&&Nn(t,1,e,v));case 4:for(var s=n.j,b=r.j,l=!1,d=n.k;4===d.$;)l=!0,"object"!=typeof s?s=[s,d.j]:s.push(d.j),d=d.k;for(var h=r.k;4===h.$;)l=!0,"object"!=typeof b?b=[b,h.j]:b.push(h.j),h=h.k;return l&&s.length!==b.length?void Nn(t,0,e,r):((l?function(n,r){for(var t=0;n.length>t;t++)if(n[t]!==r[t])return!1;return!0}(s,b):s===b)||Nn(t,2,e,b),void En(d,h,t,e+1));case 0:return void(n.a!==r.a&&Nn(t,3,e,r.a));case 1:return void Tn(n,r,t,e,qn);case 2:return void Tn(n,r,t,e,zn);case 3:if(n.h!==r.h)return void Nn(t,0,e,r);var $=xn(n.d,r.d);$&&Nn(t,4,e,$);var g=r.i(n.g,r.g);return void(g&&Nn(t,5,e,g))}}}function Tn(n,r,t,e,u){if(n.c===r.c&&n.f===r.f){var a=xn(n.d,r.d);a&&Nn(t,4,e,a),u(n,r,t,e)}else Nn(t,0,e,r)}function xn(n,r,t){var e;for(var u in n)if("a1"!==u&&"a0"!==u&&"a3"!==u&&"a4"!==u)if(u in r){var a=n[u],i=r[u];a===i&&"value"!==u&&"checked"!==u||"a0"===t&&Ln(a,i)||((e=e||{})[u]=i)}else(e=e||{})[u]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:n[u].f,o:void 0}:"string"==typeof n[u]?"":null;else{var f=xn(n[u],r[u]||{},u);f&&((e=e||{})[u]=f)}for(var o in r)o in n||((e=e||{})[o]=r[o]);return e}function qn(n,r,t,e){var u=n.e,a=r.e,i=u.length,f=a.length;i>f?Nn(t,6,e,{v:f,i:i-f}):f>i&&Nn(t,7,e,{v:i,e:a});for(var o=f>i?i:f,c=0;o>c;c++){var v=u[c];En(v,a[c],t,++e),e+=v.b||0}}function zn(n,r,t,e){for(var u=[],a={},i=[],f=n.e,o=r.e,c=f.length,v=o.length,s=0,b=0,l=e;c>s&&v>b;){var d=(F=f[s]).a,h=(B=o[b]).a,$=F.b,g=B.b,m=void 0,p=void 0;if(d!==h){var y=f[s+1],w=o[b+1];if(y){var A=y.a,j=y.b;p=h===A}if(w){var k=w.a,_=w.b;m=d===k}if(m&&p)En($,_,u,++l),On(a,u,d,g,b,i),l+=$.b||0,Pn(a,u,d,j,++l),l+=j.b||0,s+=2,b+=2;else if(m)l++,On(a,u,h,g,b,i),En($,_,u,l),l+=$.b||0,s+=1,b+=2;else if(p)Pn(a,u,d,$,++l),l+=$.b||0,En(j,g,u,++l),l+=j.b||0,s+=2,b+=1;else{if(!y||A!==k)break;Pn(a,u,d,$,++l),On(a,u,h,g,b,i),l+=$.b||0,En(j,_,u,++l),l+=j.b||0,s+=2,b+=2}}else En($,g,u,++l),l+=$.b||0,s++,b++}for(;c>s;){var F;l++,Pn(a,u,(F=f[s]).a,$=F.b,l),l+=$.b||0,s++}for(;v>b;){var B,L=L||[];On(a,u,(B=o[b]).a,B.b,void 0,L),b++}(u.length>0||i.length>0||L)&&Nn(t,8,e,{w:u,x:i,y:L})}function On(n,r,t,e,u,a){var i=n[t];if(!i)return a.push({r:u,A:i={c:0,z:e,r:u,s:void 0}}),void(n[t]=i);if(1===i.c){a.push({r:u,A:i}),i.c=2;var f=[];return En(i.z,e,f,i.r),i.r=u,void(i.s.s={w:f,A:i})}On(n,r,t+"_elmW6BL",e,u,a)}function Pn(n,r,t,e,u){var a=n[t];if(a){if(0===a.c){a.c=2;var i=[];return En(e,a.z,i,u),void Nn(r,9,u,{w:i,A:a})}Pn(n,r,t+"_elmW6BL",e,u)}else{var f=Nn(r,9,u,void 0);n[t]={c:1,z:e,r:u,s:f}}}function Rn(n,r,t,e){!function n(r,t,e,u,a,i,f){var o=e[u],c=o.r;for(;c===a;){var v=o.$;if(1===v)Rn(r,t.k,o.s,f);else if(8===v){o.t=r,o.u=f,(s=o.s.w).length>0&&n(r,t,s,0,a,i,f)}else if(9===v){o.t=r,o.u=f;var s,b=o.s;if(b)b.A.s=r,(s=b.w).length>0&&n(r,t,s,0,a,i,f)}else o.t=r,o.u=f;if(u++,!(o=e[u])||(c=o.r)>i)return u}var l=t.$;if(4===l){for(var d=t.k;4===d.$;)d=d.k;return n(r,d,e,u,a+1,i,r.elm_event_node_ref)}for(var h=t.e,$=r.childNodes,g=0;h.length>g;g++){a++;var m=1===l?h[g]:h[g].b,p=a+(m.b||0);if(c>=a&&p>=c&&(u=n($[g],m,e,u,a,p,f),!(o=e[u])||(c=o.r)>i))return u;a=p}return u}(n,r,t,0,0,r.b,e)}function In(n,r,t,e){return 0===t.length?n:(Rn(n,r,t,e),Mn(n,t))}function Mn(n,r){for(var t=0;r.length>t;t++){var e=r[t],u=e.t,a=Sn(u,e);u===n&&(n=a)}return n}function Sn(n,r){switch(r.$){case 0:return function(n,r,t){var e=n.parentNode,u=wn(r,t);u.elm_event_node_ref||(u.elm_event_node_ref=n.elm_event_node_ref);e&&u!==n&&e.replaceChild(u,n);return u}(n,r.s,r.u);case 4:return An(n,r.u,r.s),n;case 3:return n.replaceData(0,n.length,r.s),n;case 1:return Mn(n,r.s);case 2:return n.elm_event_node_ref?n.elm_event_node_ref.j=r.s:n.elm_event_node_ref={j:r.s,p:r.u},n;case 6:for(var t=r.s,e=0;t.i>e;e++)n.removeChild(n.childNodes[t.v]);return n;case 7:for(var u=(t=r.s).e,a=n.childNodes[e=t.v];u.length>e;e++)n.insertBefore(wn(u[e],r.u),a);return n;case 9:if(!(t=r.s))return n.parentNode.removeChild(n),n;var i=t.A;return void 0!==i.r&&n.parentNode.removeChild(n),i.s=Mn(n,t.w),n;case 8:return function(n,r){var t=r.s,e=function(n,r){if(!n)return;for(var t=bn.createDocumentFragment(),e=0;n.length>e;e++){var u=n[e].A;ln(t,2===u.c?u.s:wn(u.z,r.u))}return t}(t.y,r);n=Mn(n,t.w);for(var u=t.x,a=0;u.length>a;a++){var i=u[a],f=i.A,o=2===f.c?f.s:wn(f.z,r.u);n.insertBefore(o,n.childNodes[i.r])}e&&ln(n,e);return n}(n,r);case 5:return r.s(n);default:k(10)}}function Yn(n){if(3===n.nodeType)return dn(n.textContent);if(1!==n.nodeType)return dn("");for(var r=g,t=n.attributes,e=t.length;e--;){var u=t[e];r=m(f(gn,u.name,u.value),r)}var a=n.tagName.toLowerCase(),i=g,c=n.childNodes;for(e=c.length;e--;)i=m(Yn(c[e]),i);return o($n,a,r,i)}var Dn=u((function(n,r,t,e){return X(r,e,n.b3,n.cy,n.cs,(function(r,t){var u=n.cz,a=e.node,i=Yn(a);return Jn(t,(function(n){var t=u(n),e=Cn(i,t);a=In(a,i,e,r),i=t}))}))})),Gn=("undefined"!=typeof cancelAnimationFrame&&cancelAnimationFrame,"undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(n){return setTimeout(n,1e3/60)});function Jn(n,r){r(n);var t=0;function e(){t=1===t?0:(Gn(e),r(n),1)}return function(u,a){n=u,a?(r(n),2===t&&(t=1)):(0===t&&Gn(e),t=2)}}var Wn={addEventListener:function(){},removeEventListener:function(){}};"undefined"!=typeof document&&document,"undefined"!=typeof window&&window;var Qn=t((function(n,r){return S((function(){var t=setInterval((function(){G(r)}),n);return function(){clearInterval(t)}}))}));var Hn=t((function(n,r){return new Float64Array([n,r])})),Kn=t((function(n,r){var t=new Float64Array(2);return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t}));var Un=t((function(n,r){var t=new Float64Array(2);return t[0]=r[0]*n,t[1]=r[1]*n,t}));new Float64Array(3),new Float64Array(3),new Float64Array(3);new Float64Array(16),new Float64Array(16),new Float64Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);var Vn=1,Xn=2,Zn=0,nr=p,rr=e((function(n,r,t){for(;;){if(-2===t.$)return r;var e=t.d,u=n,a=o(n,t.b,t.c,o(rr,n,r,t.e));n=u,r=a,t=e}})),tr=function(n){return o(rr,e((function(n,r,t){return f(nr,d(n,r),t)})),g,n)},er=function(n){return{$:1,a:n}},ur=t((function(n,r){return{$:3,a:n,b:r}})),ar=t((function(n,r){return{$:0,a:n,b:r}})),ir=t((function(n,r){return{$:1,a:n,b:r}})),fr=function(n){return{$:0,a:n}},or=function(n){return{$:2,a:n}},cr=function(n){return{$:0,a:n}},vr={$:1},sr=t((function(n,r){return f(C,n,w(r))})),br=e((function(n,r,t){for(;;){if(!t.b)return r;var e=t.b,u=n,a=f(n,t.a,r);n=u,r=a,t=e}})),lr=function(n){return o(br,nr,g,n)},dr=u((function(n,r,t,e){return{$:0,a:n,b:r,c:t,d:e}})),hr=[],$r=_,gr=t((function(n,r){return L(r)/L(n)})),mr=$r(f(gr,2,32)),pr=c(dr,0,mr,hr,hr),yr=A,wr=F,Ar=function(n){return n.length},jr=t((function(n,r){return b(n,r)>0?n:r})),kr=j,_r=t((function(n,r){for(;;){var t=f(kr,32,n),e=t.b,u=f(nr,{$:0,a:t.a},r);if(!e.b)return lr(u);n=e,r=u}})),Fr=t((function(n,r){for(;;){var t=$r(r/32);if(1===t)return f(kr,32,n).a;n=f(_r,n,g),r=t}})),Br=t((function(n,r){if(r.a){var t=32*r.a,e=wr(f(gr,32,t-1)),u=n?lr(r.d):r.d,a=f(Fr,u,r.a);return c(dr,Ar(r.c)+t,f(jr,5,e*mr),a,r.c)}return c(dr,Ar(r.c),mr,hr,r.c)})),Lr=a((function(n,r,t,e,u){for(;;){if(0>r)return f(Br,!1,{d:e,a:t/32|0,c:u});var a={$:1,a:o(yr,32,r,n)};n=n,r=r-32,t=t,e=f(nr,a,e),u=u}})),Cr=t((function(n,r){if(n>0){var t=n%32;return v(Lr,r,n-t-32,n,g,o(yr,t,n-t,r))}return pr})),Nr=function(n){return!n.$},Er=function(n){return{$:0,a:n}},Tr=function(n){switch(n.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},xr=function(n){return n},qr=M,zr=qr(0),Or=u((function(n,r,t,e){if(e.b){var u=e.a,a=e.b;if(a.b){var i=a.a,v=a.b;if(v.b){var s=v.a,b=v.b;if(b.b){var l=b.b;return f(n,u,f(n,i,f(n,s,f(n,b.a,t>500?o(br,n,r,lr(l)):c(Or,n,r,t+1,l)))))}return f(n,u,f(n,i,f(n,s,r)))}return f(n,u,f(n,i,r))}return f(n,u,r)}return r})),Pr=e((function(n,r,t){return c(Or,n,r,0,t)})),Rr=t((function(n,r){return o(Pr,t((function(r,t){return f(nr,n(r),t)})),g,r)})),Ir=Y,Mr=t((function(n,r){return f(Ir,(function(r){return qr(n(r))}),r)})),Sr=e((function(n,r,t){return f(Ir,(function(r){return f(Ir,(function(t){return qr(f(n,r,t))}),t)}),r)})),Yr=function(n){return o(Pr,Sr(nr),qr(g),n)},Dr=tn,Gr=t((function(n,r){var t=r;return J(f(Ir,Dr(n),t))}));Z.Task=nn(zr,e((function(n,r){return f(Mr,(function(){return 0}),Yr(f(Rr,Gr(n),r)))})),e((function(){return qr(0)})),t((function(n,r){return f(Mr,n,r)})));un("Task");var Jr,Wr=Dn,Qr=function(n){return{$:1,a:n}},Hr=t((function(n,r){return{$:0,a:n,b:r}})),Kr=function(n){var r=n.b;return f(Hr,1664525*n.a+r>>>0,r)},Ur=function(n){var r=n.a,t=277803737*(r^r>>>4+(r>>>28));return(t>>>22^t)>>>0},Vr=t((function(n,r){return function(t){var e,u=Kr(t),a=0>(e=r-n)?-e:e,i=Ur(u);return d((134217728*(1*(67108863&Ur(t)))+1*(134217727&i))/9007199254740992*a+n,Kr(u))}})),Xr=(Jr=xr,S((function(n){n(M(Jr(Date.now())))}))),Zr=f(Ir,(function(n){return qr((r=n,t=Kr(f(Hr,0,1013904223)),Kr(f(Hr,t.a+r>>>0,t.b))));var r,t}),Xr),nt=t((function(n,r){return n(r)})),rt=e((function(n,r,t){if(r.b){var e=r.b,u=f(nt,r.a,t),a=u.b;return f(Ir,(function(){return o(rt,n,e,a)}),f(Dr,n,u.a))}return qr(t)})),tt=e((function(n,r,t){return qr(t)})),et=t((function(n,r){var t=r;return function(r){var e=t(r),u=e.b;return d(n(e.a),u)}}));Z.Random=nn(Zr,rt,tt,t((function(n,r){return f(et,n,r)})));var ut=un("Random"),at=t((function(n,r){return ut(f(et,n,r))})),it=u((function(n,r,t,e){for(;;){if(1>r)return d(n,e);var u=t(e),a=u.b;n=f(nr,u.a,n),r=r-1,t=t,e=a}})),ft=t((function(n,r){var t=r;return function(r){return c(it,g,n,t,r)}})),ot=e((function(n,r,t){var e=r,u=t;return function(r){var t=e(r),a=t.a,i=u(t.b),o=i.b;return d(f(n,a,i.a),o)}})),ct=Hn,vt=f(at,Qr,f(ft,10,o(ot,t((function(n,r){return{aQ:f(ct,0,0),P:n,Y:r,ar:f(ct,0,0)}})),f(Vr,.1,1),o(ot,ct,f(Vr,0,600),f(Vr,0,600))))),st=function(n){return{$:0,a:n}},bt=t((function(n,r){return{$:0,a:n,b:r}})),lt=t((function(n,r){return{bt:r,bB:n}})),dt={$:-2},ht=dt,$t=qr(f(lt,ht,ht)),gt=l,mt=t((function(n,r){n:for(;;){if(-2===r.$)return vr;var t=r.c,e=r.d,u=r.e;switch(f(gt,n,r.b)){case 0:n=n,r=e;continue n;case 1:return cr(t);default:n=n,r=u;continue n}}})),pt=a((function(n,r,t,e,u){return{$:-1,a:n,b:r,c:t,d:e,e:u}})),yt=a((function(n,r,t,e,u){if(-1!==u.$||u.a){if(-1!==e.$||e.a||-1!==e.d.$||e.d.a)return v(pt,n,r,t,e,u);var a=e.d;s=e.e;return v(pt,0,e.b,e.c,v(pt,1,a.b,a.c,a.d,a.e),v(pt,1,r,t,s,u))}var i=u.b,f=u.c,o=u.d,c=u.e;if(-1!==e.$||e.a)return v(pt,n,i,f,v(pt,0,r,t,e,o),c);var s;return v(pt,0,r,t,v(pt,1,e.b,e.c,e.d,s=e.e),v(pt,1,i,f,o,c))})),wt=e((function(n,r,t){if(-2===t.$)return v(pt,0,n,r,dt,dt);var e=t.a,u=t.b,a=t.c,i=t.d,c=t.e;switch(f(gt,n,u)){case 0:return v(yt,e,u,a,o(wt,n,r,i),c);case 1:return v(pt,e,u,r,i,c);default:return v(yt,e,u,a,i,o(wt,n,r,c))}})),At=e((function(n,r,t){var e=o(wt,n,r,t);if(-1!==e.$||e.a)return e;return v(pt,1,e.b,e.c,e.d,e.e)})),jt=t((function(n,r){var t=n.a,e=n.b,u=f(mt,t,r);return o(At,t,1===u.$?y([e]):f(nr,e,u.a),r)})),kt=function(n){return S((function(r){var t=n.f;2===t.$&&t.c&&t.c(),n.f=null,r(M(0))}))},_t=e((function(n,r,t){for(;;){if(-2===t.$)return r;var e=t.e,u=n,a=o(n,t.b,t.c,o(_t,n,r,t.d));n=u,r=a,t=e}})),Ft=i((function(n,r,u,a,i,f){var v=o(_t,e((function(t,e,a){n:for(;;){var i=a.a,f=a.b;if(i.b){var v=i.a,s=v.a,l=v.b,h=i.b;if(0>b(s,t)){t=t,e=e,a=d(h,o(n,s,l,f));continue n}return b(s,t)>0?d(i,o(u,t,e,f)):d(h,c(r,s,l,e,f))}return d(i,o(u,t,e,f))}})),d(tr(a),f),i),s=v.a,l=v.b;return o(br,t((function(r,t){return o(n,r.a,r.b,t)})),l,s)})),Bt=en,Lt=Qn,Ct=J,Nt=e((function(n,r,t){if(r.b){var e=r.a,u=r.b,a=Ct(f(Lt,e,f(Bt,n,e)));return f(Ir,(function(r){return o(Nt,n,u,o(At,e,r,t))}),a)}return qr(t)})),Et=e((function(n,r,t){var a=t.bt,i=e((function(n,r,t){var e=t.c;return h(t.a,t.b,f(Ir,(function(){return e}),kt(r)))})),c=o(br,jt,ht,r),v=s(Ft,e((function(n,r,t){var e=t.b,u=t.c;return h(f(nr,n,t.a),e,u)})),u((function(n,r,t,e){var u=e.c;return h(e.a,o(At,n,t,e.b),u)})),i,c,a,h(g,ht,qr(0))),b=v.a,l=v.b;return f(Ir,(function(n){return qr(f(lt,c,n))}),f(Ir,(function(){return o(Nt,n,b,l)}),v.c))})),Tt=e((function(n,r,t){var e=f(mt,r,t.bB);if(1===e.$)return qr(t);var u=e.a;return f(Ir,(function(){return qr(t)}),f(Ir,(function(r){return Yr(f(Rr,(function(t){return f(Dr,n,t(r))}),u))}),Xr))})),xt=e((function(n,r,t){return n(r(t))}));Z.Time=nn($t,Et,Tt,0,t((function(n,r){return f(bt,r.a,f(xt,n,r.b))})));var qt,zt,Ot,Pt=un("Time"),Rt=t((function(n,r){return Pt(f(bt,n,r))})),It=Kn,Mt=Un,St=e((function(n,r,t){return f(It,t,f(Mt,1/r,n))})),Yt=function(n){return 30*n},Dt=function(n){return new Float64Array([n.B,n.C])},Gt=function(n){return{B:n[0],C:n[1]}},Jt=function(n){var r=f(ct,.01,0),t=Yt(n.P),e=Gt(f(It,n.ar,o(St,r,n.P,o(St,f(ct,0,.1),n.P,f(ct,0,0))))),u=Gt(f(It,n.Y,Dt(e))),a=0>b(u.B,t)?t:b(u.B,600-t)>0?600-t:u.B,i=0>b(u.C,t)?t:b(u.C,600-t)>0?600-t:u.C,c=0>b(u.B,t)||b(u.B,600-t)>0?-1*e.B:e.B,v=0>b(u.C,t)||b(u.C,600-t)>0?-1*e.C:e.C;return $(n,{Y:f(ct,a,i),ar:f(ct,c,v)})},Wt=function(n){return{$:2,m:n}}(g),Qt=t((function(n,r){return d($(r,n.$?{L:n.a}:{L:f(Rr,Jt,r.L)}),Wt)})),Ht=c(u((function(n,r,t,e){return{$:0,a:n,b:r,c:t,d:e}})),0,0,0,1),Kt=hn(function(n){return"script"==n?"p":n}("http://www.w3.org/2000/svg")),Ut=Kt("circle"),Vt=t((function(n,r){return f(gn,function(n){return/^(on|formAction$)/i.test(n)?"data-"+n:n}(n),function(n){return/^\s*(javascript:|data:text\/html)/i.test(n)?"":n}(r))})),Xt=N,Zt=function(n){switch(n.$){case 0:return Xt(n.a)+"cm";case 1:return Xt(n.a)+"em";case 2:return Xt(n.a)+"ex";case 3:return Xt(n.a)+"in";case 4:return Xt(n.a)+"mm";case 5:return Xt(n.a);case 6:return Xt(n.a)+"pc";case 7:return Xt(n.a)+"%";case 8:return Xt(n.a)+"pt";default:return Xt(n.a)+"px"}},ne=function(n){return f(Vt,"cy",Zt(n))},re=B,te=function(n){var r,t,e=n.b,u=n.c,a=n.d,i=function(n){return re(1e4*n)/100};return r=y(["rgba(",Xt(i(n.a)),"%,",Xt(i(e)),"%,",Xt(i(u)),"%,",Xt((t=a,re(1e3*t)/1e3)),")"]),f(sr,"",r)},ee=function(n){return n.$?"none":te(n.a)},ue=f(xt,Vt("fill"),ee),ae=function(n){return{$:9,a:n}},ie=function(n){return f(Vt,"r",Zt(n))},fe=function(n){var r,t,e=n.P,u=Gt(n.Y),a=u.C;return f(Ut,y([(t=ae(u.B),f(Vt,"cx",Zt(t))),ne(ae(a)),ie(ae(Yt(e))),ue((r=Ht,{$:0,a:r}))]),g)},oe=function(n){return f(Vt,"height",Zt(n))},ce=ue({$:1}),ve=Kt("rect"),se=function(n){return f(Vt,"width",Zt(n))},be=f(ve,y([se(ae(600)),oe(ae(600)),ce,(zt=Ht,f(Vt,"stroke",te(zt))),(qt=ae(3),f(Vt,"stroke-width",Zt(qt)))]),g),le=Kt("svg"),de=u((function(n,r,t,e){return f(Vt,"viewBox",f(sr," ",f(Rr,Xt,y([n,r,t,e]))))})),he=Wr({b3:function(){return d({L:g},vt)},cs:function(){return f(Rt,20,st)},cy:Qt,cz:function(n){return f(le,y([se(ae(600)),oe(ae(600)),c(de,0,0,600,600)]),f(nr,be,f(Rr,fe,n.L)))}});Ot={Forces:{ManyBalls:{init:he(Er(0))(0)}}},n.Elm?function n(r,t){for(var e in t)e in r?"init"==e?k(6):n(r[e],t[e]):r[e]=t[e]}(n.Elm,Ot):n.Elm=Ot}(window);