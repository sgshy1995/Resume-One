setTimeout(
    function () {
        guide.classList.remove("active");
    }, 1500
)

portfolioAll.onclick = function () {
    barInner.className = 'stateOne'
}
portfolioFrame.onclick = function () {
    barInner.className = 'stateTwo'
}
portfolioNative.onclick = function () {
    barInner.className = 'stateThree'
}
