layui.use(["form"], function () {
  var form = layui.form;
  var layer = layui.layer;

  form.verify({
    required: function (value) {
      if (!value) {
        return "这里的内容必须填写哦！";
      }
    },
  });

  form.on("submit(login)", function (data) {
    var username = data.field.username;
    var password = data.field.password;

    axios
      .post("users/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.data.code === 1) {
          layer.msg("登录成功!", { icon: 1 });
          layui.data("userinfo", {
            key: "token",
            value: response.data.token,
          });
          layui.data("userinfo", {
            key: "nickname",
            value: response.data.user.nickname,
          });
          layui.data("userinfo", {
            key: "id",
            value: response.data.user.id,
          });

          location.href = "./index.html";
        } else {
          layer.msg("登录失败", { icon: 0 });
        }
      })
      .catch(function (error) {
        console.error("登录时出错了，请稍后再试:", error);
        layer.msg("登录时出错了，请检查网络或重试。");
      });

    return false;
  });
});
