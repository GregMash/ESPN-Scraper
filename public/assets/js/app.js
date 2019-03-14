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
        let articleId = $(this).parents("div.modal-content").attr("id");
        newNote.body = $("#note-text").val().trim();
        $.ajax({
            method: "POST",
            url: `/articles/${articleId}`,
            data: newNote
        }).then((data) => {
            $("#note-text").empty();
            console.log(data);
        });
    };

    



    //==================================== MAIN PROCESS ====================================

    $(document).on("click", ".saver", saveArticle);
    $(document).on("click", ".deleter", deleteArticle);
    $(document).on("click", "#note-saver", createNote);

});