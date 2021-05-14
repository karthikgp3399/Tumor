import axios from 'axios';

const SpringApiUrl="http://localhost:8000/cancerMoonshot/getMeetingDetails";

class Service{

    getApi(){
        return axios.get(SpringApiUrl);
    }
   
}
export default new Service();