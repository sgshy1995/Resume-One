!function () {

    var view = document.querySelector('section.message')

    var model = {
        //初始化AV
        initAV: function () {
            AV.init({
                appId: "Jj1MHYsjJVBe47PTdIokiLK4-gzGzoHsz",
                appKey: "UVFNUjR4OmuQhlIzamTLSMLG",
                serverURLs: "https://jj1mhysj.lc-cn-n1-shared.com"
            })
        },
        //获取数据
        fetch: function () {
            var query = new AV.Query('Message')
            return query.find() //Promise Object
        },
        //创建保存数据
        save: function (name, content) {
            var Message = AV.Object.extend('Message')
            var message = new Message()
            message.set({
                'name': name,
                'content': content
            })
            /* if (name === '' || content === '') {
                alert('您的姓名或者内容不可为空哦！')
                return undefined
            } else if (name.substr(0, 1) == ' ' || content.substr(0, 1) == ' ') {
                alert('您的姓名或者内容不可以空格开头哦！')
                return undefined
            }
            else {
                return message.save()
            } */
            return message.save()
        }
    }

    var controller = {
        view: null,
        myMessageList: null,
        form: null,
        model: null,
        init: function (view,model) {
            this.view = view
            this.model = model

            this.myMessageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.initAV()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch()
                .then((message) => { //promise
                    //遍历数组
                    let array = message.map((item) => item.attributes)
                    //将留言信息创建为li插入ol中
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        let span = document.createElement('span')
                        span.innerText = '（游客）'
                        li.innerText = `${item.name} 说： ${item.content} `
                        li.append(span)
                        this.myMessageList.append(li)
                    })
                }, function (error) {
                    console.log('留言失败，请稍候再试')
                })
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let name = myForm.querySelector('input[name=name]').value
            let content = myForm.querySelector('input[name=content]').value
            if (name === '' || content === '') {
                alert('您的昵称或内容不可为空哦！')               
            } else if (name.substr(0, 1) === ' ' || content.substr(0, 1) === ' ') {
                alert('您的昵称或内容不可以空格开头哦！')
            }
            else {
                this.model.save(name, content)
                .then(function (message) {
                    alert('留言成功，等待管理员审核哦')
                    let li = document.createElement('li')
                    let span = document.createElement('span')
                    span.innerText = '（游客）'
                    li.innerText = `${message.attributes.name} 说： ${message.attributes.content} `
                    let myMessageList = document.querySelector('#messageList')
                    li.append(span)
                    myMessageList.append(li)
                    myForm.querySelector('input[name=name]').value = ''
                    myForm.querySelector('input[name=content]').value = ''
                })
            }
        }
    }

    controller.init(view,model)

}.call()





