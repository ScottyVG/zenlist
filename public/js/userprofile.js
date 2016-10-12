(function() {
  'use strict';

  $.getJSON('/lists')
    .done((lists) => {
      const $lists = $('#lists');

      for (const list of lists) {

        const $col = $('<div>').addClass('col-md-12');
        const $card = $('<div>').addClass('card');
        const $cardBlock = $('<div>').addClass('card-block');
        const $cardTitle = $('<div>').addClass('card-title');
        const $cardDescription = $('<div>').addClass('card-text');

        $col.append($col);
        $card.append($card);
        $cardBlock.append($cardBlock);
        $cardTitle.append($cardTitle);
        $cardDescription.append($cardDescription);

        // $.getJSON('/tasks')
        // .done((tasks) => {
        //   const $tasks = $('#tasks');
        //
        //   for (const task of task) {
        //
        //     const $col = $('<div>').addClass('col s6 m4 l3');
        //     const $card = $('<div>').addClass('card');
        //     const $cardBlock = $('<div>').addClass('card-block');
        //     const $cardTitle = $('<div>').addClass('card-block');
        //
        //     // const $img = $('<img>').attr({
        //     //   src: fav.coverUrl,
        //     //   alt: fav.title
        //     // });
        //
        //     $cardImage.append($img);
        //     $anchor.append($cardImage);
        //     $card.append($anchor);
        //     $col.append($card);
        //     $favs.append($col);
        //   }
      }
    })
    .fail(() => {
      window.location.href = '/signup.html';
    });
})();
