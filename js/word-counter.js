window.Wordcounter = {

    apiUrl: "http://localhost:8085/words",

    addWord: function () {
        var word = $("input[title='Word']").val();
        var data = {
            'word': word,
        };

        $.ajax(
            {
                url: Wordcounter.apiUrl,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (response) {
            console.log(response);
        });
    },

    getWordRow: function (item) {
        return `<tr>
 <td class="word">${item.word}</td>
   <td><a href="#" class="fa fa-trash delete" data-id="${item.id}"></a></td>
   <td><a href="#" class="fa fa-edit put" data-id="${item.id}"></a></td>
</tr>`
    },

    displayWords: function(items){
        console.log('Displaying word-counter.');
        var rows = '';

        items.forEach(item => rows += Wordcounter.getWordRow(item));

        console.log(rows);

        $('#word-counter tbody').html(rows);
    },

    getWords: function () {
        $.ajax(
            {
                url: Wordcounter.apiUrl,
                method: "GET"
            }).done(function (response) {
            console.log(response);

            Wordcounter.displayWords(response);
            Wordcounter.getWordCount()
        });
    },

    getWordCount: function (id) {
        $.ajax(
            {
                url: Wordcounter.apiUrl + '?id=' + id,
                method: "GET"
            }).done(function (response) {
            console.log(response);

            Wordcounter.displayWords(response)
        });
    },

    deleteWord: function(id){
        $.ajax(
            {
                url: Wordcounter.apiUrl + '?id=' + id,
                method: "DELETE"
            }).done(function (response) {
            console.log(response);

            Wordcounter.getWords(response);
        });
    },

    updateWord: function(id){

        var word = $("input[title='Word']").val();
        var data = {
            'word': word,
        };
        $.ajax(
            {
                url: Wordcounter.apiUrl + '?id=' + id,
                method: "PUT",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (response) {
            console.log(response);

            Wordcounter.getWords(response);
        });
    },

    bindEvents: function () {

        $("#create-word-counter-form").submit(function (event) {
            event.preventDefault();

            console.log('Submitting word-counter form');

            Wordcounter.addWord();
            Wordcounter.getWordCount();

            return false;
        });

        $('#word-counter tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');

            Wordcounter.deleteWord(id);
        });

        $('#word-counter tbody').delegate('.put', 'click', function () {
            var id = $(this).data('id');

            Wordcounter.updateWord(id);
        });
    }

};
Wordcounter.getWords();
Wordcounter.bindEvents();