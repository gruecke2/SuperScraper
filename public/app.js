// Grab the articles as a json
getArticles();

$(document).on("click", "#scrapeBtn", function(){
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .then(data => {
    location.reload();
    alert(data);
    getArticles();
  })
})

var thisId = null;
// Whenever someone clicks a p tag
$(document).on("click", "#commentBtn", function() {
  // Save the id from the p tag
  thisId = $(this).attr("data-id");
  console.log(thisId);
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      
      console.log("cb on comment", data);
      console.log("note l", data.note);
      $(".articleNotes").empty();

      for(let i = 0; i < data.note.length; i++){
        $(".articleNotes")
        .append(`<div class=noteBod>
        <span data-id='${data.note[i]._id}' class=delNote aria-hidden="true">×</span>
        <p>${data.note[i].body}</p>
        <h5>- ${data.note[i].author}</h5>
        </div>`);
      }
    });
});



// When you click the savenote button
$(document).on("click", "#saveNote", function() {
  
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      author: $("#authorinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log("note post", data);
      // Empty the notes section
      //$("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#authorinput").val("");
  $("#bodyinput").val("");
});

//Deleting a note
$(document).on("click", ".delNote", function() {
  let noteID = $(this).data("id");
  console.log(noteID)
  $.ajax({
    method: "DELETE",
    url: "/" + noteID
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log("note post", data);
      window.location.reload();
    });
  })

function getArticles() {
  $.ajax({
    method: "GET",
    url: "/articles"
   }).then(function (data) {
    console.log(data)
  });
}

