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

  form.on("submit(register)", function (data) {
    var username = data.field.username;
    var password = data.field.password;
    var rpassword = data.field.rpassword;
    var nickname = data.field.nickname;

    if (password !== rpassword) {
      layer.msg("两次密码不一致", { icon: 0 });
      return false;
    }
    axios
      .post("users/register", {
        username: username,
        password: password,
        nickname: nickname,
        rpassword: rpassword,
      })
      .then(function (response) {
        if (response.data.code === 1) {
          layer.msg(response.data.message, { icon: 1 });
          location.href = "./login.html";
        } else {
          layer.msg(response.data.message, { icon: 0 });
        }
      });

    return false;
  });
});
