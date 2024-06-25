var $ = layui.$;
var layer = layui.layer;
var pageNum = 0;
axios.get("goods/category").then((res) => {
  if (res.data.code === 1) {
    var $ul = $(".category");
    $ul.empty();
    $.each(res.data.list, function (index, item) {
      var $li = $("<li>").text(item);
      if (index === 0) {
        $li.addClass("active");
      }
      $ul.append($li);
    });
  } else {
    layer.msg(res.data.message);
  }
});

$(".category").on("click", "li", function () {
  $(this).siblings().removeClass("active").end().addClass("active");
  params.category = $(this).text();
  getList();
});

var params = {
  current: 1,
  pagesize: 12,
  category: "",
  filter: "",
  saleType: 10,
  sortType: "id",
  sortMethod: "ASC",
  search: "",
};

$(".saleBox li").on("click", function () {
  $(this).siblings().removeClass("active").end().addClass("active");
  $(".hotBox li").removeClass("active");
  $(".sortBox li").removeClass("active");
  var saleType = $(this).data("type");
  params.saleType = saleType;
  params.page = 1;
  getList();
});

$(".hotBox li").on("click", function () {
  $(this).siblings().removeClass("active").end().addClass("active");
  var filterType = $(this).data("type");
  $(".saleBox li").removeClass("active");
  $(".sortBox li").removeClass("active");
  params.filter = filterType;
  params.page = 1;
  getList();
});

$(".sortBox li").on("click", function () {
  $(this).siblings().removeClass("active").end().addClass("active");
  $(".saleBox li").removeClass("active");
  $(".hotBox li").removeClass("active");
  var sortType = $(this).data("type");
  var sortOrder = $(this).data("method");
  params.sortType = sortType;
  params.sortMethod = sortOrder;
  params.page = 1;
  getList();
});

$(".search").on("blur", function () {
  params.search = $(this).val();
  params.current = 1;
  getList();
});

$(".first").on("click", function () {
  params.current = 1;
  checkDisabled();
  getList();
});
$(".prev").on("click", function () {
  params.current = params.current - 1;
  checkDisabled();
  getList();
});
$(".next").on("click", function () {
  params.current = params.current + 1;
  checkDisabled();
  getList();
});
$(".last").on("click", function () {
  params.current = pageNum;
  checkDisabled();
  getList();
});
$(".go").on("click", function () {
  var pageNum = parseInt($(".jump").val());
  if (!isNaN(pageNum)) {
    params.current = pageNum;
    checkDisabled();
    getList();
  }
});
$(".pagesize").on("change", function () {
  params.limit = parseInt($(this).val());
  params.current = 1;
  getList();
});
function checkDisabled() {
  if (params.current == 1) {
    $(".first").addClass("disable");
    $(".prev").addClass("disable");
  } else {
    $(".first").removeClass("disable");
    $(".prev").removeClass("disable");
  }
  if (pageNum == 1 && params.current == 1) {
    $(".first").addClass("disable");
    $(".prev").addClass("disable");
    $(".last").addClass("disable");
    $(".next").addClass("disable");
  }
  if (params.current == pageNum) {
    $(".last").addClass("disable");
    $(".next").addClass("disable");
  } else {
    $(".last").removeClass("disable");
    $(".next").removeClass("disable");
  }
}
function getList() {
  axios.get("goods/list", { params }).then((res) => {
    if (res.data.code === 1) {
      const $listContainer = $(".list.container");
      $listContainer.empty();
      res.data.list.forEach((product) => {
        const $li = $("<li>", { "data-id": product.goods_id });
        const $showDiv = $("<div>", { class: "show" });
        $("<img>").attr("src", product.img_big_logo).appendTo($showDiv);
        if (product.is_hot) {
          $("<span>", { class: "hot" }).text("热销").appendTo($showDiv);
        }
        if (product.is_sale) {
          $("<span>").text("折扣").appendTo($showDiv);
        }
        const $infoDiv = $("<div>", { class: "info" });
        $("<p>", { class: "title" }).text(product.title).appendTo($infoDiv);

        $("<p>", { class: "price" })
          .append(
            $("<span>", { class: "curr" }).text(`¥ ${product.current_price}`)
          )
          .append($("<span>", { class: "old" }).text(`¥ ${product.price}`))
          .appendTo($infoDiv);

        $li.append($showDiv).append($infoDiv).appendTo($listContainer);
      });
      $(".total").html(`${params.current}/${res.data.total}`);
      pagesize = parseInt($(".pagesize").val());
      pageNum = Math.ceil(res.data.total / pagesize);
    } else {
      layer.msg(res.data.message);
    }
  });
}

getList();

$(".list").on("click", "li", function () {
  var id = $(this).data("id");
  layui.data("goods", {
    key: "id",
    value: id,
  });
  location.href = "./detail.html";
});
