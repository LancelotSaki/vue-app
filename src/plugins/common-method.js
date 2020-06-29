const _common_method = function () {
  /* 数组转json
   * @param array 数组
   * @param type 类型 json array
   */
  function formatArray(array, type) {
    var dataArray = {};
    $.each(array, function () {
      if (dataArray[this.name]) {
        if (!dataArray[this.name].push) {
          dataArray[this.name] = [dataArray[this.name]];
        }
        dataArray[this.name].push(this.value || '');
      } else {
        dataArray[this.name] = this.value || '';
      }
    });
    return ((type == "json") ? JSON.stringify(dataArray) : dataArray);
  }
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) {
      return unescape(r[2]);
    }
    return null; //返回参数值
  }
  function sleep(d) {
    for (var t = Date.now(); Date.now() - t <= d;) ;
  }
  function formatDate(now) {
    var year = now.getFullYear();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var date = ("0" + now.getDate()).slice(-2);
    var hour = ("0" + now.getHours()).slice(-2);
    var minute = ("0" + now.getMinutes()).slice(-2);
    var second = ("0" + now.getSeconds()).slice(-2);
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  }

  var d = {};
  d.formatArray = formatArray;
  d.getUrlParam = getUrlParam;
  d.sleep = sleep;
  d.formatDate = formatDate;
  return d;
}();