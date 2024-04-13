/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/config","sap/base/util/now"],function(e,n){"use strict";var t={};t.Level={NONE:-1,FATAL:0,ERROR:1,WARNING:2,INFO:3,DEBUG:4,TRACE:5,ALL:5+1};var o=[],i={"":t.Level.ERROR},r=3e3,s=null,l=false;function f(e,n){return("000"+String(e)).slice(-n)}function c(e){return!e||isNaN(i[e])?i[""]:i[e]}function a(){var e=o.length;if(e){var n=Math.min(e,Math.floor(r*.7));if(s){s.onDiscardLogEntries(o.slice(0,e-n))}if(n){o=o.slice(-n,e)}else{o=[]}}}function u(){if(!s){s={listeners:[],onLogEntry:function(e){for(var n=0;n<s.listeners.length;n++){if(s.listeners[n].onLogEntry){s.listeners[n].onLogEntry(e)}}},onDiscardLogEntries:function(e){for(var n=0;n<s.listeners.length;n++){if(s.listeners[n].onDiscardLogEntries){s.listeners[n].onDiscardLogEntries(e)}}},attach:function(e,n){if(n){s.listeners.push(n);if(n.onAttachToLog){n.onAttachToLog(e)}}},detach:function(e,n){for(var t=0;t<s.listeners.length;t++){if(s.listeners[t]===n){if(n.onDetachFromLog){n.onDetachFromLog(e)}s.listeners.splice(t,1);return}}}}}return s}t.fatal=function(e,n,o,i){g(t.Level.FATAL,e,n,o,i)};t.error=function(e,n,o,i){g(t.Level.ERROR,e,n,o,i)};t.warning=function(e,n,o,i){g(t.Level.WARNING,e,n,o,i)};t.info=function(e,n,o,i){g(t.Level.INFO,e,n,o,i)};t.debug=function(e,n,o,i){g(t.Level.DEBUG,e,n,o,i)};t.trace=function(e,n,o,i){g(t.Level.TRACE,e,n,o,i)};t.setLevel=function(e,n,o){n=n||"";if(!o||i[n]==null){i[n]=e;var r;Object.keys(t.Level).forEach(function(n){if(t.Level[n]===e){r=n}});g(t.Level.INFO,"Changing log level "+(n?"for '"+n+"' ":"")+"to "+r,"","sap.base.log")}};t.getLevel=function(e){return c(e)};t.isLoggable=function(e,n){return(e==null?t.Level.DEBUG:e)<=c(n)};t.logSupportInfo=function(e){l=e};function g(e,i,u,g,L){if(!L&&!g&&typeof u==="function"){L=u;u=""}if(!L&&typeof g==="function"){L=g;g=""}if(e<=c(g)){var h=n(),v=new Date(h),p=Math.floor((h-Math.floor(h))*1e3),E={time:f(v.getHours(),2)+":"+f(v.getMinutes(),2)+":"+f(v.getSeconds(),2)+"."+f(v.getMilliseconds(),3)+f(p,3),date:f(v.getFullYear(),4)+"-"+f(v.getMonth()+1,2)+"-"+f(v.getDate(),2),timestamp:h,level:e,message:String(i||""),details:String(u||""),component:String(g||"")};if(l&&typeof L==="function"){E.supportInfo=L()}if(r){if(o.length>=r){a()}o.push(E)}if(s){s.onLogEntry(E)}if(console){var d=u instanceof Error,b=E.date+" "+E.time+" "+E.message+" - "+E.details+" "+E.component;switch(e){case t.Level.FATAL:case t.Level.ERROR:d?console.error(b,"\n",u):console.error(b);break;case t.Level.WARNING:d?console.warn(b,"\n",u):console.warn(b);break;case t.Level.INFO:if(console.info){d?console.info(b,"\n",u):console.info(b)}else{d?console.log(b,"\n",u):console.log(b)}break;case t.Level.DEBUG:d?console.debug(b,"\n",u):console.debug(b);break;case t.Level.TRACE:d?console.trace(b,"\n",u):console.trace(b);break}if(console.info&&E.supportInfo){console.info(E.supportInfo)}}return E}}t.getLogEntries=function(){return o.slice()};t.getLogEntriesLimit=function(){return r};t.setLogEntriesLimit=function(e){if(e<0){throw new Error("The log entries limit needs to be greater than or equal to 0!")}r=e;if(o.length>=r){a()}};t.addLogListener=function(e){u().attach(this,e)};t.removeLogListener=function(e){u().detach(this,e)};function L(e){this.fatal=function(n,o,i,r){t.fatal(n,o,i||e,r);return this};this.error=function(n,o,i,r){t.error(n,o,i||e,r);return this};this.warning=function(n,o,i,r){t.warning(n,o,i||e,r);return this};this.info=function(n,o,i,r){t.info(n,o,i||e,r);return this};this.debug=function(n,o,i,r){t.debug(n,o,i||e,r);return this};this.trace=function(n,o,i,r){t.trace(n,o,i||e,r);return this};this.setLevel=function(n,o){t.setLevel(n,o||e);return this};this.getLevel=function(n){return t.getLevel(n||e)};this.isLoggable=function(n,o){return t.isLoggable(n,o||e)}}t.getLogger=function(e,n){if(!isNaN(n)&&i[e]==null){i[e]=n}return new L(e)};const h=e.get({name:"sapUiLogLevel",type:e.Type.String,defaultValue:undefined,external:true});if(h){t.setLevel(t.Level[h.toUpperCase()]||parseInt(h))}else if(!globalThis["sap-ui-optimized"]){t.setLevel(t.Level.DEBUG)}return t});
//# sourceMappingURL=Log.js.map