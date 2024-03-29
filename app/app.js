// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    

var SpriteWithPhysics = function(state, texture, x, y) {
  Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
  this.update = function() {
    Kiwi.GameObjects.Sprite.prototype.update.call(this);
    this.physics.update();
  }
}
Kiwi.extend(SpriteWithPhysics, Kiwi.GameObjects.Sprite);
var game = new Kiwi.Game();
var state = new Kiwi.State('state');
state.preload = function(){
  Kiwi.State.prototype.preload.call(this);
  this.addSpriteSheet('angry-imp', 'assets/character.png', 64, 64);
  this.addSpriteSheet('hippie-imp', 'assets/opponent.png', 64, 64);
  this.addAudio('background-music', 'assets/background.ogg');
  this.addAudio('slice', 'assets/knifeSlice.ogg');
  this.addAudio('death', 'assets/death.wav');
}
state.create = function(){
  Kiwi.State.prototype.create.call(this);
  this.opponent = new SpriteWithPhysics(this, this.textures['hippie-imp'], 640, 480);
  this.opponent.animation.add('idle', [28], 0.1, false);
  this.opponent.animation.add('die', [28, 29, 30, 31, 32, 33, 34, 6], 0.1, false);
  this.opponent.animation.play('idle');
  this.opponent.deathSqueek = new Kiwi.Sound.Audio(this.game, 'death', 0.2, false);
  this.addChild(this.opponent);
  this.character = new SpriteWithPhysics(this, this.textures['angry-imp'], 60, 40);
  this.character.animation.add('idle-left', [4], 0.1, false);
  this.character.animation.add('idle-right', [12], 0.1, false);
  this.character.animation.add('idle-up', [0], 0.1, false);
  this.character.animation.add('idle-down', [8], 0.1, false);
  this.character.animation.add('move-left', [4, 5, 6, 7], 0.1, true);
  this.character.animation.add('move-right', [12, 13, 14, 15], 0.1, true);
  this.character.animation.add('move-up', [0, 1, 2, 3], 0.1, true);
  this.character.animation.add('move-down', [8, 9, 10, 11], 0.1, true);
  this.character.animation.add('attack-up', [16, 17, 18, 19], 0.1, false);
  this.character.animation.add('attack-left', [20, 21, 22, 23], 0.1, false);
  this.character.animation.add('attack-down', [24, 25, 26, 27], 0.1, false);
  this.character.animation.add('attack-right', [28, 29, 30, 31], 0.1, false);
  this.character.facing = 'right';
  this.character.animation.play('idle-right');
  this.character.forkChop = new Kiwi.Sound.Audio(this.game, 'slice', 0.2, false);
  this.addChild(this.character);
  this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.LEFT);
  this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT);
  this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.UP);
  this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.DOWN);
  this.space = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR);
  this.backgroundMusic = new Kiwi.Sound.Audio(this.game, 'background-music', 0.5, true);
  this.backgroundMusic.play();
}
state.update = function(){
  Kiwi.State.prototype.update.call(this);
  if (this.space.isDown) {
    this.character.animation.play('attack-' + this.character.facing);
    this.character.forkChop.play();
    if (this.character.physics.overlaps(this.opponent)) {
      this.opponent.deathSqueek.play();
      this.opponent.animation.play('die');
    }
  }
  else if (this.downKey.isDown || this.upKey.isDown || this.leftKey.isDown || this.rightKey.isDown) {
    if (this.downKey.isDown) {
      this.character.facing = 'down';
      if (this.character.transform.y < 536) this.character.transform.y += 3;
    }
    else if (this.upKey.isDown) {
      this.character.facing = 'up';
      if (this.character.transform.y > 3) this.character.transform.y -= 3;
    }
    else if (this.leftKey.isDown) {
      this.character.facing = 'left';
      if (this.character.transform.x > 3) this.character.transform.x -= 3;
    }
    else if (this.rightKey.isDown) {
      this.character.facing = 'right';
      if (this.character.transform.x < 736) this.character.transform.x += 3;
    }
    if (this.character.animation.currentAnimation.name != 'move-' + this.character.facing)
      this.character.animation.play('move-' + this.character.facing);
  }
  else if (this.character.animation.currentAnimation.name.indexOf('attack') != 0) {
    this.character.animation.play('idle' + this.character.facing);
  }
};
game.states.addState(state, true);


});
