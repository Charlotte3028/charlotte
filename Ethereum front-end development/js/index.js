var userinfo = layui.data("userinfo");
if (!userinfo.nickname) {
  layui.$(".off").addClass("active").siblings().removeClass("active");
} else {
  layui.$(".on").addClass("active").siblings().removeClass("active");
  layui.$(".nickname").text(userinfo.nickname);
}

axios.get("carousel/list").then((res) => {
  if (res.data.code === 1) {
    var imageElements = layui.$.map(res.data.list, function (item) {
      return `<div class="carousel-image"><img src="http://localhost:9000/${item.name}"></div>`;
    }).join("");
    var carouselContainerHTML = `<div carousel-item>${imageElements}</div>`;
    layui.$("#carousel").html(carouselContainerHTML);
    layui.carousel.render({
      elem: "#carousel", // 选择器
      width: "1200px", //设置容器宽度
      height: "600px",
      arrow: "hover",
      anim: "fade", //切换动画方式
    });
  }
});

layui.$(".self").click(function () {
  location.href = "./self.html";
});

layui.$(".logout").click(function () {
  var id = layui.data("userinfo").id;
  axios
    .get(`users/logout?id=${id}`, {
      headers: {
        Authorization: layui.data("userinfo").token,
      },
    })
    .then((res) => {
      if (res.data.code === 1) {
        layui.data("userinfo", null);
        location.href = "./index.html";
      }
    });
});
