(function() {
  'use strict';

  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  
  //Create variables
  const searchBtn = document.getElementsByTagName('button')[0];
  console.log(searchBtn);
  const movieInput = document.getElementById('search');

  //Create Event Listener for Button
  searchBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    fetchMovies();
  })

  function fetchMovies () {
    //Confirm submission text
    if (movieInput.value !== '')  {
      fetch(`https://omdb-api.now.sh/?s=${movieInput.value}`)
        .then (response => response.json())
        .then( (data) => {
          //Loops for all movies
          for (let i = 0; i < data.Search.length; i++) {
            let movieObj = {};
            
            let title = data.Search[i].Title;
            movieObj.title = title;
  
            let id = data.Search[i].imdbID
            movieObj.id = id;
            
            let posterURL = data.Search[i].Poster;
            movieObj.poster = posterURL;
            
            let year = data.Search[i].Year;
            movieObj.year = year;
            
            let type = data.Search[i].Type;
            movieObj.type = type;
            
            movies.push(movieObj);
          }

          renderMovies();
          
          movieInput.value = "";
          movies = [];
        })
    }
  }

})();