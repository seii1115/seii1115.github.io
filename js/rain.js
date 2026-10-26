(function () {
  'use strict'

  if (document.getElementById('rain-canvas')) return

  var canvas = document.createElement('canvas')
  canvas.id = 'rain-canvas'
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.zIndex = '-1'
  canvas.style.pointerEvents = 'none'
  document.body.appendChild(canvas)

  var ctx = canvas.getContext('2d')
  var width = 0
  var height = 0
  var drops = []

  // 简约雨丝：细线、轻微倾斜、低透明度、速度不一
  function resize () {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    var count = Math.min(160, Math.floor(width / 9))
    drops = []
    for (var i = 0; i < count; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        len: 8 + Math.random() * 14,
        speed: 3 + Math.random() * 5,
        opacity: 0.08 + Math.random() * 0.22,
        drift: 0.3 + Math.random() * 0.7
      })
    }
  }

  function tick () {
    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 1
    ctx.lineCap = 'round'

    for (var j = 0; j < drops.length; j++) {
      var d = drops[j]
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(143, 166, 192, ' + d.opacity + ')'
      ctx.moveTo(d.x, d.y)
      ctx.lineTo(d.x - d.drift * 2, d.y + d.len)
      ctx.stroke()

      d.y += d.speed
      d.x -= d.drift

      if (d.y > height + d.len) {
        d.y = -d.len - Math.random() * 40
        d.x = Math.random() * (width + 40) - 20
      }
      if (d.x < -30) {
        d.x = width + Math.random() * 30
      }
    }

    window.requestAnimationFrame(tick)
  }

  resize()
  window.addEventListener('resize', resize)
  window.requestAnimationFrame(tick)
})()
