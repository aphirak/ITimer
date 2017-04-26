webpackJsonp([2],{1234:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(1),c=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n(41),s=n(79),f=n(158),p=n(1259),d=n(1242),_=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(d),E=_.getUserById,y=_.patchUserById,b=function(e){function t(){return r(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),i(t,[{key:"componentDidMount",value:function(){void 0===this.props.user&&this.props.dispatch((0,s.push)("/user"))}},{key:"render",value:function(){return c.default.createElement(p.FormUser,{title:"Edit User",handleSubmit:this.props.handleSubmit,reset:this.props.reset})}}]),t}(a.Component),m=function(e,t){if(e.user.value.hasOwnProperty(t.params.user_id)){var n=e.user.value[t.params.user_id];return{username:n.username,firstname:n.firstname,lastname:n.lastname,nickname:n.nickname}}return{}},S=function(e,t){return{initialValues:m(e,t),user:e.user.value[t.params.user_id]}},T=function(e,t){return{onSubmit:function(n){e(y(n,t.params.user_id))},getUserById:function(t){e(E(t))}}};t.default=(0,l.connect)(S,T)((0,f.reduxForm)({form:"editUserForm"})(b))},1237:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(264),u=function(e){return e&&e.__esModule?e:{default:e}}(r),o=function(){return{type:"GET_COMPETITIONS_REQUEST"}},i=function(e){return{type:"GET_COMPETITIONS_SUCCESS",payload:e}};t.default=function(){return function(e){e(o()),(0,u.default)("http://128.199.136.67:9090").on("competitions",function(t){e(i(t))})}}},1238:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.resetCompetitions=t.getCompetitions=void 0;var u=n(1237),o=r(u),i=n(1239),a=r(i);t.getCompetitions=o.default,t.resetCompetitions=a.default},1239:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157);t.default=function(e){return function(e){return e(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/competitions",headers:{Accept:"application/json","Content-Type":"application/json"},method:"DELETE",types:["RESET_COMPETTIONS_REQUEST","RESET_COMPETTIONS_SUCCESS","RESET_COMPETTIONS_FAILURE"]}))}}},1240:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157);t.default=function(e){return function(t){return t(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/users/"+e+"/histories",headers:{Accept:"application/json","Content-Type":"application/json"},method:"GET",types:["GET_HISTORIES_BY_USER_ID_REQUEST","GET_HISTORIES_BY_USER_ID_SUCCESS","GET_HISTORIES_BY_USER_ID_FAILURE"]}))}}},1241:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getHistoriesByUserId=void 0;var r=n(1240),u=function(e){return e&&e.__esModule?e:{default:e}}(r);t.getHistoriesByUserId=u.default},1242:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1248);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var u=n(1238);Object.keys(u).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return u[e]}})});var o=n(1254);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})});var i=n(1241);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})});var a=n(1245);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})})},1243:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157);t.default=function(){return function(e){return e(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/wifis",headers:{Accept:"application/json","Content-Type":"application/json"},method:"GET",types:["GET_WIFI_REQUEST","GET_WIFI_SUCCESS","GET_WIFI_FAILURE"]}))}}},1244:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157);t.default=function(){return function(e){return e(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/wifis/connected",headers:{Accept:"application/json","Content-Type":"application/json"},method:"GET",types:["GET_WIFI_CONNECTED_REQUEST","GET_WIFI_CONNECTED_SUCCESS","GET_WIFI_CONNECTED_FAILURE"]}))}}},1245:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.postWifi=t.getWifiConnected=t.getWifi=void 0;var u=n(1243),o=r(u),i=n(1244),a=r(i),c=n(1246),l=r(c);t.getWifi=o.default,t.getWifiConnected=a.default,t.postWifi=l.default},1246:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157);t.default=function(e){return function(t){return t(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/wifis",headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(e),types:["POST_WIFI_REQUEST","POST_WIFI_SUCCESS","POST_WIFI_FAILURE"]}))}}},1247:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(264),u=function(e){return e&&e.__esModule?e:{default:e}}(r),o=function(){return{type:"GET_TIMER_REQUEST"}},i=function(e){return{type:"GET_TIMER_SUCCESS",payload:e}};t.default=function(){return function(e){e(o()),(0,u.default)("http://128.199.136.67:9090").on("timer",function(t){e(i(t))})}}},1248:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.getTimer=t.stopTimer=t.setupTimer=void 0;var u=n(1249),o=r(u),i=n(1250),a=r(i),c=n(1247),l=r(c);t.setupTimer=o.default,t.stopTimer=a.default,t.getTimer=l.default},1249:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157);t.default=function(e){return function(t){return t(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/timers",headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(e),types:["SETUP_TIMER_REQUEST","SETUP_TIMER_SUCCESS","SETUP_TIMER_FAILURE"]}))}}},1250:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157);t.default=function(e){return function(e){return e(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/timers",headers:{Accept:"application/json","Content-Type":"application/json"},method:"DELETE",types:["STOP_TIMER_REQUEST","STOP_TIMER_SUCCESS","STOP_TIMER_FAILURE"]}))}}},1251:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157),o=n(79);t.default=function(e){return function(t){return t(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/users/"+e,headers:{Accept:"application/json","Content-Type":"application/json"},method:"DELETE",types:["DELETE_USER_REQUEST",{type:"DELETE_USER_SUCCESS",payload:function(e,n,r){t((0,o.push)("/user"))}},"DELETE_USER_FAILURE"]}))}}},1252:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157);t.default=function(e){return function(t){return t(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/users/"+e,headers:{Accept:"application/json","Content-Type":"application/json"},method:"GET",types:["GET_USER_BY_ID_REQUEST","GET_USER_BY_ID_SUCCESS","GET_USER_BY_ID_FAILURE"]}))}}},1253:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157);t.default=function(){return function(e){return e(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/users",headers:{Accept:"application/json","Content-Type":"application/json"},method:"GET",types:["GET_USERS_REQUEST","GET_USERS_SUCCESS","GET_USERS_FAILURE"]}))}}},1254:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.patchUserById=t.deleteUserById=t.getUserById=t.postUser=t.getUsers=void 0;var u=n(1253),o=r(u),i=n(1256),a=r(i),c=n(1252),l=r(c),s=n(1251),f=r(s),p=n(1255),d=r(p);t.getUsers=o.default,t.postUser=a.default,t.getUserById=l.default,t.deleteUserById=f.default,t.patchUserById=d.default},1255:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157),o=n(79);t.default=function(e,t){return function(n){return n(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/users/"+t,headers:{Accept:"application/json","Content-Type":"application/json"},method:"PATCH",body:JSON.stringify(e),types:["PATCH_USER_REQUEST",{type:"PATCH_USER_SUCCESS",payload:function(e,r,u){return u.json().then(function(e){return n((0,o.push)("/user/"+t)),e})}},"PATCH_USER_FAILURE"]}))}}},1256:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var u=n(157),o=n(79);t.default=function(e){return function(t){return t(r({},u.CALL_API,{endpoint:"http://128.199.136.67:9090/api/users",headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(e),types:["POST_USERS_REQUEST",{type:"POST_USERS_SUCCESS",payload:function(e,n,r){return r.json().then(function(e){return t((0,o.push)("/user")),e})}},"POST_USERS_FAILURE"]}))}}},1258:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=n(1),o=function(e){return e&&e.__esModule?e:{default:e}}(u),i=n(158),a=function(e){var t=e.input,n=e.label,u=e.type,i=e.min,a=e.max,c=e.step;return o.default.createElement("div",null,o.default.createElement("label",null,n)," : ",o.default.createElement("input",r({},t,{type:u,min:i,max:a,step:c})),o.default.createElement("br",null))},c=function(e){var t=e.handleSubmit,n=e.title,r=e.reset;return o.default.createElement("div",{className:"has-text-centered"},o.default.createElement("div",{className:"heading"},o.default.createElement("h1",{className:"title"},o.default.createElement("strong",null,n))),o.default.createElement("hr",null),o.default.createElement("div",{className:"content"},o.default.createElement("form",{onSubmit:t,className:"form",action:"javascript:void(0)"},o.default.createElement(i.Field,{name:"username",component:a,type:"text",label:"Username",autoFocus:!0}),o.default.createElement(i.Field,{name:"firstname",component:a,type:"text",label:"Firstname"}),o.default.createElement(i.Field,{name:"lastname",type:"text",component:a,label:"Lastname"}),o.default.createElement(i.Field,{name:"nickname",type:"text",component:a,label:"Nickname"}),o.default.createElement("br",null),o.default.createElement("div",{className:"control is-grouped",style:{justifyContent:"center"}},o.default.createElement("div",{className:"control"},o.default.createElement("button",{className:"button is-success",type:"submit"},"Submit")),o.default.createElement("div",{className:"control"},o.default.createElement("button",{className:"button is-danger",type:"reset",onClick:r},"Reset"))))))};t.default=c},1259:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FormUser=void 0;var r=n(1258),u=function(e){return e&&e.__esModule?e:{default:e}}(r);t.FormUser=u.default}});