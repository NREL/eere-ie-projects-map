!function e(t,n,r){function o(i,c){if(!n[i]){if(!t[i]){var s="function"==typeof require&&require;if(!c&&s)return s(i,!0);if(a)return a(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[i]={exports:{}};t[i][0].call(l.exports,(function(e){return o(t[i][1][e]||e)}),l,l.exports,e,t,n,r)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t,n){"use strict";var r=a(e("./spider.es6.js")),o=a(e("./geojson.min.js"));function a(e){return e&&e.__esModule?e:{default:e}}!function(){var e,t,n,a,i={googlekey:"1PeYaVWqSWABu6kWKI3VF48_iL-YLAyFJIo9j8Hnx73Y",url:"https://docs.google.com/spreadsheet/pub",qstring:"?hl=en_US&hl=en_US&output=html&key=",uiFilters:{State:[],Technology:[],Category:[]},mapCenter:[-95.84,37.81],mapZoom:3,mapboxToken:"pk.eyJ1IjoibnJlbCIsImEiOiJNOTcxYUhZIn0.Jc7TB_G2VQYs9e0S2laKcw",tileLayer:"mapbox://styles/energy/ckhc7eaqv0mjm19p3yr4jtlcw",mapContainer:"map",datatableContainer:"datatable",dataHeaders:["Project","Tribe","State","Year","Assistance Type","Category","Technology"]};function c(c){var u;(n=c).forEach((function(e){e.Project='<a target="_blank" href="'.concat(e.Link,'">').concat(e.Project,"</a>")})),function(e){var t=$("#ui-controls"),n={};Object.keys(i.uiFilters).forEach((function(t){n[t]=e.map((function(e){return e[t]})).sort().filter((function(e,t,n){return n.indexOf(e)===t}))})),t.find("[data-target]").each((function(e,t){var r,o,a,i=$(t).data().target;$(t).append((r=i,o=n,a=$("script").filter('[data-template="'+r+'"]').html(),Handlebars.compile(a)(o)))}))}(n),u=i,mapboxgl.accessToken="pk.eyJ1IjoibnJlbC1jb21hcHMiLCJhIjoiY2pveGNkcmFrMjdjeDNwcGR4cTF3c3ZhZiJ9.zrGPMAY7OCtiwuSXTWv0fQ",e=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/light-v10",center:u.mapCenter,zoom:u.mapZoom,maxZoom:13}),a=new r.default(e,{customPin:!0,initializeLeg:function(t){var n=$("<div>",{class:"spider-point-circle"}),o=t.feature;$(t.elements.pin).append(n),n.css({width:"30px",height:"30px","margin-left":"-15px","margin-top":"-15px","background-color":"rgba(8, 183, 241, 1)","border-radius":"50%"});var a="<h4>"+o.Tribe+"</h4>";a+="<h5>"+o.Project+"</h5>";var i=new mapboxgl.Popup({closeOnClick:!0,offset:r.default.popupOffsetForSpiderLeg(t)}).addTo(e);i.setHTML(a),t.mapboxMarker.setPopup(i)}}),s(i),function(r){var c=$("#ui-controls");e.on("load",(function(){var u=o.default.parse(r,{Point:["Latitude","Longitude"]});e.addSource("locations",{type:"geojson",data:u,cluster:!0,clusterMaxZoom:14,clusterRadius:50}),e.addLayer({id:"clusters",type:"circle",source:"locations",filter:["has","point_count"],paint:{"circle-color":["step",["get","point_count"],"rgba(8, 183, 241, 1)",10,"rgba(255, 201, 86, 1)",50,"rgba(232, 131, 32, 1)"],"circle-radius":20}}),e.addLayer({id:"cluster-count",type:"symbol",source:"locations",filter:["has","point_count"],layout:{"text-field":"{point_count_abbreviated}","text-font":["DIN Offc Pro Medium","Arial Unicode MS Bold"],"text-size":12}}),e.addLayer({id:"unclustered-point",type:"circle",source:"locations",filter:["!",["has","point_count"]],paint:{"circle-color":"rgba(8, 183, 241, 1)","circle-radius":20}}),e.addLayer({id:"unclustered-count",type:"symbol",source:"locations",filter:["!",["has","point_count"]],layout:{"text-field":"1","text-font":["DIN Offc Pro Medium","Arial Unicode MS Bold"],"text-size":12}}),e.on("zoomstart",(function(){a.unspiderfy()})),c.on("change","input, select",(function(){s(i),function(t){var n=o.default.parse(t,{Point:["Latitude","Longitude"]});n.features=n.features.filter((function(e){return t=e,n=i.uiFilters,r=!0,Object.keys(n).forEach((function(e){var o,a,i;t.properties[e]&&(o=t.properties[e].split(","),r=r&&(a=o,!(i=n[e]).length||i.some((function(e){return a.indexOf(e)>=0}))))})),r;var t,n,r})),e.getSource("locations").setData(n),function(t,n){var r=new mapboxgl.LngLatBounds;t.forEach((function(e){r.extend(e.geometry.coordinates)})),t.length?e.fitBounds(r,{maxZoom:5,padding:100}):(e.easeTo({center:n.mapCenter,zoom:n.mapZoom}),alert("No projects fit the criteria."))}(n.features,i)}(n),Object.keys(i.uiFilters).forEach((function(e){var n=i.dataHeaders.indexOf(e),r=i.uiFilters[e].map((function(e){return e=e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),"^".concat(e,"$")})).join("|");t.column(n).search(r,!0,!1)})),t.draw()})),e.on("click","clusters",(function(t){if("spider-point-circle"!==t.originalEvent.srcElement.className){var n=e.queryRenderedFeatures(t.point,{layers:["clusters"]}),r=n[0].properties.cluster_id;e.getSource("locations").getClusterExpansionZoom(r,(function(t,r){t||13!==e.getZoom()&&e.easeTo({center:n[0].geometry.coordinates,zoom:r})})),n.length&&13===e.getZoom()&&e.getSource("locations").getClusterLeaves(r,100,0,(function(e,t){if(e)return console.error("problem with leaf features",e);var r=t.map((function(e){return e.properties}));a.spiderfy(n[0].geometry.coordinates,r)}))}})),e.on("click","unclustered-point",(function(t){var n=t.features[0].geometry.coordinates.slice(),r="<h4>"+t.features[0].properties.Tribe+"</h4>";for(r+="<h5>"+t.features[0].properties.Project+"</h5>";Math.abs(t.lngLat.lng-n[0])>180;)n[0]+=t.lngLat.lng>n[0]?360:-360;(new mapboxgl.Popup).setLngLat(n).setHTML(r).addTo(e)}))}))}(n),function(e,t){var n=0;t.forEach((function(t){t.State===e&&n++})),$("#count-alaska").text(n)}("Alaska",n),function(e){var n=i.dataHeaders.map((function(e){return{title:e,data:e}})),r='<"row"<"col-sm-6"l><"col-sm-6"f>><"row"<"col-sm-12"tr>><"row"<"col-sm-5"p><"col-sm-7"i>>';t=$("#"+i.datatableContainer).DataTable({data:e,columns:n,dom:r,language:{search:"Search table:"}})}(n)}function s(e){Object.keys(e.uiFilters).forEach((function(t){var n=$('#ui-controls [data-target="'+t+'"] :checked');e.uiFilters[t].length=0,n.each((function(n,r){r.value.length&&e.uiFilters[t].push(r.value)}))}))}window.onload=function(){var e;e=i,Tabletop.init({key:e.url+e.qstring+e.googlekey,callback:c,simpleSheet:!0})},$(".map-navigation").on("click","a",(function(t){t.preventDefault();var n=$(t.delegateTarget).children().data("position");if(n){var r=n.split(",").reverse();e.easeTo({center:r,zoom:3})}}))}()},{"./geojson.min.js":2,"./spider.es6.js":3}],2:[function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e){function t(e){for(var t in e.geom={},e)e.hasOwnProperty(t)&&-1!==a.indexOf(t)&&(e.geom[t]=e[t],delete e[t]);!function(e){for(var t in e)e.hasOwnProperty(t)&&("string"==typeof e[t]?i.push(e[t]):"object"==r(e[t])&&(i.push(e[t][0]),i.push(e[t][1])));if(0===i.length)throw new Error("No geometry attributes specified")}(e.geom)}function n(e,t,n){var r={type:"Feature"};return r.geometry=function(e,t){var n={};for(var r in t.geom){var o=t.geom[r];"string"==typeof o&&e.hasOwnProperty(o)?(n.type=r,n.coordinates=e[o]):Array.isArray(o)&&e.hasOwnProperty(o[0])&&e.hasOwnProperty(o[1])&&(n.type=r,n.coordinates=[e[o[1]],e[o[0]]])}return n}(e,t),r.properties=n.call(e),r}function o(e){var t;return e.exclude||e.include?e.include?t=function(t){e.include.forEach((function(e){t[e]=this[e]}),this)}:e.exclude&&(t=function(t){for(var n in this)this.hasOwnProperty(n)&&-1===i.indexOf(n)&&-1===e.exclude.indexOf(n)&&(t[n]=this[n])}):t=function(e){for(var t in this)this.hasOwnProperty(t)&&-1===i.indexOf(t)&&(e[t]=this[t])},function(){var n={};return t.call(this,n),e.extra&&function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}(n,e.extra),n}}e.version="0.2.0",e.defaults={},e.parse=function(e,r,a){var c,s={type:"FeatureCollection",features:[]},u=function(e,t){var n=e||{};for(var r in t)t.hasOwnProperty(r)&&!n[r]&&(n[r]=t[r]);return n}(r,this.defaults);return i.length=0,t(u),c=o(u),e.forEach((function(e){s.features.push(n(e,u,c))})),function(e,t){if(t.crs&&(e.crs={type:"name",properties:{name:t.crs}}),t.bbox&&(e.bbox=t.bbox),t.extraGlobal)for(var n in e.properties={},t.extraGlobal)e.properties[n]=t.extraGlobal[n]}(s,u),a&&"function"==typeof a?void a(s):s};var a=["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"],i=[]}("object"==(void 0===t?"undefined":r(t))?t.exports:window.GeoJSON={})},{}],3:[function(e,t,n){"use strict";function r(e,t){var n={each:u,map:function(e,t){var n=[];return u(e,(function(e,r){n.push(t(e,r))})),n},mapTimes:function(e,t){var n=[];return l(e,(function(e){n.push(t(e))})),n},eachTimes:l},r=function(){},o={animate:!0,animationSpeed:30,customPin:!1,initializeLeg:r,onClick:r,circleSpiralSwitchover:9,circleFootSeparation:65,spiralFootSeparation:50,spiralLengthStart:40,spiralLengthFactor:8},a=2*Math.PI,i=[];for(var c in t)o[c]=t[c];function s(){n.each(i.reverse(),(function(e,t){o.animate?(e.elements.container.style.transitionDelay=o.animationSpeed/1e3/i.length*t+"s",e.elements.container.className+=" exit",setTimeout((function(){e.mapboxMarker.remove()}),o.animationSpeed+100)):e.mapboxMarker.remove()})),i=[]}function u(e,t){var n=0;if(!e||!e.length)return[];for(n=0;n<e.length;n++)t(e[n],n)}function l(e,t){if(!e)return[];for(var n=0;n<e;n++)t(n)}this.spiderfy=function(t,r){var c,u=(l=r.length,l>=o.circleSpiralSwitchover?function(e){var t=o.spiralLengthStart,r=0;return n.mapTimes(e,(function(e){var n;return r+=o.spiralFootSeparation/t+5e-4*e,n={x:t*Math.cos(r),y:t*Math.sin(r),angle:r,legLength:t,index:e},t+=a*o.spiralLengthFactor/r,n}))}(l):function(e){var t=o.circleFootSeparation*(2+e)/a,r=a/e;return n.mapTimes(e,(function(e){var n=e*r;return{x:t*Math.cos(n),y:t*Math.sin(n),angle:n,legLength:t,index:e}}))}(l));var l;s(),c=n.map(r,(function(e,n){var r,a,i=u[n],c=function(e){var t=document.createElement("div"),n=document.createElement("div"),r=document.createElement("div");return t.className="spider-leg-container"+(o.animate?" animate initial ":" "),r.className="spider-leg-line",n.className="spider-leg-pin"+(o.customPin?"":" default-spider-pin"),t.appendChild(r),t.appendChild(n),t.style["margin-left"]=e.x+"px",t.style["margin-top"]=e.y+"px",r.style.height=e.legLength+"px",r.style.transform="rotate("+(e.angle-Math.PI/2)+"rad)",{container:t,line:r,pin:n}}(i);return r=new mapboxgl.Marker(c.container).setLngLat(t),a={feature:e,elements:c,mapboxMarker:r,param:i},o.initializeLeg(a),c.container.onclick=function(e){o.onClick(e,a)},a})),n.each(c.reverse(),(function(t){t.mapboxMarker.addTo(e)})),o.animate&&setTimeout((function(){n.each(c.reverse(),(function(e,t){e.elements.container.className=(e.elements.container.className||"").replace("initial",""),e.elements.container.style.transitionDelay=o.animationSpeed/1e3/c.length*t+"s"}))}));i=c},this.unspiderfy=s,this.each=function(e){n.each(i,e)}}function o(e,t,n){return[e[0]+(t||0),e[1]+(n||0)]}Object.defineProperty(n,"__esModule",{value:!0}),n.default=r,r.popupOffsetForSpiderLeg=function(e,t){var n=e.param.x,r=e.param.y;return{top:o([0,t=t||0],n,r),"top-left":o([t,t],n,r),"top-right":o([-t,t],n,r),bottom:o([0,-t],n,r),"bottom-left":o([t,-t],n,r),"bottom-right":o([-t,-t],n,r),left:o([t,-t],n,r),right:o([-t,-t],n,r)}}},{}]},{},[1]);
//# sourceMappingURL=bundle.js.map
