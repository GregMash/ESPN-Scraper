// Wait for the page to load
$(document).ready(() => {
    //==================================== FUNCTIONS ====================================
    // Saves articles
    function saveArticle() {
        const articleId = $(this).attr("id");
        $.ajax({
            method: "PUT",
            url: `/saved/${articleId}`
        }).then(() => {
            if (confirm("Article Saved! View Saved Articles?")) {
                location.assign("/saved");
            };
        });
    };

    // Removes articles from being saved
    function deleteArticle() {
        const articleId = $(this).attr("id");
        $.ajax({
            method: "PUT",
            url: `/deleted/${articleId}`
        }).then(() => {
            location.reload();
        });
    };

    // Creates a new note
    function createNote() {
        const newNote = {};
        const articleId = $(this).attr("id");
        newNote.title = $("#title-name").val().trim();
        newNote.body = $("#note-text").val().trim();
        $.ajax({
            method: "POST",
            url: `/articles/${articleId}`,
            data: newNote
        }).then(() => {
            alert("Note Saved!");
            location.reload();
        });
    };

    // Displays html for notes
    function displayNotes(note) {
        const { title, body, _id } = note;
        let displayBox = $("<div>");
        displayBox.addClass("note-body");
        let titleDisplay = $("<p>");
        let bodyDisplay = $("<p>");
        let deleteBtn = $("<button>");
        let hr = $("<hr>");
        deleteBtn.addClass("note-deleter");
        deleteBtn.attr("id", _id);
        titleDisplay.text(title || "No Title");
        bodyDisplay.text(body);
        deleteBtn.text("X");
        displayBox.append(deleteBtn, titleDisplay, hr, bodyDisplay);
        return displayBox;
    };

    // Deletes a note
    function deleteNote() {
        if (confirm("Are you sure you want to delete this note?")) {
            const id = $(this).attr("id");
            $.ajax({
                url: `/notes/delete/${id}`,
                type: 'POST',
                data: id
            }).then(() => {
                location.reload();
            });
        };  
    };
    


    //==================================== MAIN PROCESS ====================================

    $(document).on("click", ".saver", saveArticle);
    $(document).on("click", ".deleter", deleteArticle);
    $(document).on("click", ".note-saver", createNote);
    $(document).on("click", ".note-deleter", deleteNote);

    $('#exampleModal').on('show.bs.modal', function (event) {
        // console.log($(this).parents());
        const button = $(event.relatedTarget); // Button that triggered the modal
        const id = button.data('whatever'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

        $.ajax({
            method: "GET",
            url: `/notes/${id}`
        }).then((data) => {
            let notesArr = [];
            for (let i = 0; i < data.length; i++) {
                notesArr.push(displayNotes(data[i]));
            };
            $(".notes-area").append(notesArr);
            //$(".modal-title").text(title);
            
        });

    });
});