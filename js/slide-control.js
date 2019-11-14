let $buttons = $('#buttons>li')
let $slides = $('#slides')
let $images = $slides.children('div')
let $bar = $('#barInner')
let $slideWrapper = $('#slideWrapper')
console.log($bar)
let current = 0 //初始化当前图片对应的状态值

makeFakeSlides() //创建假的滑动层
defaultSlide() //将所有图片初始化左移一个身位，且隐藏这个动画
bindEvents() //点击下部按钮事件监听
nextAndPrevious() //选择上一张下一章的按钮事件监听
makeTimer() //自动播放




//------------------------Tools Functions_________________________

function makeFakeSlides() {

    let $firstCopy = $images.eq(0).clone(true) //克隆第一张
    let $lastCopy = $images.eq(2).clone(true) //克隆最后一张
    $slides.append($firstCopy) //第一张放在最后
    $slides.prepend($lastCopy) //最后一张放在最前

}

function defaultSlide() {

    $slides.hide().offset()
    $slides.css({ transform: 'translateX(-600px)' }).show()

}

function bindEvents() {

    $('#buttons').on('click', 'li', (e) => {
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToIndex(index) //去当前点击的播放图片
    })

}

function goToIndex(index) {

    if (index > $buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }

    if (current === ($buttons.length - 1) && index === 0) { //从最后一张到第一张
        $slides.css({ transform: `translateX(${-($buttons.length + 1) * 930}px )` }) //移动到克隆的第一张(最后一张的后面)
            .one('transitionend', () => { //立刻移动至第一张(即第二张)，并且隐藏这个动画
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 930}px)` }).show()
            })
    }

    else if (current === 0 && index === ($buttons.length - 1)) { //从第一张到最后一张
        $slides.css({ transform: `translateX(0px)` }) //移动到克隆的最后一张(第一张的前面)
            .one('transitionend', () => { //立刻移动至最后一张(即第n-1张)，n=$buttons.length并且隐藏这个动画
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 930}px)` }).show()
            })
    }

    else { //正常顺序点击
        $slides.css({ transform: `translateX(${-(index + 1) * 930}px)` })
    }

    current = index //现在的值就等于点击的(要去的)值
    $buttons.eq(index).addClass('active').siblings().removeClass('active')
    $bar.removeClass().addClass('state'+`${index}`)
}

function nextAndPrevious() {

    $('#left').on('click', () => {
        goToIndex(current - 1)
    })
    $('#right').on('click', () => {
        goToIndex(current + 1)
    })

}

function makeTimer() {

    let timer = setInterval(() => {
        goToIndex(current + 1)
    }, 2500)

    $slideWrapper.on('mouseenter', () => {
        window.clearInterval(timer)
    }).on('mouseleave', () => {
        timer = setInterval(() => {
            goToIndex(current + 1)
        }, 2500)
    })

}
