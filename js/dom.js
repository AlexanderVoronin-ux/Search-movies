export let movieList = null;
export let inputSearch = null;
export let triggerMode = false;

export const createElement = ({
  type,
  attrs,
  container = null,
  position = 'append',
  evt = null,
  handler = null
}) => {
  const el = document.createElement(type);

for (let key in attrs) {
  if (key !== 'innerText') el.setAttribute(key, attrs[key]);
  else el.innerHTML = attrs[key];
}

if (container && position === 'append') container.append(el);
if (container && position === 'prepend') container.prepend(el);
if (evt && handler) el.addEventListener(evt, handler);
return el;
}

export const createStyle = () => {
  const headStyle = document.createElement('style');
  headStyle.innerHTML = `
  * {
  box-sizing: border-box;
}
body {
  background-color: rgb(98, 98, 138);
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  padding: 20px;
  max-width: 1280px;
  margin: auto;
}
.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.movie {
  display: flex;
  align-content: center;
  justify-content: center;
}
.movie__image {
  width: 100%;
  object-fit: cover;
}
.search {
  margin-bottom: 30px;
}
.search__label-input {
  display: block;
  margin-bottom: 10px;
}
.search__input {
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  max-width: 400px;
  width: 100%;
  border-radius: 15px;
  border: 2px solid darkcyan;
  margin-bottom: 10px;
  background-color: rgb(116, 202, 202);
  outline: none;
}
.search__input:hover,
:focus {
  background-color: rgb(180, 223, 110);
}
::placeholder {
  color: rgb(3, 3, 3);
}
.search__label-checkbox {
  font-size: 15px;
  display: block;
  margin-top: -20px;
  margin-left: 25px;
}
`;
  document.head.append(headStyle);
};

export const createMarkup = () => {
  const container = createElement({
  type: 'div',
  attrs: {class: 'container'},
  container: document.body,
  position: 'prepend'
});

createElement({
  type: 'h1',
  attrs: {innerText: 'Приложение для поиска фильмов'},
  container: container
});

 const searchBox = createElement({
    type: 'div',
    attrs: {class: 'search'},
    container: container
  });

 createElement({
    type: 'label',
    attrs: {
      class: 'search__label-input',
      for: 'search',
      innerText: 'Поиск фильмов'
  },
    container: searchBox
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      class: 'search__input',
      id: 'search',
      type: 'text',
      placeholder: 'Введите запрос на английском языке'
  },
    container: searchBox
  });

  createElement({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox'
  },
    container: searchBox,
    evt: 'click',
    handler: () => triggerMode = !triggerMode
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-checkbox',
      for: 'checkbox',
      innerText: 'Добавлять фильмы к существующему списку'
  },
    container: searchBox
  });


movieList = createElement({
  type: 'div',
  attrs: {class: 'movies'},
  container: container});
};

export const clearMoviesMarkup = (el) => el && (el.innerHTML = "");

export const addMovieToList = (movie) => {
  const item = createElement({
  type: 'div',
  attrs: {class: 'movie'},
  container: movieList
});
  createElement({
  type: 'img',
  attrs: {class: 'movie__image',
          src: /(http|https):\/\//.test(movie.Poster) ? movie.Poster : 'assets/img/no_image.png'},
  container: item
});
};
