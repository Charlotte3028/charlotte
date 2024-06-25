axios.defaults.baseURL = "http://localhost:9000/";
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = layui.data("userinfo").token;
  return config;
});
