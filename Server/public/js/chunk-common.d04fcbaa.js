(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[0],{"1d9a":function(e,t,n){"use strict";var r=n("970b"),i=n.n(r),o=n("5bc3"),a=n.n(o),s=(n("d3b7"),n("e6cf"),n("2a19"));t["a"]=new(function(){function e(){i()(this,e)}return a()(e,[{key:"validate",value:function(e,t,n){var r=this;return e.validate().then((function(e){e?t():(r.showFormError(),n&&n())}))}},{key:"validateAsync",value:function(e){var t=this;return new Promise((function(n,r){e.validate().then((function(e){e?n():(t.showFormError(),r())})).catch(r)}))}},{key:"showMessage",value:function(e){s["a"].create({message:e,textColor:"white"})}},{key:"showErrorMsg",value:function(e){s["a"].create({message:e,textColor:"white",color:"negative",icon:"priority_high"})}},{key:"showSuccessMsg",value:function(e){s["a"].create({message:e,textColor:"white",color:"positive",icon:"check"})}},{key:"showFormError",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Existem erros no formulário, revise-o salve novamente.";this.showErrorMsg(e)}}]),e}())},"2ab1":function(e,t,n){"use strict";n.d(t,"a",(function(){return k}));var r=n("7037"),i=n.n(r),o=n("ded3"),a=n.n(o),s=n("278c"),u=n.n(s),c=n("7ec2"),l=n.n(c),d=n("c973"),v=n.n(d),h=n("970b"),p=n.n(h),f=n("5bc3"),m=n.n(f),g=n("9523"),b=n.n(g),k=(n("4fadc"),n("14d9"),function(){function e(){p()(this,e)}return m()(e,null,[{key:"loadList",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.onLoad,n=e.onError,r=e.onSuccess,i=e.loadList,o=e.auto;return new this.FetchAll(t,n,r,i,o)}},{key:"load",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.onLoad,n=e.onError,r=e.onSuccess,i=e.toLoad,o=e.auto;return new this.Fetch(t,n,r,i,o)}}]),e}());b()(k,"FetchAll",function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];p()(this,e),this.loadList=i,this.onError=n,this.onLoad=t,this.onSuccess=r,this.loading=!1,this.dataLoaded=!1,this.auto=o,this.result={},this.error=[],this.auto&&this.autoLoad()}return m()(e,[{key:"autoLoad",value:function(){var e=v()(l()().mark((function e(){return l()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadAll();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"hasError",get:function(){var e;return!(null===(e=this.error)||void 0===e||!e.length)}},{key:"loadAll",value:function(){var e=v()(l()().mark((function e(){var t,n,r,o,s,c,d,v,h,p,f,m=arguments;return l()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=m.length>0&&void 0!==m[0]?m[0]:null,e.prev=1,this.error=[],this.loading=!0,o=0,s=Object.entries(this.loadList);case 5:if(!(o<s.length)){e.next=32;break}c=u()(s[o],2),d=c[0],v=c[1],h={},null!==n&&Object.prototype.hasOwnProperty.call(n,d)&&(h=a()(a()({},h),null===(p=n[d])||void 0===p?void 0:p.options)),e.prev=9,e.t0=i()(v),e.next="function"===e.t0?13:"object"===e.t0?17:23;break;case 13:return e.next=15,v(a()({},h));case 15:return this.result[d]=e.sent,e.abrupt("break",24);case 17:if(Object.prototype.hasOwnProperty.call(v,"options")&&(h=a()(a()({},v["options"]),h)),!Object.prototype.hasOwnProperty.call(v,"load")){e.next=22;break}return e.next=21,v["load"](a()({},h));case 21:this.result[d]=e.sent;case 22:return e.abrupt("break",24);case 23:return e.abrupt("break",24);case 24:e.next=29;break;case 26:e.prev=26,e.t1=e["catch"](9),console.log(e.t1);case 29:o++,e.next=5;break;case 32:if(!this.hasError){e.next=35;break}return null===(f=this.onError)||void 0===f||f.call(this,this.error),e.abrupt("return",null);case 35:this.dataLoaded=!0,null===(r=this.onSuccess)||void 0===r||r.call(this,this.result),e.next=43;break;case 39:e.prev=39,e.t2=e["catch"](1),console.log(e.t2),this.error.push(e.t2);case 43:return e.prev=43,this.loading=!1,e.finish(43);case 46:return null===(t=this.onLoad)||void 0===t||t.call(this,{result:this.result}),e.abrupt("return",this.result);case 48:case"end":return e.stop()}}),e,this,[[1,39,43,46],[9,26]])})));function t(){return e.apply(this,arguments)}return t}()}]),e}()),b()(k,"Fetch",function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3?arguments[3]:void 0,o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];p()(this,e),this.onLoad=t,this.onError=n,this.onSuccess=r,this.toLoad=i,this.auto=o,this.loading=!1,this.dataLoaded=!1,this.result={},this.error=[],this.auto&&this.autoLoad()}return m()(e,[{key:"autoLoad",value:function(){var e=v()(l()().mark((function e(){return l()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.load();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"hasError",get:function(){var e;return!(null===(e=this.error)||void 0===e||!e.length)}},{key:"load",value:function(){var e=v()(l()().mark((function e(){var t,n,r,o,s=arguments;return l()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=s.length>0&&void 0!==s[0]?s[0]:null,e.prev=1,this.loading=!0,n={},null!==t&&(n=a()(a()({},n),t)),e.t0=i()(this.toLoad),e.next="function"===e.t0?8:"object"===e.t0?12:18;break;case 8:return e.next=10,this.toLoad(a()({},n));case 10:return this.result=e.sent,e.abrupt("break",19);case 12:if(Object.prototype.hasOwnProperty.call(this.toLoad,"options")&&(n=a()(a()({},this.toLoad["options"]),n)),!Object.prototype.hasOwnProperty.call(this.toLoad,"load")){e.next=17;break}return e.next=16,this.toLoad["load"](a()({},n));case 16:this.result=e.sent;case 17:return e.abrupt("break",19);case 18:return e.abrupt("break",19);case 19:this.dataLoaded=!0,e.next=27;break;case 22:e.prev=22,e.t1=e["catch"](1),console.log(e.t1),this.error.push(e.t1),null===(r=this.onError)||void 0===r||r.call(this,this.error);case 27:return e.prev=27,this.loading=!1,null===(o=this.onLoad)||void 0===o||o.call(this,{result:this.result}),e.finish(27);case 31:return e.abrupt("return",this.result);case 32:case"end":return e.stop()}}),e,this,[[1,22,27,31]])})));function t(){return e.apply(this,arguments)}return t}()}]),e}())},9516:function(e,t,n){"use strict";var r=n("7ec2"),i=n.n(r),o=n("c973"),a=n.n(o),s=n("970b"),u=n.n(s),c=n("5bc3"),l=n.n(c),d=n("23c8"),v=function(){function e(){u()(this,e)}return l()(e,[{key:"getPatient",value:function(){var e=a()(i()().mark((function e(t){var n,r,o;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.id,e.next=3,d["a"].get("/api/patient/".concat(n));case 3:return r=e.sent,o=r.data,e.abrupt("return",null===o||void 0===o?void 0:o.content);case 6:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getPatientList",value:function(){var e=a()(i()().mark((function e(){var t,n;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].get("/api/patient/");case 2:return t=e.sent,n=t.data,e.abrupt("return",null===n||void 0===n?void 0:n.content);case 5:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"postPatient",value:function(){var e=a()(i()().mark((function e(t){var n,r;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].post("/api/patient",t);case 2:return n=e.sent,r=n.data,e.abrupt("return",null===r||void 0===r?void 0:r.content);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}();t["a"]=new v},a9e7:function(e,t,n){var r={"./carpometacarpal_thumb_-_abduction.jpg":["c2ef",14],"./carpometacarpal_thumb_-_extension.jpg":["dfaa",15],"./carpometacarpal_thumb_-_flexion.jpg":["e5a4",16],"./elbow_-_extension-flexion.jpg":["b40d",17],"./metacarpophalangeal_-_abduction-adduction.jpg":["00a5",18],"./metacarpophalangeal_-_extension.jpg":["0469",19],"./metacarpophalangeal_-_flexion.jpg":["43c0",20],"./proximal_interphalangeal_-_extension.jpg":["6ae3",21],"./proximal_interphalangeal_-_flexion.jpg":["3e70",22],"./radioulnar_-_pronation.jpg":["57fe",23],"./radioulnar_-_supnation.jpg":["feee",24],"./shoulder_-_abduction.jpg":["539b",25],"./shoulder_-_adduction.jpg":["7f12",26],"./shoulder_-_extension.jpg":["fdec",27],"./shoulder_-_external_rotation.jpg":["bb3b",28],"./shoulder_-_flexion.jpg":["db70",29],"./shoulder_-_internal_rotation.jpg":["f949",30],"./wrist_-_extension.jpg":["f6f7",31],"./wrist_-_flexion.jpg":["e5d7",32],"./wrist_-_radial_adduction.jpg":["d34e",33],"./wrist_-_ulnar_adduction.jpg":["5998",34]};function i(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],i=t[0];return n.e(t[1]).then((function(){return n.t(i,7)}))}i.keys=function(){return Object.keys(r)},i.id="a9e7",e.exports=i},ac99:function(e,t,n){"use strict";var r=n("7ec2"),i=n.n(r),o=n("c973"),a=n.n(o),s=n("970b"),u=n.n(s),c=n("5bc3"),l=n.n(c),d=n("23c8"),v=function(){function e(){u()(this,e)}return l()(e,[{key:"getMetadata",value:function(){var e=a()(i()().mark((function e(){var t,n;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].get("/api/session/metadata");case 2:return t=e.sent,n=t.data,e.abrupt("return",null===n||void 0===n?void 0:n.content);case 5:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getSession",value:function(){var e=a()(i()().mark((function e(t){var n,r,o;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.id,e.next=3,d["a"].get("/api/session/".concat(n));case 3:return r=e.sent,o=r.data,e.abrupt("return",null===o||void 0===o?void 0:o.content);case 6:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getSessionList",value:function(){var e=a()(i()().mark((function e(){var t,n;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].get("/api/session");case 2:return t=e.sent,n=t.data,e.abrupt("return",null===n||void 0===n?void 0:n.content);case 5:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getMensurationList",value:function(){var e=a()(i()().mark((function e(){var t,n;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].get("/api/session");case 2:return t=e.sent,n=t.data,e.abrupt("return",null===n||void 0===n?void 0:n.content);case 5:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"postSession",value:function(){var e=a()(i()().mark((function e(t){var n,r;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].post("/api/session",t);case 2:return n=e.sent,r=n.data,e.abrupt("return",null===r||void 0===r?void 0:r.content);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getCalculationVariabilityCenter",value:function(){var e=a()(i()().mark((function e(t){var n,r,o;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.sessionId,e.next=3,d["a"].get("/api/session/".concat(n,"/scilab"));case 3:return r=e.sent,o=r.data,e.abrupt("return",null===o||void 0===o?void 0:o.content);case 6:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}();t["a"]=new v},c2aa:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var r=n("7ec2"),i=n.n(r),o=n("c973"),a=n.n(o),s=n("ded3"),u=n.n(s),c=n("970b"),l=n.n(c),d=n("5bc3"),v=n.n(d),h=(n("e260"),n("d3b7"),n("ddb0"),n("7db0"),n("a4d3"),n("e01a"),n("e6cf"),n("3ca3"),n("c740"),n("14d9"),n("a434"),n("159b"),function(){function e(t){l()(this,e),this.metadata={},this.indexList=[0],this.defaultMovement={index:0,type:"",label:"",selectedMovementObj:null,image:null,description:"",sensors:[]},this.defaultSensor={sensorName:"",position:"",device:{active:!1,measurementInProgress:!1},file:null,gyro_measurements:[]},this.running_movement=null,this.values={selectedProcedureObj:null,procedure:"",type:t,movements:[u()({},this.defaultMovement)]}}return v()(e,[{key:"restart",value:function(){this.indexList=[0],this.values={selectedProcedureObj:null,procedure:"",type:"REAL",movements:[u()({},this.defaultMovement)]}}},{key:"addedMovements",get:function(){return this.values.movements}},{key:"load",value:function(e){var t=e.metadata;this.metadata=t}},{key:"actualRunningMovement",get:function(){var e,t=this;return null===(e=this.values.movements)||void 0===e?void 0:e.find((function(e){var n;return(null===e||void 0===e?void 0:e.index)===(null===(n=t.running_movement)||void 0===n?void 0:n.index)}))}},{key:"procedures",get:function(){var e;return null===(e=this.metadata)||void 0===e?void 0:e.procedures}},{key:"procedureSelected",get:function(){var e;return""!==(null===(e=this.values)||void 0===e?void 0:e.procedure)}},{key:"getSelectedProcedure",get:function(){return this.values.selectedProcedureObj}},{key:"getPositions",get:function(){var e;return null===(e=this.getSelectedProcedure)||void 0===e?void 0:e.sensor_positions}},{key:"getMovementsList",get:function(){var e,t,n=this;return null===(e=this.procedures)||void 0===e||null===(t=e.find((function(e){var t;return e.value===(null===(t=n.values)||void 0===t?void 0:t.procedure)})))||void 0===t?void 0:t.rules}},{key:"findProcedure",value:function(e){return this.procedures.find((function(t){return t.value===e}))}},{key:"findMovement",value:function(e){return this.getMovementsList.find((function(t){return t.value===e}))}},{key:"selectProcedure",value:function(){var e=a()(i()().mark((function e(t){return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.values.selectedProcedureObj=this.findProcedure(t);case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"selectMovement",value:function(){var e=a()(i()().mark((function e(t,r){var o,a;return i()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,o=this.findMovement(t),this.values.movements[r].selectedMovementObj=o,this.values.movements[r].description=o.description,this.values.movements[r].label=o.movement_name,null===o||void 0===o||!o.image){e.next=10;break}return e.next=8,n("a9e7")("./".concat(o.image));case 8:a=e.sent,null!==a&&(this.values.movements[r].image=a.default);case 10:e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"checkIndexInList",value:function(e){var t,n=null===(t=this.indexList)||void 0===t?void 0:t.findIndex((function(t){return t===e}));return-1===n?e:this.checkIndexInList(e+1)}},{key:"addMovement",value:function(){var e=this.checkIndexInList(0);this.indexList.push(e);var t={index:e};this.values.movements.push(u()(u()({},this.defaultMovement),t))}},{key:"removeMovement",value:function(e){var t,n,r=this,i=this.indexList.findIndex((function(t){var n;return t===(null===(n=r.values)||void 0===n?void 0:n.movements[e].index)}));-1!==i&&(this.indexList.splice(i,1),null===(t=this.values)||void 0===t||null===(n=t.movements)||void 0===n||n.splice(e,1),this.values.movements.length<1&&(this.running_movement=null))}},{key:"minSensor",get:function(){var e;return null===(e=this.values.selectedProcedureObj)||void 0===e?void 0:e.min_sensor}},{key:"addSensorsToMovement",value:function(e){this.values.movements[this.running_movement.index].sensors=e,this.running_movement=null}},{key:"allSessionCompleted",value:function(){var e,t;null===(e=this.session.values)||void 0===e||null===(t=e.movements)||void 0===t||t.forEach((function(e){var t;null===(t=e.sensors)||void 0===t||t.forEach((function(e){e.gyro_measurements.length}))}))}},{key:"checkMovementsMeasurements",get:function(){var e,t,n,r,i;return(null===(e=this.session)||void 0===e||null===(t=e.values)||void 0===t?void 0:t.movements.length)<1||(null===(n=this.session)||void 0===n||null===(r=n.values)||void 0===r||null===(i=r.movements)||void 0===i?void 0:i.some((function(e){return e.sensors.length<1||e.sensors.some((function(e){return e.gyro_measurements.length<1}))})))}}]),e}()),p=function(){function e(){l()(this,e)}return v()(e,null,[{key:"create",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.type,n=void 0===t?"REAL":t;return new h(n)}}]),e}()},d698:function(e,t,n){"use strict";var r=n("ded3"),i=n.n(r),o=n("7ec2"),a=n.n(o),s=n("c973"),u=n.n(s),c=n("970b"),l=n.n(c),d=n("5bc3"),v=n.n(d),h=n("ed6d"),p=n.n(h),f=n("2d0d"),m=n.n(f),g=(n("d3b7"),n("e6cf"),n("1b40")),b=function(e){p()(n,e);var t=m()(n);function n(){return l()(this,n),t.apply(this,arguments)}return v()(n,null,[{key:"Show",value:function(){var e=u()(a()().mark((function e(t){var n,r=this;return a()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.options,e.abrupt("return",new Promise((function(e,t){r.prototype.$q.dialog(n).onOk((function(){return e()})).onCancel((function(){return t()}))})));case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"asyncDialog",value:function(){var e=u()(a()().mark((function e(t,n){var r=this;return a()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){r.prototype.$q.dialog(i()({component:t},n)).onOk((function(t){return e(t)})).onCancel((function(t){return e(t)})).onDismiss((function(t){return e(t)}))})));case 1:case"end":return e.stop()}}),e)})));function t(t,n){return e.apply(this,arguments)}return t}()}]),n}(g["f"]);t["a"]=b}}]);