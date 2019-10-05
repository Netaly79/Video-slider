"use strict"
let $searchForm=$("#search-form");
let $carousel=$(".carousel-inner");
let video=[];
let $left=$(".carousel-control-prev");
let $right=$(".carousel-control-next");

$searchForm.on("submit", function(event) {
    event.preventDefault();
    let querry=$(this).find("[name='search-term']").val().replace(/\s/g, "+");
    getVideo(querry);
});

function getVideo(query){
    let url= 'https://itunes.apple.com/search';
    $.ajax({
        url,
        method:"GET",
        data: `limit=10&entity=musicVideo&term=${query}`,
        dataType: "json"
    }).done((response) => {
         video=response.results;
         addVideo(video);
    }).fail ((error) => {
        console.log ("error", error);
    })
}

function addVideo(data)
{
    $carousel.empty();
    $('.carousel').carousel({
        interval: "false"
      });
    $("<div>").addClass("carousel-item active")
        .appendTo($carousel);
    let $firstframe=$(".active");$left.on("click", function (){
        $('video').trigger('pause');
    })
    $("<video>").addClass("d-block w-100")
    .attr("src",data[0].previewUrl)
    .attr("controls","controls")
    .appendTo($firstframe);

    for (var j=1; j<data.length; j++)
    {
        $("<div>").addClass("carousel-item")
        .attr("id",j)
        .appendTo($carousel);
    let $frame=$(`#${j}`);
    $("<video>").addClass("d-block w-100")
    .attr("src",data[j].previewUrl)
    .attr("controls","controls")
    .appendTo($frame);
    }  
}

$left.on("click", function (){
    $('video').trigger('pause');
});

$right.on("click", function (){
    $('video').trigger('pause');
});
