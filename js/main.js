/*var newscript = document.createElement('script')
newscript.setAttribute('type','text/javascript')
newscript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.3.1/Tween.min.js')
var head = document.getElementsByTagName('head')[0]
head.appendChild(newscript)*/

setTimeout(
    function () {
        guide.classList.remove("active");
    }, 2000
)
let liTags = document.querySelectorAll('nav.menu > ul > li')  //console.log(aTags) 打印出一个数组
for (let i = 0; i < liTags.length; i++) {  //遍历数组
    liTags[i].onmouseenter = function (sgs) {
        sgs.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (sgs) {
        sgs.currentTarget.classList.remove('active')
    }
}

let aTags = document.querySelectorAll('nav.menu > ul > li > a') //返回数组
requestAnimationFrame(animate); //向浏览器请求动画帧率
for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (sgs) {
        sgs.preventDefault() //阻止默认动作
        let a = sgs.currentTarget
        let href = a.getAttribute('href') //'#about'  , let href1 = a.href 这样href1是浏览器处理后的地址
        let element = document.querySelector(href) //只获取第一个元素，否则要使用element[0]
        let top = element.offsetTop
        let currentTop = window.scrollY //当前高度
        let targetTop = top - 80 //目标高度
        let distance = targetTop - currentTop //可以为负值 但是下面的t不可以为负值 abs
        // Setup the animation loop.
        var coords = { y: currentTop }; // Start at (0, 0)
        var t = Math.abs((distance / 100) * 500) //距离是100px的几倍，就几个500ms t可能为负值
        if (t > 500) { //最大不超过500ms
            t = 500
        }
        var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
            .to({ y: targetTop }, t) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
            .onUpdate(
                function () {
                    window.scrollTo(0, coords.y)
                })
            .start() // Start the tween immediately.
        /*let n = 50 //一共动多少次
        let unitTime = 400 / n //多久动一次
        let currentTop = window.scrollY //当前高度
        let targetTop = top - 80 //目标高度
        let unitDistance = (targetTop - currentTop) / n //每次移动距离
        let i = 0
        let id = setInterval(
            function () {
                if (i === n) { //当移动次数为n是停止闹钟
                    window.clearInterval(id)
                    return
                }
                i++
                window.scrollTo(0, currentTop + unitDistance * i) //移动到第n个节点处 targetTop + unitD
            }, unitTime
        )*/
    }
}

portfolioAll.onclick = function () {
    barInner.className = 'stateOne'
}
portfolioFrame.onclick = function () {
    barInner.className = 'stateTwo'
}
portfolioNative.onclick = function () {
    barInner.className = 'stateThree'
}

//便利所有标记标签默认样式offset
let specTags = document.querySelectorAll('[data-high]')
for (let i = 0; i < specTags.length; i++) { 
    specTags[i].classList.add('offset')
}
setTimeout(function () { //usercard默认2.2秒后上浮
    specTags[0].classList.remove('offset')
}, 2200)

window.onscroll = function () {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    }
    else {
        topNavBar.classList.remove('sticky')
    }
    findClosest()
}

function findClosest() { //寻找最近的元素来增加类
    let specTags = document.querySelectorAll('[data-high]')
    let minIndex = 0
    for (let i = 0; i < specTags.length; i++) { //先认定[0]是最小 也必定是最小，即usercard先高亮
        if (Math.abs(specTags[i].offsetTop - window.scrollY) < Math.abs(specTags[minIndex].offsetTop - window.scrollY))
        //改变并获取当前最小的项为[i]
        { minIndex = i }
    }
    specTags[minIndex].classList.remove('offset')
    let id = specTags[minIndex].id
    let a = document.querySelector('a[href="#' + id + '"]')
    let li = a.parentNode
    let brothers = li.parentNode.children
    for (let i = 0; i < brothers.length; i++) {
        brothers[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
}
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
