layui.use(["form"], function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    required: function (value, item) {
      if (!value) {
        return "该项为必填项";
      }
    },
  });

  form.on("submit(rpwd)", function (data) {
    var oldPassword = data.field.oldpassword;
    var newPassword = data.field.newpassword;
    var rNewPassword = data.field.rnewpassword;
    axios
      .post(`users/rpwd`, {
        id: layui.data("userinfo").id,
        oldPassword,
        newPassword,
        rNewPassword,
      })
      .then(function (response) {
        if (response.data.code === 1) {
          layer.msg(response.data.message, { icon: 1 });
          layui.data("userinfo", null);
          location.href = "./login.html";
        } else {
          layer.msg(response.data.message, { icon: 0 });
        }
      });

    return false;
  });
});
