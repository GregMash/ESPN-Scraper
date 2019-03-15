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
    // Removes articles from saved
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
        let newNote = {};
        let articleId = $(this).attr("id");
        newNote.title = $("#title-name").val().trim();
        newNote.body = $("#note-text").val().trim();
        $.ajax({
            method: "POST",
            url: `/articles/${articleId}`,
            data: newNote
        }).then((data) => {
            console.log(data);
            $("#note-text").val("");
            $("#title-name").val("");
        });
    };

    //==================================== MAIN PROCESS ====================================

    $(document).on("click", ".saver", saveArticle);
    $(document).on("click", ".deleter", deleteArticle);
    $(document).on("click", ".note-saver", createNote);

    $('#exampleModal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget) // Button that triggered the modal
        let id = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

        $.ajax({
            method: "GET",
            url: `/articles/${id}`
        }).then((data) => {
            const { title, notes } = data;
            $(".modal-title").text(title);
            $(".notes-list").text(notes);
        });
        // modal.find('.modal-title').text('New message to ' + recipient)
        // modal.find('.modal-body input').val(recipient)
      })

});