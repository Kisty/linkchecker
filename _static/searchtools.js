jQuery.makeSearchSummary=function(b,j,a){var e=b.toLowerCase(),c=0;$.each(j,function(){var a=e.indexOf(this.toLowerCase());-1<a&&(c=a)});c=Math.max(c-120,0);b=(0<c?"...":"")+$.trim(b.substr(c,240))+(c+240-b.length?"...":"");var k=$('<div class="context"></div>').text(b);$.each(a,function(){k=k.highlightText(this,"highlighted")});return k};
var Stemmer=function(){var b={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},j={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""};this.stemWord=function(a){var e,c,k;if(3>a.length)return a;var d,f;k=a.substr(0,1);"y"==k&&(a=k.toUpperCase()+a.substr(1));d=/^(.+?)(ss|i)es$/;c=/^(.+?)([^s])s$/;
d.test(a)?a=a.replace(d,"$1$2"):c.test(a)&&(a=a.replace(c,"$1$2"));d=/^(.+?)eed$/;c=/^(.+?)(ed|ing)$/;d.test(a)?(c=d.exec(a),d=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,d.test(c[1])&&(d=/.$/,a=a.replace(d,""))):c.test(a)&&(c=c.exec(a),e=c[1],c=/^([^aeiou][^aeiouy]*)?[aeiouy]/,c.test(e)&&(a=e,c=/(at|bl|iz)$/,f=/([^aeiouylsz])\1$/,e=/^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/,c.test(a)?a+="e":f.test(a)?(d=/.$/,a=a.replace(d,"")):e.test(a)&&(a+="e")));d=/^(.+?)y$/;d.test(a)&&(c=d.exec(a),
e=c[1],d=/^([^aeiou][^aeiouy]*)?[aeiouy]/,d.test(e)&&(a=e+"i"));d=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;d.test(a)&&(c=d.exec(a),e=c[1],c=c[2],d=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,d.test(e)&&(a=e+b[c]));d=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;d.test(a)&&(c=d.exec(a),e=c[1],c=c[2],d=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,d.test(e)&&(a=e+j[c]));d=
/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;c=/^(.+?)(s|t)(ion)$/;d.test(a)?(c=d.exec(a),e=c[1],d=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,d.test(e)&&(a=e)):c.test(a)&&(c=c.exec(a),e=c[1]+c[2],c=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,c.test(e)&&(a=e));d=/^(.+?)e$/;if(d.test(a)&&(c=d.exec(a),e=c[1],d=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,
c=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$/,f=/^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/,d.test(e)||c.test(e)&&!f.test(e)))a=e;d=/ll$/;c=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/;d.test(a)&&c.test(a)&&(d=/.$/,a=a.replace(d,""));"y"==k&&(a=k.toLowerCase()+a.substr(1));return a}},Search={_index:null,_queued_query:null,_pulse_status:-1,init:function(){var b=$.getQueryParameters();b.q&&(b=b.q[0],$('input[name="q"]')[0].value=
b,this.performSearch(b))},loadIndex:function(b){$.ajax({type:"GET",url:b,data:null,success:null,dataType:"script",cache:!0})},setIndex:function(b){this._index=b;if(null!==(b=this._queued_query))this._queued_query=null,Search.query(b)},hasIndex:function(){return null!==this._index},deferQuery:function(b){this._queued_query=b},stopPulse:function(){this._pulse_status=0},startPulse:function(){function b(){Search._pulse_status=(Search._pulse_status+1)%4;for(var j="",a=0;a<Search._pulse_status;a++)j+=".";
Search.dots.text(j);-1<Search._pulse_status&&window.setTimeout(b,500)}0<=this._pulse_status||b()},performSearch:function(b){this.out=$("#search-results");this.title=$("<h2>"+_("Searching")+"</h2>").appendTo(this.out);this.dots=$("<span></span>").appendTo(this.title);this.status=$('<p style="display: none"></p>').appendTo(this.out);this.output=$('<ul class="search"/>').appendTo(this.out);$("#search-progress").text(_("Preparing search..."));this.startPulse();this.hasIndex()?this.query(b):this.deferQuery(b)},
query:function(b){function j(){if(n.length){var a=n.pop(),b=$('<li style="display:none"></li>');if(""==DOCUMENTATION_OPTIONS.FILE_SUFFIX){var e=a[0]+"/";e.match(/\/index\/$/)?e=e.substring(0,e.length-6):"index/"==e&&(e="");b.append($("<a/>").attr("href",DOCUMENTATION_OPTIONS.URL_ROOT+e+r+a[2]).html(a[1]))}else b.append($("<a/>").attr("href",a[0]+DOCUMENTATION_OPTIONS.FILE_SUFFIX+r+a[2]).html(a[1]));a[3]?(b.append($("<span> ("+a[3]+")</span>")),Search.output.append(b),b.slideDown(5,function(){j()})):
DOCUMENTATION_OPTIONS.HAS_SOURCE?$.get(DOCUMENTATION_OPTIONS.URL_ROOT+"_sources/"+a[0]+".txt",function(a){""!=a&&(b.append($.makeSearchSummary(a,c,d)),Search.output.append(b));b.slideDown(5,function(){j()})},"text"):(Search.output.append(b),b.slideDown(5,function(){j()}))}else Search.stopPulse(),Search.title.text(_("Search Results")),v?Search.status.text(_("Search finished, found %s page(s) matching the search query.").replace("%s",v)):Search.status.text(_("Your search did not match any documents. Please make sure that all words are spelled correctly and that you've selected enough categories.")),
Search.status.fadeIn(500)}var a="and then into it as are in if for no there their was is be to that but they not such with by a on these of will this near the or at".split(" "),e=new Stemmer,c=[],k=[],d=[],f=b.split(/\s+/),h=[];for(b=0;b<f.length;b++)if(""!=f[b]&&h.push(f[b].toLowerCase()),!(-1!=$u.indexOf(a,f[b])||f[b].match(/^\d+$/)||""==f[b])){var g=e.stemWord(f[b]).toLowerCase();if("-"==g[0])var l=k,g=g.substr(1);else l=c,d.push(f[b].toLowerCase());$.contains(l,g)||l.push(g)}var r="?highlight="+
$.urlencode(d.join(" ")),a=this._index.filenames,e=this._index.titles,f=this._index.terms,l={},m=null,q=[],s=[],u=[],t=[];$("#search-progress").empty();for(b=0;b<h.length;b++)var g=[].concat(h.slice(0,b),h.slice(b+1,h.length)),n=this.performObjectSearch(h[b],g),s=n[0].concat(s),q=n[1].concat(q),t=n[2].concat(t);for(b=0;b<c.length;b++){g=c[b];if(null==(m=f[g]))break;void 0==m.length&&(m=[m]);for(h=0;h<m.length;h++){var p=m[h];p in l?l[p].push(g):l[p]=[g]}}for(p in l)if(h=!0,l[p].length==c.length){for(b=
0;b<k.length;b++)if(f[k[b]]==p||$.contains(f[k[b]]||[],p)){h=!1;break}h&&u.push([a[p],e[p],"",null])}delete a;e;f;u.sort(function(a,b){var c=a[1].toLowerCase(),d=b[1].toLowerCase();return c>d?-1:c<d?1:0});var n=t.concat(u).concat(s).concat(q),v=n.length;j()},performObjectSearch:function(b,j){var a=this._index.filenames,e=this._index.objects,c=this._index.objnames,k=this._index.titles,d=[],f=[],h=[],g;for(g in e)for(var l in e[g]){var r=(g?g+".":"")+l;if(-1<r.toLowerCase().indexOf(b)){var m=e[g][l],
q=c[m[1]][2],s=k[m[0]];if(0<j.length){for(var u=(g+" "+l+" "+q+" "+s).toLowerCase(),t=!0,n=0;n<j.length;n++)if(-1==u.indexOf(j[n])){t=!1;break}if(!t)continue}q=q+_(", in ")+s;anchor=m[3];""==anchor?anchor=r:"-"==anchor&&(anchor=c[m[1]][1]+"-"+r);result=[a[m[0]],r,"#"+anchor,q];switch(m[2]){case 1:f.push(result);break;case 0:d.push(result);break;case 2:h.push(result)}}}f.sort(function(a,b){return a[1]>b[1]?-1:a[1]<b[1]?1:0});d.sort(function(a,b){return a[1]>b[1]?-1:a[1]<b[1]?1:0});h.sort(function(a,
b){return a[1]>b[1]?-1:a[1]<b[1]?1:0});return[d,f,h]}};$(document).ready(function(){Search.init()});
