(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"0cdf":function(e,n,t){"use strict";t("7890")},"127c":function(e,n,t){},"1d9a":function(e,n,t){"use strict";var a=t("970b"),r=t.n(a),s=t("5bc3"),i=t.n(s),o=(t("d3b7"),t("e6cf"),t("2a19"));n["a"]=new(function(){function e(){r()(this,e)}return i()(e,[{key:"validate",value:function(e,n,t){var a=this;return e.validate().then((function(e){e?n():(a.showFormError(),t&&t())}))}},{key:"validateAsync",value:function(e){var n=this;return new Promise((function(t,a){e.validate().then((function(e){e?t():(n.showFormError(),a())})).catch(a)}))}},{key:"showMessage",value:function(e){o["a"].create({message:e,textColor:"white"})}},{key:"showErrorMsg",value:function(e){o["a"].create({message:e,textColor:"white",color:"negative",icon:"priority_high"})}},{key:"showSuccessMsg",value:function(e){o["a"].create({message:e,textColor:"white",color:"positive",icon:"check"})}},{key:"showFormError",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Existem erros no formulário, revise-o salve novamente.";this.showErrorMsg(e)}}]),e}())},"4e95":function(e,n,t){"use strict";t("ff24")},7890:function(e,n,t){},9210:function(e,n,t){"use strict";t("a69a")},9495:function(e,n,t){},"94b2":function(e,n,t){"use strict";t("127c")},9516:function(e,n,t){"use strict";var a=t("7ec2"),r=t.n(a),s=t("c973"),i=t.n(s),o=t("970b"),c=t.n(o),l=t("5bc3"),u=t.n(l),d=t("23c8"),f=function(){function e(){c()(this,e)}return u()(e,[{key:"getPatient",value:function(){var e=i()(r()().mark((function e(n){var t,a;return r()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].get("/api/patient/".concat(n));case 2:return t=e.sent,a=t.data,e.abrupt("return",null===a||void 0===a?void 0:a.content);case 5:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"getPatientList",value:function(){var e=i()(r()().mark((function e(){var n,t;return r()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].get("/api/patient/");case 2:return n=e.sent,t=n.data,e.abrupt("return",null===t||void 0===t?void 0:t.content);case 5:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()},{key:"postPatient",value:function(){var e=i()(r()().mark((function e(n){var t,a;return r()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].post("/api/patient",n);case 2:return t=e.sent,a=t.data,e.abrupt("return",null===a||void 0===a?void 0:a.content);case 5:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()}]),e}();n["a"]=new f},a69a:function(e,n,t){},b431:function(e,n,t){"use strict";t("f68e")},e810:function(e,n,t){"use strict";t("9495")},ed70:function(e,n,t){"use strict";t.r(n);var a,r,s,i,o,c,l,u,d,f,p,v,b,m,h,g,y=function(){var e=this,n=e._self._c;e._self._setupProxy;return n("section",{staticClass:"responsive-height"},[n("div",{staticClass:"row responsive-content form-column form-column__padding"},[n("q-card",{staticClass:"col grid-session",attrs:{bordered:"",flat:""}},[n("div",{staticClass:"col"},[n("q-tabs",{staticClass:"col text-grey",attrs:{"active-color":"primary",align:"justify",dense:"","indicator-color":"primary","narrow-indicator":""},model:{value:e.tabPanel,callback:function(n){e.tabPanel=n},expression:"tabPanel"}},[n("q-tab",{attrs:{icon:"leaderboard",label:"Grafico",name:"Tab_1"}}),e._l(e.sensors,(function(e,t){return n("q-tab",{key:t,attrs:{icon:"table_rows",label:"Spreadsheet "+(t+1),name:"Tab_"+(t+2)}})}))],2),n("q-separator"),n("q-tab-panels",{attrs:{animated:""},model:{value:e.tabPanel,callback:function(n){e.tabPanel=n},expression:"tabPanel"}},[n("q-tab-panel",{attrs:{name:"Tab_1"}},[n("tab-graph",{attrs:{data:e.sensorsData,label:"Graph"}})],1),e._l(e.sensors,(function(t,a){return n("q-tab-panel",{key:a,attrs:{name:"Tab_"+(a+2)}},[n("tab-measurement-table",{attrs:{data:t.gyro_measurements,patient:e.bean,label:"Spreadsheet "+(a+1)}})],1)}))],2)],1),n("div",{staticClass:"col"},[n("q-card-section",{directives:[{name:"show",rawName:"v-show",value:e.numberOfConnections>=2,expression:"numberOfConnections >= 2"}],staticClass:"col form-column form-column__gap"},[n("div",{staticClass:"col form-lines form-lines__gap form-lines__no-padding"},[n("q-btn",{staticClass:"col",attrs:{color:"primary",label:"Iniciar",size:"md",unelevated:""},on:{click:e.sendStart}}),n("q-btn",{staticClass:"col",attrs:{color:"primary",label:"Pausar",size:"md",unelevated:""},on:{click:e.sendStop}})],1),n("div",{staticClass:"col form-lines form-lines__gap form-lines__no-padding"},[n("q-btn",{staticClass:"col",attrs:{color:"primary",label:"Reinicia",size:"md",unelevated:""},on:{click:e.sendRestart}})],1)]),n("q-card-section",{staticClass:"col"},[n("q-list",{staticClass:"rounded-borders",attrs:{bordered:""}},[n("sensor-expansion",{attrs:{sensors:e.sensors},on:{addSensor:e.addSensor,connectSensor:function(n){return e.connectSensor(n)},disconnectSensor:function(n){return e.disconnectSensor(n)},calibrateSensor:function(n){return e.calibrateSensor(n)}}}),n("patient-expansion",{attrs:{bean:e.bean}}),n("complete-session-expansion",{attrs:{"session-bean":e.sessionBean,"number-of-measurements":e.numberOfMeasurements,"loading-save":e.loadingSave},on:{saveSession:e.saveSession}})],1)],1),n("q-card-section",[e.inDev?n("q-btn",{attrs:{color:"primary",label:"add leitura",size:"md",unelevated:""},on:{click:e.addLeituraTeste}}):e._e()],1)],1)])],1)])},_=[],w=t("ded3"),k=t.n(w),x=t("7ec2"),S=t.n(x),C=t("c973"),O=t.n(C),T=t("c86f"),M=t.n(T),A=t("970b"),q=t.n(A),D=t("5bc3"),F=t.n(D),E=t("3c96"),P=t.n(E),Y=t("ed6d"),Q=t.n(Y),I=t("2d0d"),j=t.n(I),R=t("9523"),B=t.n(R),N=t("53ec"),z=t.n(N),L=(t("d400"),t("99af"),t("e9c4"),t("d81d"),t("1b40")),G=function(){var e=this,n=e._self._c;e._self._setupProxy;return e.graphDataLength?n("div",{staticClass:"div-vc"},[n("span",[e._v("teste")]),n("div",{ref:"eChart",staticClass:"col chart",attrs:{id:"eChart"}})]):e._e()},Z=[],$=(t("d3b7"),t("25f0"),t("313e")),X=(a=Object(L["a"])({name:"tab-graph"}),r=Object(L["b"])(),s=Object(L["b"])({type:Array,default:[]}),a((o=function(e){Q()(t,e);var n=j()(t);function t(){var e;q()(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return e=n.call.apply(n,[this].concat(r)),M()(P()(e),"label",c,P()(e)),M()(P()(e),"data",l,P()(e)),B()(P()(e),"myChart",null),e}return F()(t,[{key:"graphDataLength",get:function(){var e,n;return null!==this.myChart?this.redrawChart():this.createChart(),null===(e=this.data[0])||void 0===e||null===(n=e.gyro_measurements)||void 0===n?void 0:n.length}},{key:"graphData",get:function(){return this.data}},{key:"createChart",value:function(){console.log("createChart"),this.myChart=$["b"](document.getElementById("eChart"),null,{toolbox:{feature:{dataZoom:{yAxisIndex:"none"},restore:{},saveAsImage:{},dataView:{readOnly:!0},magicType:{type:["line","bar"]}}},title:{left:"center",text:"Actual session"},yAxis:{boundaryGap:[0,"100%"],type:"value"},renderer:"svg",dataZoom:[{type:"inside",start:0,end:10},{start:0,end:10}],tooltip:{trigger:"axis",position:function(e){return[e[0],"10%"]}}})}},{key:"redrawChart",value:function(){console.log("redrawChart");var e=[],n=0;while(n<(null===(t=this.graphData[0].gyro_measurements)||void 0===t?void 0:t.length)){var t;e.push(n)}var a={xAxis:{type:"category",boundaryGap:!1,axisLine:{onZero:!0},data:e},series:[]};this.graphData.map((function(e){var n=Math.floor(16777215*Math.random()).toString(16),t=Math.floor(16777215*Math.random()).toString(16);a.series.push({name:e.sensorName,type:"line",symbol:"none",sampling:"lttb",itemStyle:{color:n},areaStyle:{color:new $["a"].LinearGradient(0,0,0,1,[{offset:0,color:t},{offset:1,color:n}])},data:e.gyro_measurements})})),this.myChart.setOption(a)}}]),t}(L["d"]),c=z()(o.prototype,"label",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l=z()(o.prototype,"data",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i=o))||i),H=X,J=H,W=(t("4e95"),t("2877")),V=Object(W["a"])(J,G,Z,!1,null,"5d2d25d6",null),K=V.exports,U=function(){var e=this,n=e._self._c;e._self._setupProxy;return n("q-table",{staticClass:"panels",attrs:{columns:e.tableColumns,data:e.data,fullscreen:e.openedFullscreen,title:e.label,color:"primary",flat:"",bordered:""},scopedSlots:e._u([{key:"top-right",fn:function(){return[n("q-btn",{staticClass:"col-2 m-r-5",attrs:{label:e.$q.platform.is.mobile?null:"Export",color:"primary",dense:"","icon-right":"archive","no-caps":""},on:{click:e.exportTable}}),n("q-btn",{staticClass:"col-2",attrs:{icon:e.openedFullscreen?"close_fullscreen":"width_full",label:e.$q.platform.is.mobile?null:e.openedFullscreen?"Close":"Fullscreen",color:"primary",dense:"","no-caps":""},on:{click:e.openFullscreen}})]},proxy:!0}])})},ee=[],ne=(t("a15b"),t("ac1f"),t("1276"),t("b0c0"),t("5319"),t("a357")),te=t("c1df"),ae=t.n(te),re=(u=Object(L["a"])({field:"tab-measurement-table"}),d=Object(L["b"])(),f=Object(L["b"])(),p=Object(L["b"])({type:Array,default:[{}]}),u((b=function(e){Q()(t,e);var n=j()(t);function t(){var e;q()(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return e=n.call.apply(n,[this].concat(r)),M()(P()(e),"patient",m,P()(e)),M()(P()(e),"label",h,P()(e)),M()(P()(e),"data",g,P()(e)),B()(P()(e),"openedFullscreen",!1),B()(P()(e),"tableColumns",[{align:"center",field:"sensorName",label:"sensorName"},{align:"center",field:"hourMensuration",label:"hourMensuration"},{align:"center",field:"numberMensuration",label:"numberMensuration"},{align:"center",field:"Acc_X",label:"Acc_X"},{align:"center",field:"Acc_Y",label:"Acc_Y"},{align:"center",field:"Acc_Z",label:"Acc_Z"},{align:"center",field:"AccelX_mss",label:"AccelX_mss"},{align:"center",field:"AccelY_mss",label:"AccelY_mss"},{align:"center",field:"AccelZ_mss",label:"AccelZ_mss"},{align:"center",field:"Gyr_X",label:"Gyr_X"},{align:"center",field:"Gyr_Y",label:"Gyr_Y"},{align:"center",field:"Gyr_Z",label:"Gyr_Z"},{align:"center",field:"Mag_X",label:"Mag_X"},{align:"center",field:"Mag_Y",label:"Mag_Y"},{align:"center",field:"Mag_Z",label:"Mag_Z"},{align:"center",field:"Roll",label:"Roll"},{align:"center",field:"Pitch",label:"Pitch"},{align:"center",field:"Yaw",label:"Yaw"}]),e}return F()(t,[{key:"openFullscreen",value:function(){this.openedFullscreen=!this.openedFullscreen}},{key:"exportTable",value:function(){var e=this;function n(e,n){var t=void 0!==n?n(e):e;return t=void 0===t||null===t?"":String(t),t=t.split('"').join('""'),'"'.concat(t,'"')}var t=[this.tableColumns.map((function(e){return n(e.label)}))].concat(this.data.map((function(t){return e.tableColumns.map((function(e){return n("function"===typeof e.field?e.field(t):t[(e.field,e.field)],e.format)})).join(",")}))).join("\r\n"),a=Object(ne["a"])(this.patient.name+"_"+this.label.replace(/\s/g,"")+"_"+ae.a.now()+".csv",t,"text/csv");!0!==a&&this.$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})}}]),t}(L["d"]),m=z()(b.prototype,"patient",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),h=z()(b.prototype,"label",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),g=z()(b.prototype,"data",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),v=b))||v),se=re,ie=se,oe=(t("94b2"),t("eaac")),ce=t("9c40"),le=t("eebe"),ue=t.n(le),de=Object(W["a"])(ie,U,ee,!1,null,"37d53a12",null),fe=de.exports;ue()(de,"components",{QTable:oe["a"],QBtn:ce["a"]});var pe,ve,be,me,he,ge=function(){var e=this,n=e._self._c;e._self._setupProxy;return n("div",{staticClass:"col"},[n("q-expansion-item",{attrs:{"expand-separator":"",icon:"perm_identity",label:"Patient"}},[n("q-card",[n("q-card-section",{staticClass:"form-lines form-lines__gap patient-expansion"},[n("q-field",{attrs:{color:"black",filled:"",label:"Nome","stack-label":""}},[e._v("\n          "+e._s(e.bean.name)+"\n        ")]),n("q-field",{attrs:{color:"black",filled:"",label:"CPF","stack-label":""}},[e._v("\n          "+e._s(e.bean.cpf)+"\n        ")]),n("q-field",{attrs:{color:"black",filled:"",label:"Telefone","stack-label":""}},[e._v("\n          "+e._s(e.bean.phone)+"\n        ")]),n("q-field",{attrs:{color:"black",filled:"",label:"Data de Nascimento","stack-label":""}},[e._v("\n          "+e._s(e.filterDate(e.bean.birthday))+"\n        ")]),n("q-field",{attrs:{color:"black",filled:"",label:"Email","stack-label":""}},[e._v("\n          "+e._s(e.bean.email)+"\n        ")]),n("q-field",{attrs:{color:"black",filled:"",label:"Altura","stack-label":""}},[e._v("\n          "+e._s(e.bean.stature)+"\n        ")])],1)],1)],1)],1)},ye=[],_e=t("f8ec"),we=(pe=Object(L["a"])({name:"patient-expansion"}),ve=Object(L["b"])(),pe((me=function(e){Q()(t,e);var n=j()(t);function t(){var e;q()(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return e=n.call.apply(n,[this].concat(r)),M()(P()(e),"bean",he,P()(e)),e}return F()(t,[{key:"filterDate",value:function(e){return _e["a"].getDateFormated(e)}}]),t}(L["d"]),he=z()(me.prototype,"bean",[ve],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),be=me))||be),ke=we,xe=ke,Se=(t("b431"),t("3b73")),Ce=t("f09f"),Oe=t("a370"),Te=t("8572"),Me=Object(W["a"])(xe,ge,ye,!1,null,"6b2ef56f",null),Ae=Me.exports;ue()(Me,"components",{QExpansionItem:Se["a"],QCard:Ce["a"],QCardSection:Oe["a"],QField:Te["a"]});var qe,De,Fe,Ee,Pe,Ye=function(){var e=this,n=e._self._c;e._self._setupProxy;return n("div",{staticClass:"col"},[n("q-expansion-item",{attrs:{"expand-separator":"",icon:"sensor_window",label:"Session"}},[n("q-card",[n("q-card-section",[n("q-tabs",{staticClass:"text-grey",attrs:{"active-color":"primary",align:"justify",dense:"","indicator-color":"primary","narrow-indicator":""},model:{value:e.tab,callback:function(n){e.tab=n},expression:"tab"}},[n("q-tab",{attrs:{icon:"add",label:"Sensor",name:"maisSensor"},on:{click:e.addSensor}}),e._l(e.sensors,(function(e,t){return n("q-tab",{key:t,attrs:{"content-class":e.device.corTab,label:e.sensorName,name:e.tab_name,icon:"sensors"}})}))],2)],1),n("q-separator"),n("q-tab-panels",{attrs:{animated:""},model:{value:e.tab,callback:function(n){e.tab=n},expression:"tab"}},e._l(e.sensors,(function(t,a){return n("q-tab-panel",{key:a,attrs:{name:t.tab_name}},[n("div",{staticClass:"title-header"},[n("div",{staticClass:"text-h6"},[e._v("\n              "+e._s(t.label)+"\n            ")]),n("q-btn",{attrs:{loading:e.loading,flat:"",icon:"refresh"},on:{click:e.listSensorsLoad}})],1),n("q-form",[n("div",{staticClass:"row form-lines form-lines__gap"},[e.sensorsOptions.length?n("q-select",{directives:[{name:"show",rawName:"v-show",value:!t.device.active,expression:"!sensor.device.active"}],attrs:{options:e.sensorsOptions,"emit-value":"",filled:"",label:"Sensors available","option-label":"ip","option-value":"ip"},model:{value:t.device.ip,callback:function(n){e.$set(t.device,"ip",n)},expression:"sensor.device.ip"}}):e._e(),n("q-input",{staticClass:"row",attrs:{disable:t.device.active,label:"IP "+t.sensorName,filled:"",type:"text"},model:{value:t.device.ip,callback:function(n){e.$set(t.device,"ip",n)},expression:"sensor.device.ip"}}),t.device.active?e._e():n("q-btn",{staticClass:"row",attrs:{disable:t.device.active,color:t.device.corBtn,label:"Connect",size:"lg",unelevated:""},on:{click:function(n){return e.connect(a)}}}),n("q-btn",{directives:[{name:"show",rawName:"v-show",value:t.device.active,expression:"sensor.device.active"}],staticClass:"row",attrs:{color:t.device.corBtn,label:"Calibrate",size:"lg",unelevated:""},on:{click:function(n){return e.calibrate(a)}}}),n("q-btn",{directives:[{name:"show",rawName:"v-show",value:t.device.active,expression:"sensor.device.active"}],staticClass:"row",attrs:{color:t.device.corBtn,label:"Disconnect",size:"lg",unelevated:""},on:{click:function(n){return e.disconnect(a)}}})],1)])],1)})),1)],1)],1)],1)},Qe=[],Ie=t("23c8"),je=function(){function e(){q()(this,e)}return F()(e,[{key:"getSensorsList",value:function(){var e=O()(S()().mark((function e(){var n,t;return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Ie["a"].get("/api/sensor/list");case 2:return n=e.sent,t=n.data,e.abrupt("return",null===t||void 0===t?void 0:t.content);case 5:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()}]),e}(),Re=new je,Be=(qe=Object(L["a"])({name:"sensor-expansion"}),De=Object(L["b"])(),qe((Ee=function(e){Q()(t,e);var n=j()(t);function t(){var e;q()(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return e=n.call.apply(n,[this].concat(r)),B()(P()(e),"loading",!1),B()(P()(e),"tab","Sensor_1"),M()(P()(e),"sensors",Pe,P()(e)),B()(P()(e),"sensorsOptions",[]),e}return F()(t,[{key:"mounted",value:function(){var e=O()(S()().mark((function e(){return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.listSensorsLoad();case 2:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}()},{key:"listSensorsLoad",value:function(){var e=O()(S()().mark((function e(){return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.loading=!0,e.next=4,Re.getSensorsList();case 4:this.sensorsOptions=e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:return e.prev=10,this.loading=!1,e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[0,7,10,13]])})));function n(){return e.apply(this,arguments)}return n}()},{key:"connect",value:function(e){this.$emit("connectSensor",e)}},{key:"disconnect",value:function(e){this.$emit("disconnectSensor",e)}},{key:"addSensor",value:function(){this.$emit("addSensor")}},{key:"calibrate",value:function(e){this.$emit("calibrateSensor")}}]),t}(L["d"]),Pe=z()(Ee.prototype,"sensors",[De],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),Fe=Ee))||Fe),Ne=Be,ze=Ne,Le=(t("9210"),t("429b")),Ge=t("7460"),Ze=t("eb85"),$e=t("adad"),Xe=t("823b"),He=t("0378"),Je=t("ddd8"),We=t("27f9"),Ve=Object(W["a"])(ze,Ye,Qe,!1,null,"2f84ec50",null),Ke=Ve.exports;ue()(Ve,"components",{QExpansionItem:Se["a"],QCard:Ce["a"],QCardSection:Oe["a"],QTabs:Le["a"],QTab:Ge["a"],QSeparator:Ze["a"],QTabPanels:$e["a"],QTabPanel:Xe["a"],QBtn:ce["a"],QForm:He["a"],QSelect:Je["a"],QInput:We["a"]});var Ue,en,nn,tn,an,rn,sn,on,cn,ln,un,dn=function(){var e=this,n=e._self._c;e._self._setupProxy;return n("div",{staticClass:"col"},[n("q-expansion-item",{attrs:{"expand-separator":"",icon:"perm_identity",label:"Complete session"}},[n("q-form",{ref:"refForm",attrs:{greedy:""}},[n("q-card",[n("q-card-section",{staticClass:"form-lines form-lines__gap patient-expansion"},[n("q-input",{attrs:{rules:[e.$validators.notBlank],filled:"",label:"Weight",mask:"##.##",suffix:"Kg"},model:{value:e.sessionBean.weight,callback:function(n){e.$set(e.sessionBean,"weight",n)},expression:"sessionBean.weight"}}),n("q-btn",{staticClass:"col",attrs:{color:"primary",label:"Save",size:"md",unelevated:"",loading:e.loadingSave},on:{click:e.saveSession}})],1)],1)],1)],1)],1)},fn=[],pn=t("1d9a"),vn=(Ue=Object(L["a"])({name:"complete-session-expansion"}),en=Object(L["b"])(),nn=Object(L["b"])(),tn=Object(L["b"])(),an=Object(L["c"])("refForm"),Ue((sn=function(e){Q()(t,e);var n=j()(t);function t(){var e;q()(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return e=n.call.apply(n,[this].concat(r)),M()(P()(e),"sessionBean",on,P()(e)),M()(P()(e),"numberOfMeasurements",cn,P()(e)),M()(P()(e),"loadingSave",ln,P()(e)),M()(P()(e),"refForm",un,P()(e)),e}return F()(t,[{key:"saveSession",value:function(){var e=O()(S()().mark((function e(){return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,0!==this.numberOfMeasurements){e.next=4;break}return pn["a"].showErrorMsg("You need to take some measurements first"),e.abrupt("return");case 4:return e.next=6,pn["a"].validateAsync(this.refForm);case 6:this.$emit("saveSession"),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function n(){return e.apply(this,arguments)}return n}()}]),t}(L["d"]),on=z()(sn.prototype,"sessionBean",[en],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),cn=z()(sn.prototype,"numberOfMeasurements",[nn],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),ln=z()(sn.prototype,"loadingSave",[tn],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),un=z()(sn.prototype,"refForm",[an],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),rn=sn))||rn),bn=vn,mn=bn,hn=(t("e810"),Object(W["a"])(mn,dn,fn,!1,null,"8c8e0ee8",null)),gn=hn.exports;ue()(hn,"components",{QExpansionItem:Se["a"],QForm:He["a"],QCard:Ce["a"],QCardSection:Oe["a"],QInput:We["a"],QBtn:ce["a"]});var yn,_n,wn,kn,xn,Sn=t("2a19"),Cn=t("9516"),On=function(){function e(){q()(this,e)}return F()(e,[{key:"getSession",value:function(){var e=O()(S()().mark((function e(n){var t,a;return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Ie["a"].get("/api/session/".concat(n));case 2:return t=e.sent,a=t.data,e.abrupt("return",null===a||void 0===a?void 0:a.content);case 5:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"getSessionList",value:function(){var e=O()(S()().mark((function e(){var n,t;return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Ie["a"].get("/api/session");case 2:return n=e.sent,t=n.data,e.abrupt("return",null===t||void 0===t?void 0:t.content);case 5:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()},{key:"getMensurationList",value:function(){var e=O()(S()().mark((function e(){var n,t;return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Ie["a"].get("/api/session");case 2:return n=e.sent,t=n.data,e.abrupt("return",null===t||void 0===t?void 0:t.content);case 5:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()},{key:"postSession",value:function(){var e=O()(S()().mark((function e(n){var t,a;return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Ie["a"].post("/api/session",n);case 2:return t=e.sent,a=t.data,e.abrupt("return",null===a||void 0===a?void 0:a.content);case 5:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"getCalculationVariabilityCenter",value:function(){var e=O()(S()().mark((function e(n){var t,a;return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Ie["a"].get("/api/session/".concat(n,"/scilab"));case 2:return t=e.sent,a=t.data,e.abrupt("return",null===a||void 0===a?void 0:a.content);case 5:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()}]),e}(),Tn=new On,Mn=(yn=Object(L["a"])({name:"session",components:{TabMeasurementTable:fe,TabGraph:K,PatientExpansion:Ae,SensorExpansion:Ke,CompleteSessionExpansion:gn}}),_n=Object(L["b"])(),yn((kn=function(e){Q()(t,e);var n=j()(t);function t(){var e;q()(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return e=n.call.apply(n,[this].concat(r)),B()(P()(e),"tabPanel","Tab_1"),B()(P()(e),"bean",{}),B()(P()(e),"sessionBean",{}),B()(P()(e),"numberOfConnections",0),B()(P()(e),"loadingSave",!1),M()(P()(e),"idPatient",xn,P()(e)),B()(P()(e),"sensors",[{sensorName:"Sensor 1",tab_name:"Sensor_1",label:"Connect Sensor 1",device:{ip:"",active:!1,connection:null,corBtn:"primary",corTab:""},gyro_measurements:[]},{sensorName:"Sensor 2",tab_name:"Sensor_2",label:"Connect Sensor 2",device:{ip:"",active:!1,connection:null,corBtn:"primary",classTab:""},gyro_measurements:[]}]),e}return F()(t,[{key:"numberOfMeasurements",get:function(){return this.sensors[0].gyro_measurements.length}},{key:"inDev",get:function(){return!1}},{key:"mounted",value:function(){var e=O()(S()().mark((function e(){var n;return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n=this.$route.query.idPatient,e.next=4,this.dataLoad(n);case 4:console.log(this.bean),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function n(){return e.apply(this,arguments)}return n}()},{key:"sensorsData",get:function(){return this.sensors}},{key:"connectSensor",value:function(e){var n=this,t="ws://".concat(this.sensors[e].device.ip,":8080");this.sensors[e].device.connection=new WebSocket(t),this.sensors[e].device.connection.onmessage=function(t){var a=JSON.parse(t.data);n.addMensuration(a,e)},this.sensors[e].device.connection.onopen=function(t){n.setConnected(e);var a="Conexão com o sensor realizada com websocket...";Sn["a"].create({message:a,textColor:"white",color:"positive"})},this.sensors[e].device.connection.onerror=function(t){n.setDisconnected(e);var a="Error no websocket server...";Sn["a"].create({message:a,textColor:"white",color:"error"})},this.sensors[e].device.connection.onclose=function(t){n.setDisconnected(e);var a="Websocket desconectado do server...";Sn["a"].create({message:a,textColor:"white",color:"warning"})}}},{key:"disconnectSensor",value:function(e){this.sensors[e].device.connection.close(),this.setDisconnected(e)}},{key:"calibrateSensor",value:function(e){this.sensors[e].device.connection.send(JSON.stringify({cmd:4}))}},{key:"addMensuration",value:function(e,n){var t=this;e.map((function(e,a){t.sensors[n].measurements.push(e)}))}},{key:"setConnected",value:function(e){this.sensors[e].device.corBtn="positive",this.sensors[e].device.corTab="text-green",this.sensors[e].device.active=!0,this.numberOfConnections=this.numberOfConnections+1}},{key:"setDisconnected",value:function(e){this.sensors[e].device.corBtn="primary",this.sensors[e].device.corTab="",this.sensors[e].device.active=!1,this.numberOfConnections=this.numberOfConnections-1}},{key:"sendStart",value:function(){this.sensors.map((function(e,n){!0===e.device.active&&e.device.connection.send(JSON.stringify({cmd:1}))}))}},{key:"sendStop",value:function(){this.sensors.map((function(e,n){!0===e.device.active&&e.device.connection.send(JSON.stringify({cmd:2}))}))}},{key:"sendRestart",value:function(){this.sensors.map((function(e,n){!0===e.device.active&&(e.device.connection.send(JSON.stringify({cmd:3})),e.measurements=[])}))}},{key:"saveSession",value:function(){var e=O()(S()().mark((function e(){return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.loadingSave=!0,e.next=4,Tn.postSession({sessionParams:k()(k()({},this.sessionBean),{},{patientIdPatient:this.bean.idPatient}),sensors:this.sensors});case 4:e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:return e.prev=10,this.loadingSave=!1,e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[0,7,10,13]])})));function n(){return e.apply(this,arguments)}return n}()},{key:"dataLoad",value:function(){var e=O()(S()().mark((function e(n){return S()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Cn["a"].getPatient(n);case 3:this.bean=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,this,[[0,6]])})));function n(n){return e.apply(this,arguments)}return n}()},{key:"addSensor",value:function(){var e=this.sensors.length+1;this.sensors.push({sensorName:"Session "+e,tab_name:"Sensor_"+e,label:"Connect Sensor "+e,device:{ip:"",active:!1,connection:null,corBtn:"primary",classTab:""},gyro_measurements:[]})}},{key:"addLeituraTeste",value:function(){var e=this;console.log("addLeituraTeste");var n=0;while(n<1e3)n++,this.sensors.map((function(n,t){var a=n.gyro_measurements.length?n.gyro_measurements.length:0;n.gyro_measurements.push({sensorName:n.sensorName,hourMensuration:t,numberMensuration:a,Acc_X:t,Acc_Y:t,Acc_Z:t,AccelX_mss:t,AccelY_mss:t,AccelZ_mss:t,Gyr_X:t,Gyr_Y:t,Gyr_Z:t,Mag_X:t,Mag_Y:t,Mag_Z:t,Roll:e.getRandomArbitrary(90,80),Pitch:e.getRandomArbitrary(90,70),Yaw:e.getRandomArbitrary(90,70)})}))}},{key:"getRandomArbitrary",value:function(e,n){return Math.random()*(n-e)+e}}]),t}(L["d"]),xn=z()(kn.prototype,"idPatient",[_n],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),wn=kn))||wn),An=Mn,qn=An,Dn=(t("0cdf"),t("1c1c")),Fn=Object(W["a"])(qn,y,_,!1,null,"43d126a6",null);n["default"]=Fn.exports;ue()(Fn,"components",{QCard:Ce["a"],QTabs:Le["a"],QTab:Ge["a"],QSeparator:Ze["a"],QTabPanels:$e["a"],QTabPanel:Xe["a"],QCardSection:Oe["a"],QBtn:ce["a"],QList:Dn["a"]})},f68e:function(e,n,t){},f8ec:function(e,n,t){"use strict";var a=t("970b"),r=t.n(a),s=t("5bc3"),i=t.n(s),o=t("9523"),c=t.n(o),l=t("c1df"),u=t.n(l),d=function(){function e(){r()(this,e)}return i()(e,null,[{key:"nowIso",value:function(){return e.getDateTimeISOFormated()}},{key:"now",value:function(){return e.getDateTimeFormated()}},{key:"getDateTimeISOFormated",value:function(n){return u()(n).format(e.ISO_DATETIME_FORMAT)}},{key:"getDateISOFormated",value:function(n){return u()(n).format(e.ISO_DATE_FORMAT)}},{key:"getTimeISOFormated",value:function(n){return u()(n).format(e.ISO_TIME_FORMAT)}},{key:"getDateTimeFormated",value:function(n){return u()(n).format(e.DATETIME_FORMAT)}},{key:"getDateTimeSecondsFormated",value:function(n){return u()(n).format(e.DATETIME_SECONDS_FORMAT)}},{key:"getDateFormated",value:function(n){return u()(n).format(e.DATE_FORMAT)}},{key:"getTimeFormated",value:function(n){return u()(n).format(e.TIME_FORMAT)}}]),e}();c()(d,"ISO_DATETIME_FORMAT","YYYY-MM-DD[T]HH:mm:ss"),c()(d,"ISO_DATE_FORMAT","YYYY-MM-DD"),c()(d,"ISO_TIME_FORMAT","HH:mm:ss"),c()(d,"DATETIME_FORMAT","DD/MM/YYYY HH:mm"),c()(d,"DATETIME_SECONDS_FORMAT","DD/MM/YYYY HH:mm:ss"),c()(d,"DATE_FORMAT","DD/MM/YYYY"),c()(d,"TIME_FORMAT","HH:mm"),n["a"]=d},ff24:function(e,n,t){}}]);