$(function() {
	queue()
		.defer(d3.csv, "movies_withLinks_clean.csv")
  .await(dataDidLoad);
})
var year = 0
var currentData
var score = 0
var movieData = null

function dataDidLoad(error,movies) {
    d3.select("#year").style("visibility","hidden")
    d3.select("#hint").style("visibility","hidden")
    movieData=movies
    generateHint()
}
function display(){
    d3.select("#year").style("visibility","visible")
    d3.select("#hint").style("visibility","visible")
    
    var totalMovies = movieData.length
    var randomMovie = Math.round(Math.random()*totalMovies)
    
    
    var movie = movieData[randomMovie]
    
    currentData=movie
    d3.select("#movieName").html(movie.name)
    
    year = movie.year
    //console.log(year)
   // console.log(movie)
}

function generateHint(){
    d3.select("#hint")
        .attr("cursor","point").on("click",
            function(){
                var hintText = ""
                //console.log(currentData)
                if( currentData.genre !="NA"){
                    hintText += currentData.genre
                }
                
                if(currentData.actors != "NA"){
                    hintText += " staring"+ currentData.actors
                }
                
                if( currentData.director !="NA"){
                    hintText += " directed by "+ currentData.director
                }                
                d3.select("#hint").html(hintText)
            })
    //console.log(currentData)
}


function checkYear() {
    d3.select("#year").style("visibility","hidden")
    d3.select("#hint").style("visibility","hidden")
    
    var points
    var yearEntered = document.getElementById("myText").value
//    console.log([year,yearEntered])
    if(String(year)==String(yearEntered)){
        points = 3
        d3.select("#response").html(points + " points, you got it right")
        
    }
    else if(Math.abs(parseInt(year)-parseInt(yearEntered))==1){
        points = 2
        d3.select("#response").html(points + " points, the correct year was "+ year)
        
    }else if(Math.abs(parseInt(year)-parseInt(yearEntered))==2){
        points = 1    
        d3.select("#response").html(points + " points, the correct year was "+ year)
            
    }else{
        points = 0
        d3.select("#response").html(points + " points, the correct year was "+ year)
        
    }
    score = score+points
    d3.select("#score").html("Total Score: "+score)    
    d3.select("#hint").html("show hint")
    d3.select(".gobutton").attr("value","GO AGAIN")
    points = 0
    
}