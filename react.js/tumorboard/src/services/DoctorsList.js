import axios from 'axios';

const SpringApiDocsListUrl="http://localhost:8000/cancerMoonshot/getDoctorsDetails";

class DocsList{

    getApi(){
        return axios.get(SpringApiDocsListUrl);
    }
}
export default new DocsList();