export default class PhonesService {
   static getPhones(request = 'phones') {
      return fetch(`https://muturgan.github.io/my_learning_project/data/phones/${ request }.json`)
         .then( response => response.json())
         .catch( error => console.error(error));
   }
}