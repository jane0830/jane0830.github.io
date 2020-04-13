$(document).ready(function () {
    //when search is click run code
    $("#search").click(performSearch);

    //handle enter key in the input
    $('#searchTerm').keypress(function (event) {
        if (event.keyCode === 13) {
            performSearch();
        }
    });

    //
    function performSearch() {
        var searchTerm = $("#searchTerm").val();

        var url = "https://en.wikipedia.org/w/api.php?action=query&generator=prefixsearch&gpssearch=" + searchTerm + "&prop=extracts&exintro=1&explaintext=1&redirects=1&prop=extracts&origin=*&format=json";

        //wikipedia API ajax call
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            dataType: "json",
            success: function (data) {
                const pages = [];
                for (let prop in data.query.pages) {
                    pages.push(data.query.pages[prop]);

                }
                pages.sort(function (a, b) {
                    return b.index - a.index;
                });
                $("#output").html('');

                let url = "https://en.wikipedia.org/wiki/";

                for (let i = 0; i < pages.length; i++) {
                    let formattedTitle = pages[i]['title'].replace(' ', '_');
                    let description = pages[i]['extract'];
                    let index = description.indexOf(".");
                    let newExtract = description.slice(0, index);
                    $("#output").prepend("<li><a href= " + url + formattedTitle + ">" + pages[i]['title'] + "</a><p>" + newExtract + "... " +
                        "</p></li>");
                }

                //console.log(pages);
            },
            error: function (errorMessage) {
                alert("Error");
            }
        });

    }




})