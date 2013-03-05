(function(a){a.fn.autogrow=function(){return this.each(function(){var h=this;a.fn.autogrow.resize(h);a(h).focus(function(){h.interval=setInterval(function(){a.fn.autogrow.resize(h)},500)}).blur(function(){clearInterval(h.interval)})})};a.fn.autogrow.resize=function(h){var l=parseInt(a(h).css("line-height"),10),q=h.value.split("\n"),n=h.cols,m=0;a.each(q,function(){m+=Math.ceil(this.length/n)||1});a(h).css("height",l*(m+1))}})(jQuery);
(function(a){function h(){if("asc"==j.substring(0,3)){var b=j.substring(3);r=function(a,c){return a[b]-c[b]}}else r=function(a,c){return c[j]-a[j]};a("a.sel").attr("href","#").removeClass("sel");a("a.by"+j).removeAttr("href").addClass("sel")}function l(b){a("#ah"+b).hide();a("#ao"+b).show();var d=a("#sc"+b);d.slideUp("fast",function(){d.remove()})}function q(b){var d=b.find('input[name="node"]').val(),c=b.find('input[name="parent"]').val(),g=b.find('textarea[name="comment"]').val(),e=b.find('textarea[name="proposal"]').val();
""==g?k("Please enter a comment."):(b.find("textarea,input").attr("disabled","disabled"),a.ajax({type:"POST",url:f.addCommentURL,dataType:"json",data:{node:d,parent:c,text:g,proposal:e},success:function(g){d&&m(d);b.find("textarea").val("").add(b.find("input")).removeAttr("disabled");var e=a("#cl"+(d||c));e.data("empty")&&(a(e).empty(),e.data("empty",!1));a:{g=g.comment;e=w(g);g.children=null;e.data("comment",g);var h=a("#cl"+(g.node||g.parent)),j=s(h),p=a(document.createElement("li"));p.hide();for(i=
0;i<j.length;i++)if(0>=r(g,j[i])){a("#cd"+j[i].id).parent().before(p.html(e));p.slideDown("fast");break a}h.append(p.html(e));p.slideDown("fast")}a("#ao"+d).find("img").attr({src:f.commentBrightImage});d&&a("#ca"+d).slideUp()},error:function(){b.find("textarea,input").removeAttr("disabled");k("Oops, there was a problem adding the comment.")}}))}function n(b,d){a.each(b,function(){var c=w(this);d.append(a(document.createElement("li")).html(c));n(this.children,c.find("ul.comment-children"));this.children=
null;c.data("comment",this)})}function m(b){a("#hc"+b).hide();a("#pc"+b).show();b=a("#pt"+b);b.val("").removeAttr("disabled");b.slideUp("fast")}function t(b){a("#rd"+b).slideUp("fast",function(){a(this).remove()});a("#cr"+b).hide();a("#rl"+b).show()}function u(b){b.sort(r);a.each(b,function(){this.children=u(this.children)});return b}function s(b,d){var c=[];b.children().children("[id^='cd']").each(function(){var b=a(this).data("comment");d&&(b.children=s(a(this).find("#cl"+b.id),!0));c.push(b)});
return c}function w(b){if(!b.displayed&&!f.moderator)return a('<div class="moderate">Thank you!  Your comment will show up once it is has been approved by a moderator.</div>');b.pretty_rating=b.rating+" point"+(1==b.rating?"":"s");b.css_class=b.displayed?"":" moderate";var d=a.extend({},f,b),d=a(v(x,d));if(b.vote){var c=1==b.vote?"u":"d";d.find("#"+c+"v"+b.id).hide();d.find("#"+c+"u"+b.id).show()}if(f.moderator||"[deleted]"!=b.text)d.find("a.reply").show(),b.proposal_diff&&d.find("#sp"+b.id).show(),
f.moderator&&!b.displayed&&d.find("#cm"+b.id).show(),(f.moderator||f.username==b.username)&&d.find("#dc"+b.id).show();return d}function v(b,d){var c=a(document.createElement("div"));return b.replace(/<([%#])([\w\.]*)\1>/g,function(b,e,h){b="%"==e?!0:!1;var f=d;a.each(h.split("."),function(){f=f[this]});return b?c.text(f||"").html():f})}function k(b){a(document.createElement("div")).attr({"class":"popup-error"}).append(a(document.createElement("div")).attr({"class":"error-message"}).text(b)).appendTo("body").fadeIn("slow").delay(2E3).fadeOut("slow")}
var r,j;a.fn.comment=function(){return this.each(function(){var b=a(this).attr("id").substring(1),d=COMMENT_METADATA[b],c=d+" comment"+(1==d?"":"s"),g=0<d?f.commentBrightImage:f.commentImage,d=0==d?" nocomment":"";a(this).append(a(document.createElement("a")).attr({href:"#","class":"sphinx-comment-open"+d,id:"ao"+b}).append(a(document.createElement("img")).attr({src:g,alt:"comment",title:c})).click(function(c){c.preventDefault();var b=a(this).attr("id").substring(2);a("#ao"+b).hide();a("#ah"+b).show();
c=a.extend({id:b},f);c=a(v(y,c)).hide();c.find('textarea[name="proposal"]').hide();c.find("a.by"+j).addClass("sel");var g=c.find("#cf"+b);g.submit(function(a){a.preventDefault();q(g)});a("#s"+b).after(c);c.slideDown("fast",function(){a.ajax({type:"GET",url:f.getCommentsURL,data:{node:b},success:function(c){var g=a("#cl"+b),e=100;a("#cf"+b).find('textarea[name="proposal"]').data("source",c.source);if(0===c.comments.length)g.html("<li>No comments yet.</li>"),g.data("empty",!0);else{var d=u(c.comments),
e=100*c.comments.length;n(d,g);g.data("empty",!1)}a("#cn"+b).slideUp(e+200);g.slideDown(e)},error:function(){k("Oops, there was a problem retrieving the comments.")},dataType:"json"})})})).append(a(document.createElement("a")).attr({href:"#","class":"sphinx-comment-close hidden",id:"ah"+b}).append(a(document.createElement("img")).attr({src:f.closeCommentImage,alt:"close",title:"close"})).click(function(c){c.preventDefault();l(a(this).attr("id").substring(2))}))})};var f={processVoteURL:"/_process_vote",
addCommentURL:"/_add_comment",getCommentsURL:"/_get_comments",acceptCommentURL:"/_accept_comment",deleteCommentURL:"/_delete_comment",commentImage:"/static/_static/comment.png",closeCommentImage:"/static/_static/comment-close.png",loadingImage:"/static/_static/ajax-loader.gif",commentBrightImage:"/static/_static/comment-bright.png",upArrow:"/static/_static/up.png",downArrow:"/static/_static/down.png",upArrowPressed:"/static/_static/up-pressed.png",downArrowPressed:"/static/_static/down-pressed.png",
voting:!1,moderator:!1};"undefined"!=typeof COMMENT_OPTIONS&&(f=jQuery.extend(f,COMMENT_OPTIONS));var y='    <div class="sphinx-comments" id="sc<%id%>">      <p class="sort-options">        Sort by:        <a href="#" class="sort-option byrating">best rated</a>        <a href="#" class="sort-option byascage">newest</a>        <a href="#" class="sort-option byage">oldest</a>      </p>      <div class="comment-header">Comments</div>      <div class="comment-loading" id="cn<%id%>">        loading comments... <img src="<%loadingImage%>" alt="" /></div>      <ul id="cl<%id%>" class="comment-ul"></ul>      <div id="ca<%id%>">      <p class="add-a-comment">Add a comment        (<a href="#" class="comment-markup" id="ab<%id%>">markup</a>):</p>      <div class="comment-markup-box" id="mb<%id%>">        reStructured text markup: <i>*emph*</i>, <b>**strong**</b>,         <tt>``code``</tt>,         code blocks: <tt>::</tt> and an indented block after blank line</div>      <form method="post" id="cf<%id%>" class="comment-form" action="">        <textarea name="comment" cols="80"></textarea>        <p class="propose-button">          <a href="#" id="pc<%id%>" class="show-propose-change">            Propose a change &#9657;          </a>          <a href="#" id="hc<%id%>" class="hide-propose-change">            Propose a change &#9663;          </a>        </p>        <textarea name="proposal" id="pt<%id%>" cols="80"                  spellcheck="false"></textarea>        <input type="submit" value="Add comment" />        <input type="hidden" name="node" value="<%id%>" />        <input type="hidden" name="parent" value="" />      </form>      </div>    </div>',
x='    <div id="cd<%id%>" class="sphinx-comment<%css_class%>">      <div class="vote">        <div class="arrow">          <a href="#" id="uv<%id%>" class="vote" title="vote up">            <img src="<%upArrow%>" />          </a>          <a href="#" id="uu<%id%>" class="un vote" title="vote up">            <img src="<%upArrowPressed%>" />          </a>        </div>        <div class="arrow">          <a href="#" id="dv<%id%>" class="vote" title="vote down">            <img src="<%downArrow%>" id="da<%id%>" />          </a>          <a href="#" id="du<%id%>" class="un vote" title="vote down">            <img src="<%downArrowPressed%>" />          </a>        </div>      </div>      <div class="comment-content">        <p class="tagline comment">          <span class="user-id"><%username%></span>          <span class="rating"><%pretty_rating%></span>          <span class="delta"><%time.delta%></span>        </p>        <div class="comment-text comment"><#text#></div>        <p class="comment-opts comment">          <a href="#" class="reply hidden" id="rl<%id%>">reply &#9657;</a>          <a href="#" class="close-reply" id="cr<%id%>">reply &#9663;</a>          <a href="#" id="sp<%id%>" class="show-proposal">proposal &#9657;</a>          <a href="#" id="hp<%id%>" class="hide-proposal">proposal &#9663;</a>          <a href="#" id="dc<%id%>" class="delete-comment hidden">delete</a>          <span id="cm<%id%>" class="moderation hidden">            <a href="#" id="ac<%id%>" class="accept-comment">accept</a>          </span>        </p>        <pre class="proposal" id="pr<%id%>"><#proposal_diff#>        </pre>          <ul class="comment-children" id="cl<%id%>"></ul>        </div>        <div class="clearleft"></div>      </div>    </div>';
a(document).ready(function(){a("a.comment-close").live("click",function(c){c.preventDefault();l(a(this).attr("id").substring(2))});a("a.vote").live("click",function(c){c.preventDefault();var b=a(this);if(f.voting){var e=b.attr("id");e&&(c=0,"u"!=e.charAt(1)&&(c="u"==e.charAt(0)?1:-1),c={comment_id:e.substring(2),value:c},b.hide(),a("#"+e.charAt(0)+("u"==e.charAt(1)?"v":"u")+c.comment_id).show(),b=a("div#cd"+c.comment_id),e=b.data("comment"),0!==c.value&&e.vote===-1*c.value&&(a("#"+(1==c.value?"d":
"u")+"u"+c.comment_id).hide(),a("#"+(1==c.value?"d":"u")+"v"+c.comment_id).show()),e.rating+=0===e.vote?c.value:c.value-e.vote,e.vote=c.value,b.data("comment",e),b.find(".rating:first").text(e.rating+" point"+(1==e.rating?"":"s")),a.ajax({type:"POST",url:f.processVoteURL,data:c,error:function(){k("Oops, there was a problem casting that vote.")}}))}else k("You'll need to login to vote.")});a("a.reply").live("click",function(c){c.preventDefault();var b=a(this).attr("id").substring(2);a("#rl"+b).hide();
a("#cr"+b).show();c=a(v('    <li>      <div class="reply-div" id="rd<%id%>">        <form id="rf<%id%>">          <textarea name="comment" cols="80"></textarea>          <input type="submit" value="Add reply" />          <input type="button" value="Cancel" />          <input type="hidden" name="parent" value="<%id%>" />          <input type="hidden" name="node" value="" />        </form>      </div>    </li>',{id:b})).hide();a("#cl"+b).prepend(c).find("#rf"+b).submit(function(c){c.preventDefault();
q(a("#rf"+b));t(b)}).find("input[type=button]").click(function(){t(b)});c.slideDown("fast",function(){a("#rf"+b).find("textarea").focus()})});a("a.close-reply").live("click",function(c){c.preventDefault();t(a(this).attr("id").substring(2))});a("a.sort-option").live("click",function(c){c.preventDefault();c=a(this).attr("class").split(/\s+/);for(var b=0;b<c.length;b++)"sort-option"!=c[b]&&(j=c[b].substring(2));h();c=new Date;c.setDate(c.getDate()+365);document.cookie="sortBy="+escape(j)+";expires="+
c.toUTCString();a("ul.comment-ul").each(function(c,b){var d=s(a(b),!0),d=u(d);n(d,a(b).empty())})});a("a.show-proposal").live("click",function(c){c.preventDefault();c=a(this).attr("id").substring(2);a("#sp"+c).hide();a("#hp"+c).show();a("#pr"+c).slideDown("fast")});a("a.hide-proposal").live("click",function(c){c.preventDefault();c=a(this).attr("id").substring(2);a("#hp"+c).hide();a("#sp"+c).show();a("#pr"+c).slideUp("fast")});a("a.show-propose-change").live("click",function(c){c.preventDefault();
c=a(this).attr("id").substring(2);a("#pc"+c).hide();a("#hc"+c).show();c=a("#pt"+c);c.val(c.data("source"));a.fn.autogrow.resize(c[0]);c.slideDown("fast")});a("a.hide-propose-change").live("click",function(c){c.preventDefault();m(a(this).attr("id").substring(2))});a("a.accept-comment").live("click",function(c){c.preventDefault();var b=a(this).attr("id").substring(2);a.ajax({type:"POST",url:f.acceptCommentURL,data:{id:b},success:function(){a("#cm"+b).fadeOut("fast");a("#cd"+b).removeClass("moderate")},
error:function(){k("Oops, there was a problem accepting the comment.")}})});a("a.delete-comment").live("click",function(b){b.preventDefault();var d=a(this).attr("id").substring(2);a.ajax({type:"POST",url:f.deleteCommentURL,data:{id:d},success:function(b){var c=a("#cd"+d);"delete"==b?c.slideUp("fast",function(){c.remove()}):(c.find("span.user-id:first").text("[deleted]").end().find("div.comment-text:first").text("[deleted]").end().find("#cm"+d+", #dc"+d+", #ac"+d+", #rc"+d+", #sp"+d+", #hp"+d+", #cr"+
d+", #rl"+d).remove(),b=c.data("comment"),b.username="[deleted]",b.text="[deleted]",c.data("comment",b))},error:function(){k("Oops, there was a problem deleting the comment.")}})});a("a.comment-markup").live("click",function(b){b.preventDefault();b=a(this).attr("id").substring(2);a("#mb"+b).toggle()});j="rating";if(0<document.cookie.length){var b=document.cookie.indexOf("sortBy=");if(-1!=b){var b=b+7,d=document.cookie.indexOf(";",b);-1==d&&(d=document.cookie.length,j=unescape(document.cookie.substring(b,
d)))}}h()})})(jQuery);$(document).ready(function(){$(".sphinx-has-comment").comment();$("div.context").each(function(){var a=$.getQueryParameters(),a=a.q?a.q[0].split(/\s+/):[],l=$(this);$.each(a,function(){l.highlightText(this.toLowerCase(),"highlighted")})});var a=document.location.hash;"#comment-"==a.substring(0,9)&&($("#ao"+a.substring(9)).click(),document.location.hash="#s"+a.substring(9))});
