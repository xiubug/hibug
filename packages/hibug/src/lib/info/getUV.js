import UUID from 'shared/uuid';
import print from 'shared/print';

function getUV() {
  try {
    if (window.localStorage) {
      const now = new Date();
      let UV = localStorage.getItem('$HibugUV') || '';
      const time = localStorage.getItem('$HibugUVTime') || '';
      if ((!UV && !time) || (now.getTime() > time * 1)) {
        UV = UUID();
        localStorage.setItem('$HibugUV', UV);
        const today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} 23:59:59`;
        localStorage.setItem('$HibugUVTime', new Date(today).getTime());
      }
      return UV;
    }
  } catch (e) {
    print(e);
  }
}

export default getUV;
