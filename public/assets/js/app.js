// Wait for the page to load
$(document).ready(() => {
//==================================== FUNCTIONS ====================================
    function renderArticles() {
        const articleDiv = $("#articles");
        articleDiv.empty();
        let articleArr = [];
        $.getJSON("/articles", (data) => {
            for (let i = 0; i < data.length; i++) {
                articleArr.push(createArticle(data[i]));
            }
            articleDiv.append(articleArr);
        })
    };

    function createArticle(article) {
        const articleContainer = $("<div>");
        articleContainer.addClass("article");
        const articleHeader = $("<h2>");
        articleHeader.text(article.title);
        const articleBody = $("<div>");
        const articleSummary = $("<h4>");
        const articleImage = $("<img>");
        const saveButton = $("<button>");
        saveButton.addClass("saver");
        saveButton.text("Save Article");
        articleSummary.text(article.summary);
        articleImage.attr("src", article.image);
        articleImage.css({
            width: "60%"
        });
        articleBody.append(articleImage);
        articleBody.append(saveButton);
        articleBody.append(articleSummary);
        const articleFooter = $("<a>");
        articleFooter.attr("href", article.link);
        articleFooter.text("Link to Article");
        articleContainer.append(articleHeader);
        articleContainer.append(articleBody);
        articleContainer.append(articleFooter);
        return articleContainer;
    }
    


    //==================================== MAIN PROCESS ====================================
    renderArticles();
});