(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"096d":function(t,e,n){"use strict";var a=n("7ec2"),r=n.n(a),s=n("c973"),c=n.n(s),i=n("970b"),u=n.n(i),o=n("5bc3"),l=n.n(o),p=n("23c8"),d=function(){function t(){u()(this,t)}return l()(t,[{key:"getSensorsList",value:function(){var t=c()(r()().mark((function t(){var e,n;return r()().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].get("/api/sensor/list");case 2:return e=t.sent,n=e.data,t.abrupt("return",null===n||void 0===n?void 0:n.content);case 5:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()}]),t}();e["a"]=new d},"7ae8":function(t,e,n){},ac99:function(t,e,n){"use strict";var a=n("7ec2"),r=n.n(a),s=n("c973"),c=n.n(s),i=n("970b"),u=n.n(i),o=n("5bc3"),l=n.n(o),p=n("23c8"),d=function(){function t(){u()(this,t)}return l()(t,[{key:"getMetadata",value:function(){var t=c()(r()().mark((function t(e){var n,a;return r()().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].get("/api/session/metadata");case 2:return n=t.sent,a=n.data,t.abrupt("return",null===a||void 0===a?void 0:a.content);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getSession",value:function(){var t=c()(r()().mark((function t(e){var n,a;return r()().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].get("/api/session/".concat(e));case 2:return n=t.sent,a=n.data,t.abrupt("return",null===a||void 0===a?void 0:a.content);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getSessionList",value:function(){var t=c()(r()().mark((function t(){var e,n;return r()().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].get("/api/session");case 2:return e=t.sent,n=e.data,t.abrupt("return",null===n||void 0===n?void 0:n.content);case 5:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"getMensurationList",value:function(){var t=c()(r()().mark((function t(){var e,n;return r()().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].get("/api/session");case 2:return e=t.sent,n=e.data,t.abrupt("return",null===n||void 0===n?void 0:n.content);case 5:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"postSession",value:function(){var t=c()(r()().mark((function t(e){var n,a;return r()().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].post("/api/session",e);case 2:return n=t.sent,a=n.data,t.abrupt("return",null===a||void 0===a?void 0:a.content);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getCalculationVariabilityCenter",value:function(){var t=c()(r()().mark((function t(e){var n,a;return r()().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].get("/api/session/".concat(e,"/scilab"));case 2:return n=t.sent,a=n.data,t.abrupt("return",null===a||void 0===a?void 0:a.content);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()}]),t}();e["a"]=new d},dcac:function(t,e,n){"use strict";n("7ae8")},f2fc:function(t,e,n){"use strict";n.r(e);var a,r,s=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("q-page",{staticClass:"home"},[null!==t.metadata?e("div",{staticClass:"column justify-center content-center"},[e("span",{staticClass:"col text-center"},[t._v("\n      Para configurar os sensorer para realizar as medições é necessario\n      configurá los para sua rede wi-fi, conecte a rede wi-fi aberta geradas\n      pelos sensorer e no navegador siga para o endereço a seguir.\n      "),e("a",{attrs:{href:"http://192.168.4.1",target:"_blank"}},[t._v("Sensor manager")])]),e("div",{staticClass:"ip"},[e("span",{staticClass:"col text-center m-t-25"},[t._v("IP SERVIDOR PARA O SENSOR")]),e("span",{staticClass:"col text-black text-center",staticStyle:{"font-size":"36px","font-weight":"bolder"}},[t._v("\n        "+t._s(t.metadata.socket_url)+"\n      ")])]),e("div",{staticClass:"ip"},[e("span",{staticClass:"col text-center m-t-25"},[t._v("IP SERVIDOR PARA O SENSOR")]),t._l(t.listSensor,(function(n,a){return e("span",{key:a,staticClass:"col text-black text-center",staticStyle:{"font-size":"36px","font-weight":"bolder"}},[e("a",{attrs:{href:"http://".concat(n.ip),target:"_blank"}},[t._v(t._s(n.ip))])])}))],2)]):t._e()])},c=[],i=n("7ec2"),u=n.n(i),o=n("c973"),l=n.n(o),p=n("970b"),d=n.n(p),f=n("5bc3"),v=n.n(f),h=n("3c96"),w=n.n(h),g=n("ed6d"),b=n.n(g),x=n("2d0d"),k=n.n(x),y=n("9523"),m=n.n(y),S=(n("99af"),n("1b40")),_=n("ac99"),C=n("096d"),O=(a=Object(S["a"])({name:"home"}),a(r=function(t){b()(n,t);var e=k()(n);function n(){var t;d()(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return t=e.call.apply(e,[this].concat(r)),m()(w()(t),"loadingMetadata",!1),m()(w()(t),"metadata",null),m()(w()(t),"listSensor",[]),t}return v()(n,[{key:"mounted",value:function(){var t=l()(u()().mark((function t(){return u()().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.loadingMetadata=!0,t.next=4,_["a"].getMetadata();case 4:return this.metadata=t.sent,t.next=7,C["a"].getSensorsList();case 7:this.listSensor=this.sensorsOptions=t.sent,t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0);case 13:return t.prev=13,this.loadingMetadata=!1,t.finish(13);case 16:case"end":return t.stop()}}),t,this,[[0,10,13,16]])})));function e(){return t.apply(this,arguments)}return e}()}]),n}(S["e"]))||r),R=O,P=R,M=(n("dcac"),n("2877")),A=n("9989"),E=n("eebe"),I=n.n(E),L=Object(M["a"])(P,s,c,!1,null,"1acaf683",null);e["default"]=L.exports;I()(L,"components",{QPage:A["a"]})}}]);