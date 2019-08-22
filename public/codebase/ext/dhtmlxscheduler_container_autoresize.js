/*
@license

dhtmlxScheduler v.5.2.3 Stardard
This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){!function(){function t(){i=!1,e.callEvent("onAfterSchedulerResize",[]),i=!0}e.config.container_autoresize=!0,e.config.month_day_min_height=90,e.config.min_grid_size=25,e.config.min_map_size=400;var a=e._pre_render_events,i=!0,n=0,r=0;e._pre_render_events=function(t,s){if(!e.config.container_autoresize||!i)return a.apply(this,arguments);var o=this.xy.bar_height,d=this._colsS.heights,l=this._colsS.heights=[0,0,0,0,0,0,0],_=this._els.dhx_cal_data[0]
;if(t=this._table_view?this._pre_render_events_table(t,s):this._pre_render_events_line(t,s),this._table_view)if(s)this._colsS.heights=d;else{var h=_.firstChild;if(h.rows){for(var c=0;c<h.rows.length;c++){if(++l[c]*o>this._colsS.height-this.xy.month_head_height){var u=h.rows[c].cells,v=this._colsS.height-this.xy.month_head_height
;1*this.config.max_month_events!==this.config.max_month_events||l[c]<=this.config.max_month_events?v=l[c]*o:(this.config.max_month_events+1)*o>this._colsS.height-this.xy.month_head_height&&(v=(this.config.max_month_events+1)*o);for(var p=0;p<u.length;p++)u[p].childNodes[1].style.height=v+"px";l[c]=(l[c-1]||0)+u[0].offsetHeight}l[c]=(l[c-1]||0)+h.rows[c].cells[0].offsetHeight}l.unshift(0),h.parentNode.offsetHeight<h.parentNode.scrollHeight&&h._h_fix
}else if(t.length||"visible"!=this._els.dhx_multi_day[0].style.visibility||(l[0]=-1),t.length||-1==l[0]){var g=(h.parentNode.childNodes,(l[0]+1)*o+1);r!=g+1&&(this._obj.style.height=n-r+g-1+"px"),g+="px",_.style.top=this._els.dhx_cal_navline[0].offsetHeight+this._els.dhx_cal_header[0].offsetHeight+parseInt(g,10)+"px",_.style.height=this._obj.offsetHeight-parseInt(_.style.top,10)-(this.xy.margin_top||0)+"px";var f=this._els.dhx_multi_day[0];f.style.height=g,
f.style.visibility=-1==l[0]?"hidden":"visible",f=this._els.dhx_multi_day[1],f.style.height=g,f.style.visibility=-1==l[0]?"hidden":"visible",f.className=l[0]?"dhx_multi_day_icon":"dhx_multi_day_icon_small",this._dy_shift=(l[0]+1)*o,l[0]=0}}return t};var s=["dhx_cal_navline","dhx_cal_header","dhx_multi_day","dhx_cal_data"],o=function(t){n=0;for(var a=0;a<s.length;a++){var i=s[a],o=e._els[i]?e._els[i][0]:null,d=0;switch(i){case"dhx_cal_navline":case"dhx_cal_header":d=parseInt(o.style.height,10)
;break;case"dhx_multi_day":d=o?o.offsetHeight-1:0,r=d;break;case"dhx_cal_data":var l=e.getState().mode;if(d=o.childNodes[1]&&"month"!=l?o.childNodes[1].offsetHeight:Math.max(o.offsetHeight-1,o.scrollHeight),"month"==l){if(e.config.month_day_min_height&&!t){d=o.getElementsByTagName("tr").length*e.config.month_day_min_height}t&&(o.style.height=d+"px")}else if("year"==l)d=190*e.config.year_y;else if("agenda"==l){if(d=0,
o.childNodes&&o.childNodes.length)for(var _=0;_<o.childNodes.length;_++)d+=o.childNodes[_].offsetHeight;d+2<e.config.min_grid_size?d=e.config.min_grid_size:d+=2}else if("week_agenda"==l){for(var h,c,u=e.xy.week_agenda_scale_height+e.config.min_grid_size,v=0;v<o.childNodes.length;v++){c=o.childNodes[v];for(var _=0;_<c.childNodes.length;_++){for(var p=0,g=c.childNodes[_].childNodes[1],f=0;f<g.childNodes.length;f++)p+=g.childNodes[f].offsetHeight;h=p+e.xy.week_agenda_scale_height,
h=1!=v||2!=_&&3!=_?h:2*h,h>u&&(u=h)}}d=3*u}else if("map"==l){d=0;for(var m=o.querySelectorAll(".dhx_map_line"),_=0;_<m.length;_++)d+=m[_].offsetHeight;d+2<e.config.min_map_size?d=e.config.min_map_size:d+=2}else if(e._gridView)if(d=0,o.childNodes[1].childNodes[0].childNodes&&o.childNodes[1].childNodes[0].childNodes.length){for(var m=o.childNodes[1].childNodes[0].childNodes[0].childNodes,_=0;_<m.length;_++)d+=m[_].offsetHeight;d+=2,d<e.config.min_grid_size&&(d=e.config.min_grid_size)
}else d=e.config.min_grid_size;if(e.matrix&&e.matrix[l]){if(t)d+=0,o.style.height=d+"px";else{d=0;for(var x=e.matrix[l],b=x.y_unit,y=0;y<b.length;y++)d+=x._section_height[b[y].key]}d-=1}("day"==l||"week"==l||e._props&&e._props[l])&&(d+=2)}d+=1,n+=d}e._obj.style.height=n+"px",t||e.updateView()},d=function(){if(!e.config.container_autoresize||!i)return!0;var a=e.getState().mode;if(!a)return!0;var n=document.documentElement.scrollTop;if(o(),e.matrix&&e.matrix[a]||"month"==a){
(window.requestAnimationFrame||window.setTimeout)(function(){o(!0),document.documentElement.scrollTop=n,t()},1)}else t()};e.attachEvent("onBeforeViewChange",function(){var t=e.config.container_autoresize;if(e.xy.$original_scroll_width||(e.xy.$original_scroll_width=e.xy.scroll_width),e.xy.scroll_width=t?0:e.xy.$original_scroll_width,e.matrix)for(var a in e.matrix){var i=e.matrix[a];i.$original_section_autoheight||(i.$original_section_autoheight=i.section_autoheight),
i.section_autoheight=!t&&i.$original_section_autoheight}return!0}),e.attachEvent("onViewChange",d),e.attachEvent("onXLE",d),e.attachEvent("onEventChanged",d),e.attachEvent("onEventCreated",d),e.attachEvent("onEventAdded",d),e.attachEvent("onEventDeleted",d),e.attachEvent("onAfterSchedulerResize",d),e.attachEvent("onClearAll",d),e.attachEvent("onBeforeExpand",function(){return i=!1,!0}),e.attachEvent("onBeforeCollapse",function(){return i=!0,!0})}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_container_autoresize.js.map