const gulp = require('gulp');
const webserver = require('gulp-webserver');
const url = require('url');
const qs = require('qs'); //querystring 的简写
const list = [
    {
        "name":"百度",
        "address":"北京市海淀区西北旺",
        "type":"互联网|以上市|10000人以上",
        "search":"热招：前端工程师等2382个职位",
        "img":"img/1.png"
    },
    {
        "name":"北京来为科技",
        "address":"北京市昌平区沙河",
        "type":"IT软件|未融资|100-499人",
        "search":"热招：前端工程师等164个职位",
        "img":"img/2.png"
    },
    {
        "name":"最库教育",
        "address":"北京市海淀区五棵松",
        "type":"互联网|A轮|20-99人",
        "search":"热招：web前端工程师等12个职位",
        "img":"img/3.png"
    },
    {
        "name":"京东",
        "address":"北京市大兴区",
        "type":"移动互联网|以上市|10000人以上",
        "search":"热招：webGL等55个职位",
        "img":"img/4.png"
    },
]
gulp.task('mock',function(){
    gulp.src('.')
        .pipe(webserver({
            port:3000,
            middleware:function(req,res,next){
                //设置统一跨域
                res.setHeader('Access-Control-Allow-Origin','*');
                const method = req.method;
                const urlObj = url.parse(req.url,true);
                const pathname = urlObj.pathname;
                const params = urlObj.query;
                
                //判断请求方式
                if(method === "GET"){
                    switch(pathname){
                        case '/home':
                            res.setHeader('content-type','application/json;charset=utf-8');
                            res.end(JSON.stringify(list))
                        break;
                        default:res.end('没有任何内容')
                        break;
                    }
                }else if(method === "POST"){
                    var postStr = '';
                    req.on('data',chunk=>{
                        postStr += chunk;
                    })
                    req.on('end',()=>{
                        var postObj = {};
                        if(postStr.indexOf('{') !== -1 && postStr.indexOf('}') !== -1){
                            postObj = JSON.parse(postStr)
                        }else{
                            postObj = qs.parse(postStr)
                        }

                        switch(pathname){
                            case '/list':
                                res.setHeader('content-type','application/json;charset=utf-8');
                                res.end(JSON.stringify(list))
                            break;
                            default:res.end('没有任何内容')
                            break;
                        }

                    })
                }else if (method === "OPTION"){
                    res.writeHead(200,{
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    })
                    res.end();
                }
            }
        }))
})



gulp.task('default',['mock']);
