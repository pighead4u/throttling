#


## 陈天架构理解
* Throtting--rateLimit是在这里做的
* Parser/Validation--解析 HTTP request 包含的 headers，body 和 URL 里的 querystring，并对解析出来的结果进行 validation
* ACL--控制资源能否被访问的另一个途径是 ACL
* Normalization--这个组件的作用是把请求的内容预处理，使其统一
* authentication--用户身份验证
* authorization--用户有了身份之后，我们进一步需要知道用户有什么样的权限访问什么样的资源
* conditional request--在访问的入口处，如果访问是 PUT/PATCH 这样修改已有资源的操作，好的 API 实现会要求客户端通过 conditional request（if-match / if-modified）做 concurrent control，目的是保证客户端要更新数据时，它使用的是服务器的该数据的最新版本，而非某个历史版本，否则返回 412 precondition failed
* preprocessing hook
* router
* processing--业务逻辑处理
* postprocessing hook
* Conditional request--在访问的出口处，如果访问的是 GET 这样的操作，好的 API 实现会支持客户端的 if-none-match/if-not-modified 请求。当条件匹配，返回 200 OK 和结果，否则，返回 304 Not Modified。304 Not Modified 对客户端来说如同瑰宝，除了节省网络带宽之外，客户端不必刷新数据
* Response normalization--和 request 阶段的 normalization 类似，在输出阶段，我们需要将结果转换成合适的格式返回给用户
* Serialization--如果 API 支持 content negotiation，那么服务器在有可能的情况下，优先返回客户端建议的输出类型。同一个 API，android 可以让它返回 application/msgpack；web 可以让它返回 application/json，而 xbox 可以获得 application/xml 的返回，各取所需
* PostSerialization--一般而言，一些 API 系统内部的统计数据可以在此收集（所有的出错处理路径和正常路径都在这里交汇）

## 需要理解的概念：
* json web token


## 需要注意的问题：
* 请求数据验证
* 数据完整性验证--412
* 访问控制
* authentication--jwt来解决
* authorization--另一种ACL

## 学习到的知识点：
* API 设计服务RFC   
* 单用户客户端与任何服务器或代理之间的连接数不应该超过2个。
* 代码和文档不要分离
* 整个 API 系统需要一个成体系的监控机制
* API 的测试系统
* accept-version的控制
* 一个合格的REST API需要根据Accept头来灵活返回合适的数据
* 删除资源时，要对Etag进行验证，看看是否一致，如果不一致，则没有删除权限
* 好的架构应该尽可能把 API 执行路径上的各种处理都抽象出来，放到公共路径（或者叫中间件，middleware）之中，为 API 的撰写者扫清各种障碍，同时能够促使 API 更加标准化
