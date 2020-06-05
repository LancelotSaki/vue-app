const _common_method = function () {
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
  d.formatDate = formatDate;
  return d;
}();