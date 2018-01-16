var abs_url = "https://oright.newslabfellows.com";
var joins_url = "http://news.joins.com/Digitalspecial/144";
var article_url = "http://news.joins.com/Digitalspecial/155";

$.fn.pathname = function(){
    return this.prop("pathname")
}

function make_href_abs(){
    $("a").map(function(){
        $t = $(this);
        $href = $t.attr("href");
        if($href == "#") return;
        var t_host = $t.prop("hostname");
        if(t_host == "news.joins.com" ||
           t_host == "oright.newslabfellows.com"){
            if($t.pathname() == "/"){
                $t.attr("href", joins_url)
            } else if ($t.pathname() == "/article") {
                $t.attr("href", article_url)
            } else if ($t.pathname() == "/Digitalspecial/155"){
                return;
            } else {
                $t.attr("href", abs_url + $href)
            }
        }
    });
}

FLAG = false;
$(document).ready(function(){
    // if port is 80
    if(FLAG && location.port == ""){
        make_href_abs()
    }
})
