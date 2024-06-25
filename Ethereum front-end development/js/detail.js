const goods = layui.data("goods");
axios.get(`goods/item/${goods.id}`).then((res) => {
  if (res.data.code === 1) {
    const goods = res.data.info;
    layui.$(".middleimg").attr("src", goods.img_big_logo);
    layui.$(".title").text(goods.title);
    layui.$(".old").text(goods.price);
    layui.$(".discount").text(goods.sale_type);
    layui.$(".curprice").text(goods.current_price);
    let regex = /src=\"\/\//g;
    console.info(goods.goods_introduce);
    let replacedText = goods.goods_introduce.replace(regex, function (match) {
      return 'src="https://';
    });
    console.info(replacedText);
    layui.$(".desc").html(replacedText);
    // 替换操作，将所有单词转换为大写
    // $(".desc").append(goods.goods_introduce);
    // layui.use("element", function () {
    //   var element = layui.element;
    //   element.init();
    // });
  } else {
    layui.layer.msg(res.code.message);
  }
});
