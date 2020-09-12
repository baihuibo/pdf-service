@5i5j/proxy-pdf-service
==========

通过代理使 pdf-service 可以使用本地浏览器做为调试服务使用

使用方法，无需安装服务，在控制台执行命令即可启动代理

```bash
$ npx @5i5j/proxy-pdf-service
``` 

可以通过`--port`参数来调整监听端口，默认 `20822`
```bash
$ npx @5i5j/proxy-pdf-service --port=20822
```