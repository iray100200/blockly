Crafty.init(320, 320, document.getElementById('canvasContext'))

var start = {
  x: 3,
  y: 5
}

var end = {
  x: 5,
  y: 7
}

function generateWorld() {
  const map = Array.apply(this, { length: 10 }).map(o => {
    return Array.apply(this, { length: 10 }).map(o => {
      return Math.ceil(Math.random() * 1.25)
    })
  })

  map[5][5] = 0
  map[5][6] = 0
  map[5][7] = 0
  map[4][5] = 0
  map[3][5] = 0

  Crafty.sprite(32, 32, 'imgs/map3.png', { ground: [6, 2], obstacle1: [6, 13], obstacle2: [7, 13] })
  window.hreo = Crafty.sprite(100, 100, 'imgs/hreo.png', { hero: [0, 2] })
  Crafty.sprite(32, 32, 'imgs/map1.png', { gate: [13, 6] })

  for (var i = 0, l = map.length; i < l; i++) {
    for (var j = 0, m = map[i].length; j < m; j++) {
      if (map[i][j] === 0) Crafty.e("2D, Canvas, ground").attr({ x: i * 32, y: j * 32, w: 32, h: 32 })
      if (map[i][j] === 1) Crafty.e("2D, Canvas, wall, solid, obstacle1").attr({ x: i * 32, y: j * 32, w: 32, h: 32 })
      if (map[i][j] === 2) Crafty.e("2D, Canvas, wall, solid, obstacle2").attr({ x: i * 32, y: j * 32, w: 32, h: 32 })
    }
  }

  Crafty.e("2D, Canvas, gate").attr({ x: end.x * 32 + 4, y: end.y * 32 + 4, w: 24, h: 24 })
}

Crafty.scene("loading", function () {
  Crafty.load({
    images: ["imgs/map3.png", "imgs/hreo.png"]
  }, function () {
    Crafty.scene("main");
  });
  Crafty.background("#ffe");
});

Crafty.scene("loading");

window.error = false
window.isEnd = false

Crafty.scene("main", function () {
  generateWorld()
  Crafty.c('Hero', {
    init() {
      this.requires("SpriteAnimation, Collision")
        .reel("walk_left", 500, 0, 1, 3)
        .reel("walk_right", 500, 0, 2, 3)
        .reel("walk_up", 500, 0, 3, 3)
        .reel("walk_down", 500, 0, 0, 3)
        .onHit("wall", function (from) {
          if (!window.error) {
            this.pauseAnimation().resetAnimation()
            this.cancelTween('y').cancelTween('x')
            this.attr(from[from.length - 1].obj.__coord)
            document.getElementById('error').innerHTML += '-> 障碍物'
            window.error = true
          }
        })
        .onHit("gate", function (from) {
          if (!window.isEnd) {
            document.getElementById('error').innerHTML += '-> 发现传送门'
            window.isEnd = true
          }
        })
      return this
    }
  })
  player = Crafty.e("2D, Canvas, hero, Hero, SpriteAnimation, Tween, Sprite")
    .crop(15, 35, 70, 70)
    .attr({ x: start.x * 32, y: start.y * 32, w: 32, h: 32 })
})

function reset() {
  player
    .resetAnimation()
    .attr({ x: start.x * 32, y: start.y * 32 })
    .resumeTweens()
}

function move(direction, steps) {
  let endPosition = {}
  switch (direction) {
    case 'right':
      endPosition.x = player.x + steps * 32
      break;
    case 'left':
      endPosition.x = player.x - steps * 32
      break;
    case 'up':
      endPosition.y = player.y - steps * 32
      break;
    case 'down':
      endPosition.y = player.y + steps * 32
      break;
  }
  return new Promise((resolve) => {
    player.animate('walk_' + direction, 200)
      .tween(endPosition, 1000 * steps)
      .bind("TweenEnd", function (e) {
        this.pauseAnimation()
        resolve()
      })
  })
}

window.move = move
window.reset = reset