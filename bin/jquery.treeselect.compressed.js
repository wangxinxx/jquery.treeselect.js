(function(c){c.fn.treeselect=function(d){d=c.extend({colwidth:18,default_value:{},selected:null,treeloaded:null,load:null,searcher:null,deepLoad:!1,onbuild:null,postbuild:null,inputName:"treeselect",showRoot:!1,selectAll:!1,selectAllText:"Select All"},d);var h={},e=function(a,b){this.root=!!b;a.title=a.title||"anonymous";c.extend(this,{id:0,nodeloaded:!1,allLoaded:!1,value:0,title:"",url:"",has_children:!0,children:[],data:{},level:0,odd:!1,checked:!1,busy:!1,display:c(),input:c(),link:c(),span:c(),
childlist:c(),exclude:{}},a);this.isTreeNode=!0;this.loading=!1;this.loadqueue=[]};e.prototype.setBusy=function(a,b){a!=this.span.hasClass(b)&&((this.busy=a)?(this.span.addClass(b),this.span.addClass("treebusy")):(this.span.removeClass(b),this.span.hasClass("treebusy-loading"==b?"treebusy-selecting":"treebusy-loading")||this.span.removeClass("treebusy")))};e.prototype.isLoaded=function(){var a=this.nodeloaded,a=a|h.hasOwnProperty(this.id),a=a|!this.has_children;return a|=this.has_children&&0<this.children.length};
e.prototype.loadNode=function(a,b){if(this.loading)a&&this.loadqueue.push(a);else{var c=function(){a&&a(this);for(var f in this.loadqueue)this.loadqueue[f](this);this.loadqueue.length=0;b||this.setBusy(!1,"treebusy-loading")};this.loading=!0;d.load&&!this.isLoaded()?(b||this.setBusy(!0,"treebusy-loading"),d.load(this,function(a){return function(b){a.nodeloaded?c.call(a):(a=jQuery.extend(a,b),a.nodeloaded=!0,h[a.id]=a.id,a.build(function(){c.call(a)}))}}(this))):a&&c.call(this);this.loading=!1}};e.prototype.loadAll=
function(a,b,c,f){f=f||{};this.loadNode(function(d){b&&b(d);var e=d.children.length,g=e;if(!e||f.hasOwnProperty(d.id))a&&a.call(d,d);else{f[d.id]=d.id;for(c||d.setBusy(!0,"treebusy-loading-all");e--;)setTimeout(function(e){return function(){d.children[e].loadAll(function(){g--;g||(a&&a.call(d,d),c||d.setBusy(!1,"treebusy-loading-all"))},b,c,f)}}(e),2)}})};e.prototype.expand=function(a){a?(this.link.removeClass("collapsed").addClass("expanded"),this.span.removeClass("collapsed").addClass("expanded"),
this.childlist.show("fast")):0<this.span.length&&(this.link.removeClass("expanded").addClass("collapsed"),this.span.removeClass("expanded").addClass("collapsed"),this.childlist.hide("fast"));a&&!this.isLoaded()&&this.loadNode(function(a){a.checked&&a.selectChildren(a.checked);a.expand(!0)})};e.prototype.selectChildren=function(a,b){var c="object"==typeof a;this.loadAll(function(){d.selected&&d.selected(this,!0);this.setBusy(!1,"treebusy-selecting");b&&b.call(this)},function(b){var d=a;c&&(d=a.hasOwnProperty(b.value),
d|=a.hasOwnProperty(b.id));b.select(d)})};e.prototype.select=function(a){this.input.hasClass("treenode-no-select")||(this.checked=a=!!a,this.input.attr("checked",a),d.selected&&d.selected(this))};e.prototype.build_treenode=function(){var a=c(),a=c(document.createElement(this.root?"div":"li"));a.addClass("treenode");a.addClass(this.odd?"odd":"even");return a};e.prototype.build_input=function(a){if(d.inputName){if("undefined"!==typeof this.exclude[this.id])this.input=c(document.createElement("div")),
this.input.addClass("treenode-no-select");else{this.input=c(document.createElement("input"));var b=this.value||this.id;this.input.attr({type:"checkbox",value:b,name:d.inputName+"-"+b,checked:this.checked}).addClass("treenode-input");this.input.bind("click",function(a){return function(b){a.checked=c(b.target).is(":checked");a.expand(a.checked);a.selectChildren(a.checked)}}(this));this.root&&!d.showRoot&&this.input.hide()}this.input.css("left",a+"px")}return this.input};e.prototype.build_link=function(a){a.css("cursor",
"pointer").addClass("collapsed");a.bind("click",{node:this},function(a){a.preventDefault();a.data.node.expand(c(a.target).hasClass("collapsed"))});return a};e.prototype.build_span=function(a){if((!this.root||this.showRoot)&&this.has_children)this.span=this.build_link(c(document.createElement("span")).attr({"class":"treeselect-expand"})),this.span.css("left",a+"px");return this.span};e.prototype.build_title=function(a){if((!this.root||this.showRoot)&&this.title)this.nodeLink=c(document.createElement("a")).attr({"class":"treeselect-title",
href:this.url,target:"_blank"}).css("marginLeft",a+"px").text(this.title),this.link=this.has_children?this.build_link(this.nodeLink.clone()):c(document.createElement("div")).attr({"class":"treeselect-title"}).css("marginLeft",a+"px").text(this.title);return this.link};e.prototype.build_children=function(a){this.childlist=c();if(0<this.children.length){this.childlist=c(document.createElement("ul"));var b=this.odd,d=this.children.length,f;for(f in this.children)this.children.hasOwnProperty(f)&&(b=!b,
this.children[f]=new e(c.extend(this.children[f],{level:this.level+1,odd:b,checked:this.checked,exclude:this.exclude})),setTimeout(function(b,c){return function(){b.children[c].build(function(c){d--;b.childlist.append(c.display);d||a.call(b,b.childlist)})}}(this,f),2))}else a.call(this,this.childlist)};e.prototype.build=function(a){var b=5,e=null;if(0==this.display.length)this.display=this.build_treenode();else if(this.root){var f=this.build_treenode();this.display.append(f);this.display=f}if(0==
this.input.length&&(e=this.build_input(b))&&0<e.length)this.display.append(e),b+=d.colwidth;0==this.span.length&&(this.display.append(this.build_span(b)),b+=d.colwidth);0==this.link.length&&this.display.append(this.build_title(b));var k=function(){if(d.onbuild)d.onbuild(this);this.searchItem=this.display.clone();c(".treeselect-expand",this.searchItem).remove();var b=c("div.treeselect-title",this.searchItem);0<b.length&&b.replaceWith(this.nodeLink);d.postbuild&&d.postbuild(this);"undefined"!==typeof this.exclude[this.id]&&
0==c(".treenode-input",this.display).length&&this.display.hide();a&&a.call(this,this)};0==this.childlist.length?this.build_children(function(a){0<a.length&&this.display.append(a);k.call(this)}):k.call(this)};e.prototype.getSelectAll=function(){return this.root&&this.selectAll?this.selectAllText:!1};e.prototype.search=function(a,b){if(a){var c={};a=a.toLowerCase();d.searcher?d.searcher(this,a,function(a,d){var j=null,g=a.length,l;for(l in a)j=new e(d?d(a[l]):a[l]),j.nodeloaded=!0,h[j.id]=j.id,j.build(function(){g--;
c[l]=j;g||b(c,!0)})}):this.loadAll(function(){b&&b(c,!0)},function(b){!b.root&&-1!==b.title.toLowerCase().search(a)&&(c[b.id]=b)},!0)}else b&&b(this.children,!1)};return c(this).each(function(){var a=c.extend(d,{display:c(this)}),a=this.treenode=new e(a,!0),b=a.getSelectAll();!1!==b&&!a.showRoot&&(a.display.append(c(document.createElement("input")).attr({type:"checkbox"}).bind("click",function(a){return function(b){a.selectChildren(c(b.target).is(":checked"))}}(a))),b&&(b=c(document.createElement("span")).attr({"class":"treeselect-select-all"}).html(b),
a.display.append(b)));var h=c(document.createElement("span")).addClass("treebusy");a.display.append(h.css("display","block"));a.loadNode(function(a){0==a.children.length&&a.display.hide();a.expand(!0);a.select(a.checked);a=a.checked;jQuery.isEmptyObject(d.default_value)||(a=d.default_value);a?this.selectChildren(a,function(){h.remove();d.treeloaded&&d.treeloaded(this)}):(h.remove(),d.treeloaded&&d.treeloaded(this))});a.has_children||(this.parentElement.style.display="none")})}})(jQuery);
(function(c){c.fn.chosentree=function(d){d=c.extend({inputId:"chosentree-select",label:"",description:"",input_placeholder:"Select Item",input_type:"text",autosearch:!1,search_text:"Search",no_results_text:"No results found",min_height:100,more_text:"+%num% more",loaded:null,collapsed:!0,showtree:!1},d);return c(this).each(function(){var h=null,e=null,a=null,b=null,m=null,f=null,k=null,j=a=null,g=null,l=function(a){a&&(null==g||g.has_children)?j.addClass("treevisible").show("fast"):j.removeClass("treevisible").hide("fast")},
h=c(document.createElement("div"));h.addClass("chzntree-container");"search"==d.input_type?(h.addClass("chzntree-container-single"),a=c(document.createElement("div")),a.addClass("chzntree-search")):(h.addClass("chzntree-container-multi"),e=c(document.createElement("ul")),e.addClass("chzntree-choices chosentree-choices"),a=c(document.createElement("li")),a.addClass("search-field"));f=c(document.createElement("label"));f.attr({"for":d.inputId});f.text(d.label);k=c(document.createElement("div"));k.attr({"class":"description"});
k.text(d.description);if(d.input_placeholder){b=c(document.createElement("input"));b.attr({type:"text",placeholder:d.input_placeholder,autocomplete:"off"});!d.showtree&&d.collapsed&&b.focus(function(){l(!0)});if("search"==d.input_type){b.addClass("chosentree-search");var q=function(a){return!b.hasClass("searching")&&1!==a.length&&g?(b.addClass("searching"),g.search(a,function(a,c){b.removeClass("searching");var e=0;g.childlist.children().detach();c?g.childlist.addClass("chzntree-search-results"):
g.childlist.removeClass("chzntree-search-results");for(var f in a)e++,c?g.childlist.append(a[f].searchItem):g.childlist.append(a[f].display);e||g.childlist.append("<li>"+d.no_results_text+"</li>")}),!0):!1};if(d.autosearch){var s=0;b.bind("input",function t(){q(b.val())||(clearTimeout(s),s=setTimeout(t,1E3))});a.addClass("autosearch")}else m=c(document.createElement("input")),m.attr({type:"button",value:d.search_text}),m.addClass("chosentree-search-btn"),m.bind("click",function(a){a.preventDefault();
q(b.val())}),jQuery(document).bind("keydown",function(a){13==a.keyCode&&b.is(":focus")&&(a.preventDefault(),q(b.val()))}),a.addClass("manualsearch")}else b.addClass("chosentree-results");a.append(b);m&&a.append(m)}e?h.append(f).append(e.append(a)):h.append(f).append(a);j=c(document.createElement("div"));j.addClass("treewrapper");j.hide();a=c(document.createElement("div"));a.addClass("treeselect");c(this).keyup(function(a){27==a.which&&l(!1)});j.append(a);c(this).append(h.append(j));c(this).append(k);
var n=d,r=this,p={};n.selected=function(a,f){if(a.id){var g=c("li#choice_"+a.id,e);a.checked&&0==g.length?p[a.id]=a:a.checked||g.remove()}if(f){r.value={};for(var h in p){a=p[h];r.value[h]=a;g=c(document.createElement("li"));g.addClass("search-choice");g.attr("id","choice_"+a.id);g.eq(0)[0].nodeData=a;var j=c(document.createElement("span"));j.text(a.title);if(!a.root||a.showRoot&&a.has_children){var k=c(document.createElement("a"));k.addClass("search-choice-close");k.attr("href","javascript:void(0)");
k.bind("click",function(b){b.preventDefault();c("li#choice_"+a.id,e).remove();a.selectChildren(!1)})}e.prepend(g.append(j).append(k))}e.show();p={};b&&0==a.children.length&&b.attr({value:""});jQuery.fn.moreorless&&(h=c("li.search-choice",e).length,h=d.more_text.replace("%num%",h),e.moreorless(d.min_height,h),e.div_expanded||l(!0,null));n.loaded&&n.loaded(nodes);c(r).trigger("treeloaded")}};a.treeselect(n);g=a.eq(0)[0].treenode;(n.showtree||!n.collapsed)&&l(!0,null)})}})(jQuery);
