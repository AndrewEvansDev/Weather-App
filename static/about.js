function messwithserg(){
        var text = $("button#hide-ppap-lol").text();
        if(text == "Click Here"){
            $("button#hide-ppap-lol").text('are you sure?');
        }else if(text == "are you sure?"){
            $("button#hide-ppap-lol").text('click again, then');
        }
        else{
            $('iframe.ppap-video').css('display','block');
    };
}