/**
 * 获取推荐列表信息
 */
function getRcItemList() {
  const oItems = document.getElementsByClassName('editor-preferences-list-item');

  const dataList = [];

  if (oItems.length) {
    const oItemList = [...oItems];

    oItemList.forEach((item, index) => {
      const oLink = item.getElementsByClassName('js-report-link')[0];

      const oCover = oLink.getElementsByClassName('course-card-cover')[0],
            oContent = oLink.getElementsByClassName('course-card-content')[0],
            oFooter = oLink.getElementsByClassName('course-card-footer')[0];

      const oImg = oCover.getElementsByTagName('img')[0], // img_src img_name (课程封面)
            oCardName = oContent.getElementsByClassName('course-card-name')[0],
            oLabelItems = oContent.getElementsByClassName('course-label-item'),

            oPriceItem = oFooter.getElementsByClassName('course-card-price')[0],
            oApplyNum = oFooter.getElementsByClassName('course-card-student')[0];

      const dataItem = {
        type: oLink.getAttribute('data-report-module'),
        id: parseInt(oLink.getAttribute('data-report-position')),
        origin_id: oLink.getAttribute('data-report-testid'),
        ...(
          oImg
            ? {
              img_src: oImg.getAttribute('data-src') || oImg.src || '',
              img_desc: oImg.getAttribute('alt'),
            }
            : {}
        ),
        title: oCardName.textContent || oCardName.getAttribute('title'),
        labels: [...oLabelItems].reduce((list, label) => {
          const oIcon = label.getElementsByClassName('course-label-icon')[0],
                oLabelName = label.getElementsByClassName('course-label-name')[0];

          const labelItem = {
            style: oIcon ? oIcon.getAttribute('style') : '',
            label_name: oLabelName.innerText,
          };
          list.push(labelItem);
          return list;
        }, []),
        price: oPriceItem.textContent,
        applyNum:
          oApplyNum.textContent
          ? parseInt(oApplyNum.textContent.match(/\d+/)[0])
          : ''
      };

      dataList.push(dataItem);
    });
  }

  return dataList;
}

/**
 * 获取热门分类列表
 */
function getHotCateList() {
  const hotCateItems = document.getElementsByClassName('hot-cate-item');
  const dataList = [];

  if (hotCateItems.length) {
    [...hotCateItems].forEach((oItem, index) => {
      const oLink = oItem.getElementsByClassName('js-report-link')[0],
            oImg = oItem.getElementsByClassName('hot-cate-item-icon')[0],
            oName = oItem.getElementsByClassName('hot-cate-item-name')[0];

      const dataItem = {
        id: parseInt(oLink.getAttribute('data-report-testid')) + index,
        type: oLink.getAttribute('data-report-module'),
        src: oImg.src || oImg.getAttribute('src'),
        name: oName.textContent,
      };
      
      dataList.push(dataItem);
    });
  }

  return dataList;
}