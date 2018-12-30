(function() {

    // var nextUrl;
    var offset1 = 0;

    // var moreBtn;


    var moreResults = function() {
        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            data: {
                q: $("input").val(),
                type: $("select").val(),
                offset: offset1
            },
            success: function(data) {
                console.log(data);

                data = data.artists || data.albums;

                if (data.next) {
                    offset1 += 20;
                    $("#more").show();
                } else {
                    $("#more").hide();
                }


                var resultHtml = "";
                resultHtml += "<h3> Results for " + $("input").val() + "</h3>";


                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images[0]){
                        var resImg = data.items[i].images[0].url;
                    } else {
                        resImg = "nopic.png";
                    }

                    if (data.items[i].name[0]) {
                        var name = data.items[i].name;
                    } else {
                        name = "nopic.png";
                    }

                    resultHtml += "<div class='result'>";
                    resultHtml += "<a href='" + data.items[i].external_urls.spotify + " '>" + "<img src='" + resImg + "'/>" + "</a>";
                    resultHtml += "<h2>" + "<a href='" + data.items[i].external_urls.spotify + " '>" + name + "</a>" + "</h2>";
                    resultHtml += "</div>";

                }
                // $(".results").html(resultHtml);
                $(".results").append(resultHtml);

                if (data.items.length == 0) {
                    $(".results").html("No results found for " + $("input").val());
                }


                if (location.search.indexOf('scroll=infinite') > -1) {
                    // console.log("initiate infinite scroll");
                    checkInfiniteScroll();
                    $("#more").hide();
                }
            }
        });
    };

    $("#go").on("click", function() {
        moreResults();
    });

    $("#more").on('click', function(){
        moreResults();
    });




    var timeoutId;
    function checkInfiniteScroll() {
        clearTimeout(timeoutId);

        if ($(window).height() + $(document).scrollTop() >= $(document).height() - 400) {
            moreResults();
        } else {
            timeoutId = setTimeout(checkInfiniteScroll, 2000);
        }

    }


})();
