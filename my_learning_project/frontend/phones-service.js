export default class PhonesService {
   static getPhones(request = 'phones') {
      let dataFromServer = fetch(`https://muturgan.github.io/my_learning_project/data/phones/${ request }.json`)
         .then( response => { return response.json(); })
         .catch( error => { console.error(error); });
         
      return dataFromServer;
   }
}