import createRequest from '../api/createRequest.js';
import showMessageSaved from './showMessageSaved.js';

const onChangeSeances = (event, data, onDataChange, dataSeances, onDataSeancesChange) => {
  event.preventDefault();
  const { currentTarget } = event;

  // Добавление сеансов
  dataSeances.forEach(seance => {
    const seanceFound = data?.seances.find(seanceSaved => seance.id === seanceSaved.id);
    if (!seanceFound) {
      const newSeanceData = {};
      newSeanceData.seanceHallid = seance.seance_hallid;
      newSeanceData.seanceFilmid = seance.seance_filmid;
      newSeanceData.seanceTime = seance.seance_time;

      createRequest({
        url: 'seance',
        method: 'POST',
        headers: {
          'Content-Type': 'applicaton/json'
        },
        body: JSON.stringify(newSeanceData),
      }).then((response) => {
        if (response.success) {
          onDataChange(response.result);
          onDataSeancesChange(response.result);
          showMessageSaved(currentTarget);
        } else {
          alert(response.error);
        }
      });
    }
  });

  // Удаление сеансов
  data?.seances.forEach(seanceSaved => {
    const seanceFound = dataSeances.find(seance => seance.id === seanceSaved.id);
    if (!seanceFound) {
      createRequest({
        url: 'seance/' + seanceSaved.id,
        method: 'DELETE',
        headers: {
          'Content-Type': 'applicaton/json'
        },
        body: JSON.stringify(seanceSaved.id),
      }).then((response) => {
        if (response.success) {
          onDataChange(response.result);
          onDataSeancesChange(response.result);
          showMessageSaved(currentTarget);
        } else {
          alert(response.error);
        }
      });
    }
  });
};

export default onChangeSeances;