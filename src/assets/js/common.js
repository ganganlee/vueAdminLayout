function str2time(str) {
  let timeStamp = new Date(str);
  let nYear     = timeStamp.getFullYear();
  let nMonth    = timeStamp.getMonth()+1;
  let nDay      = timeStamp.getDate();
  return nYear+'年'+nMonth+'月'+nDay+'日';
}

export default {
  str2time:str2time
}
