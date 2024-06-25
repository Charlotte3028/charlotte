const id = layui.data("userinfo").id;
axios.get(`users/info?id=${id}`).then((res) => {
  if (res.data.code === 1) {
    layui.$(".username").val(res.data.user.username);
    layui.$(".age").val(res.data.user.age);
    layui.$(".gender").val(res.data.user.gender);
    layui.$(".nickname").val(res.data.user.nickname);
  }
});

layui.use(["form"], function () {
  var form = layui.form;
  // 表单验证
  form.verify({
    required: function (value, item) {
      if (!value) {
        return "该项为必填项";
      }
    },
  });

  form.on("submit(update)", function (data) {
    var age = data.field.age;
    var gender = data.field.gender;
    var nickname = data.field.nickname;
    axios
      .post("users/update", {
        id: layui.data("userinfo").id,
        age: age,
        gender: gender,
        nickname: nickname,
      })
      .then(function (response) {
        if (response.data.code === 1) {
          layui.layer.msg(response.data.message, { icon: 1 });
          layui.data("userinfo", {
            key: "nickname",
            value: response.data.user.nickname,
          });
        } else {
          layui.layer.msg(response.data.message, { icon: 0 });
        }
      });

    return false;
  });
});
