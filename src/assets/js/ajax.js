import Axios from 'axios'

function Ajax(url,data,callBack,method) {
  if(method === undefined){
    method = 'get';
  }

  if(method === 'get'){
    Axios.get(url,{
      params:data
    }).then((res)=>{
      let data = res.data;
      callBack(data);
    }).catch((error)=>{
      alert(error);
    });
  }else {
    Axios({
      method: method,
      url: url,
      data: data
    }).then((res) => {
      let data = res.data;
      callBack(data);
    }).catch((error) => {
      alert(error);
    });
  }
}
export default Ajax;
