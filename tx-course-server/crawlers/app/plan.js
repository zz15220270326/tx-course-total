

;(function () {
  var doc = window.document;
  // 学习时长信息
  var oUserInfoItems = doc.getElementsByClassName('user-info-item');

  var todayStudyTimeInfo = oUserInfoItems[1].getElementsByClassName('user-info-item__content')[0].textContent, // 今日学习时长
        overStudentsInfo = oUserInfoItems[0].getElementsByClassName('user-info-item__content')[0].textContent; // 超过平台学员

  var coursePlanData = [
    ...doc.getElementsByClassName('plan-course-card')
  ].reduce(function (list, infoEl) {
    /* sub el-info  */
    var oContainer = infoEl.getElementsByTagName('section')[0],
        oLink = infoEl.getElementsByTagName('a')[0],
        oCover = infoEl.getElementsByTagName('img')[0],
        oCourseCard = doc.getElementsByClassName('course-card-name')[0],
        oCourseProgress = infoEl.getElementsByClassName('course-progress')[0],
        oLastCourseInfo = infoEl.getElementsByClassName('course-live')[0];
    /* sub-data-info */
    var type = oContainer.getAttribute('data-report-module'),
        link = oLink.getAttribute('href'),
        img_src = oCover.src,
        title = oCourseCard.textContent,
        progress = oCourseProgress.innerText,
        lastCourseInfo = oLastCourseInfo.innerText;

    var dataItem = {
      type: type,
      link: link,
      img_src: img_src,
      title: title,
      progress: progress,
      lastCourseInfo: lastCourseInfo,
    };
    list.push(dataItem);

    return list;
  }, []);

  var result = {
    todayStudyTimeInfo,
    overStudentsInfo,
    coursePlanData,
  };

  return result;
})();