import createRequest from '../api/createRequest';

export default function onRemoveFilm(event, id, onDataChange, filmName, openModal) {
  event.preventDefault();
  
  openModal(`Вы действительно хотите удалить фильм "${filmName}"?`, () => {
    createRequest({
      url: 'film/' + id,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id),
    }).then((response) => {
      if (response.success) {
        onDataChange(response.result);
      } else {
        alert(response.error);
      }
    });
  });
};