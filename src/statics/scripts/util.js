module.exports = {
  /* 设置cookie */
  setCookie (name, value, expires){
    var exdate = new Date();
    //设置过期时间以小时为单位
    exdate.setTime(exdate.getTime() + (expires * 60 * 60 * 1000));
    document.cookie = name + "=" + escape(value) +
    ((expires == null) ? "" : ";expires=" + exdate.toGMTString());
  },
  /* 获取cookie */
  getCookie (name){
    var start, end;
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + "=");
        if (start !== -1) {
            start = start + name.length + 1;
            end = document.cookie.indexOf(";", start);
            if (end === -1) end = document.cookie.length;
            return unescape(document.cookie.substring(start, end));
        }
    }
    return null;
  },
  /* 删除cookie */
  delCookie (name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null){
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  },
  formatDate(date, fmt){
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
}
