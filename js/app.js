/************************************************************************
      This is my javascript file to add interaction to the page
************************************************************************/

//Problem: Too much data displayed at once on the page and it's hard to locate
  //which student you are looking for.
//Solution: Reduce the number of students per page to ten , add page numbers
  //to the bottom of the page to change pages and then add a search feature.

/**************************************************************
                    Declared variables
*************************************************************/
//the array of student items
var li = document.getElementsByClassName('student-item cf');
var get = document.getElementsByTagName("a");
var getButton = document.getElementsByTagName("button")
var head =  document.getElementsByTagName("h2")[0].setAttribute("id","header");
//calculates the length of the array of student items
var listItemsLength = li.length;
var itemsPerPage = 10 ;
var numOfPages = Math.ceil(listItemsLength / itemsPerPage);
var pageincr = (numOfPages + 1);

/************************************************************/

/***************************************************************
                       Functions
***************************************************************/
//this function hides the entire student list
var hideList = function(){
for (var i = 0; i < arrayLength; i ++) {
    array[i].style.display = 'none';
  }
}

//This function displays the first page.
var firstPage = function() {
  //adds class .active to first pagination link.
  $((get)[0]).addClass("active");
  hideList();
  //displays the first ten students
  for (var i = 0; i < itemsPerPage; i ++) {
      array[i].style.display = 'inherit';
    }

}

// dynamically adds html elements
var addElements = function(){
  var div = document.createElement("div");
  var uList = document.createElement("ul");
  //adds the id and class attributes
  uList.id = "uList";
  div.className = "pagination";
  div.id = "paginate";
  //appends the unordered list to the div
  div.appendChild(uList);
  //appends the div to the body.
  document.getElementsByClassName("page")[0].appendChild(div);

}

//this function dynamically adds the list,anchor and text elements for the pagination links
var paginationLiAnchorText = function(a){
  //creates the list elements that contains the  pagination links
  var listItem = document.createElement("li");
  var a = document.createElement("a");
  var textnode = document.createTextNode(i);
  // appends the numbers of the pages to the achor elements
  a.appendChild(textnode);
  // adds the href attribute
  a.href = "#";
  //appends the anchor elemnts to the list elements
  listItem.appendChild(a);
  //appends the list elements to the unordered list
  document.getElementById("uList").appendChild(listItem);

}

// Displays the correspondeing page when a link is clicked
var pageDisplay = function(){
  $(get).click(function(){
      //removes the class "active" from all links,adds the class "active" to the link clicked
      $(get).removeClass("active");
      $(this).addClass("active");
      var linkNumber = $(this).text();
      //this if statement creates the parameters to be used for the slice method
      // when a pagination link is clicked the number selected is used to calculate
      // the beginning and end positions for the slice
      if(linkNumber == 1){
        //the first position in the array is zero not one so for the first page
        // the beginning position must be zero
        var pageStart = 0;
        //calculates the end position for the slice
        var pageStop =  (linkNumber * itemsPerPage)   ;
         }else {
        var pageStart = ((linkNumber * itemsPerPage)  )  - itemsPerPage;
        var pageStop =  ((linkNumber * itemsPerPage))   ;
      }

        hideList();
       //displays the correspondeing page depending on which pagination link is clicked
        $(array).slice(pageStart,pageStop).show();


       });

}

/**************************************************************/


/**************************************************************
            Dynamically adds a search bar
**************************************************************/
// creates the html elements that is to be added dynamically
//to the page to create the search bar
var div = document.createElement("div");
var input = document.createElement("input");
var button = document.createElement("button");
var textnode = document.createTextNode("Search");
//adds the attributes needed to the various elements
div.className = "student-search";
input.placeholder = "Search for students...";
input.id = "entry";
//the input is appended to the div
div.appendChild(input);
//the text is appended to the button and the button to the div
div.appendChild(button).appendChild(textnode);
// the div is appended to the body.
document.getElementsByClassName("page-header cf")[0].appendChild(div);

/*************************************************************/

/**************************************************************
            Dynamically created Pagination links
**************************************************************/
//creates the div and ul elements
addElements();
//Adds list items, anchor elements and page numbers

 i = 1 ;
//iterates the process equivalent to the number of pages required
while(i < pageincr) {
    paginationLiAnchorText();
  i += 1;
}

/***************************************************************/

/***************************************************************
                      Pagination Process
***************************************************************/
array = li;
arrayLength = listItemsLength;

// calls the function that displays the first ten items when the page loads
firstPage();
//  the pagination process
pageDisplay();



 /**************************************************************
                      Search Process
***************************************************************/
//detects any change in the value of the input
$("input").change(function(){
    var dataEntry = $(this).val();
    //searches the students list and displays the names that match the value
    //of the input and hides what doesn't match

    var showMatch = $(li).find("h3:contains("+ dataEntry +")").parent().parent().show();
    noMatch = $(li).find("h3:not(:contains("+ dataEntry +"))").parent().parent().hide();





// Displays alert if no match was found
    if(noMatch.length === li.length){
         window.alert("No Match Found");
    }


    var matchLength = showMatch.length;
    var numOfSearchPages = Math.ceil(matchLength / itemsPerPage);

   //repalces the regular pagination links with the search pagination links
   $(paginate).replaceWith(function(){
    addElements();
});

     i = 1 ;
    //iterates the process equivalent to the number of pages required
      while(i < (numOfSearchPages + 1) ) {
        paginationLiAnchorText();
      i += 1;
    }

   delete array;
   delete arrayLength;
   arrayLength = matchLength;
   array = showMatch;

   // calls the function that displays the first ten items when the page loads
   firstPage();
   //  the pagination process
   pageDisplay();


});

//checks a letter when typed that javascript can pick up in the input value
//when the search button is clicked
$(getButton).click(function(){

   if($("input").val() === "" ){

     location.reload();
  }

   }).keyup(function(){
  $(this).change();

});
