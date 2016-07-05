rivets.configure({
    handler: function (target, event, binding){
        this.call(binding.model, target, event, binding);
    }
});

rivets.formatters.propertyList = function(obj){
    return(
        function(){
            var properties=[];
            for(var key in obj){
                properties.push({key:key,value:obj[key]});
            }
            return properties;
        }
    )();
};

// Spell Management And Pool
var SpellClicker = SpellClicker || {};
SpellClicker.game = {};
SpellClicker.tickers = {};

SpellClicker.Spell = function(name, damage, image, multiplier){
    this.name = name;
    this.damage = damage;
    this.image = "/clicker-game/assets/img/spell-icons/" + image;
    this.multiplier = ( typeof multiplier === 'undefined') ? this.multiplier = 0.25 : multiplier;
    this.cast = function(){
        SpellClicker.game.Enemies[0].defend(SpellClicker.Roll(this));

        var rem_index = SpellClicker.game.spellQueue.indexOf(this);
        SpellClicker.game.spellQueue.splice(rem_index, 1);
    };
};

SpellClicker.game.spellQueue = [];

SpellClicker.Spells = {
    'lightning1': new SpellClicker.Spell('Lightning Bolt', 10, "lighting-blue-1.png"),
    'frost1': new SpellClicker.Spell('Ice Lance', 5, "ice-blue-1.png"),
    'fire1': new SpellClicker.Spell('Fire Bolt', 15, "fireball-red-1.png")
};

// Player
SpellClicker.Player = function(name){
    this.name = name;
    this.critical = 0.25;
    this.accuracy = 0.8;
    this.hp = 100;
    this.exp = 0;
};

SpellClicker.game.Player = new SpellClicker.Player("Player 1");

// Monsters
SpellClicker.game.Enemies = [];
SpellClicker.Enemy = function(name, hitpoints, damage, exp, image){
    this.name = name;
    this.hitpoints = hitpoints;
    this.damage = damage;
    this.exp = exp;
    this.image = "/clicker-game/assets/img/enemies/" + image;
    this.defend = function(damageRoll){
        this.hitpoints = this.hitpoints - damageRoll;

        if(this.hitpoints <= 0){
            var rem_index = SpellClicker.game.Enemies.indexOf(this);
            SpellClicker.game.Enemies.splice(rem_index, 1);
            SpellClicker.game.Player.exp += this.exp;
        }

        if(SpellClicker.game.Enemies.length <= 0 ){
            var newEnemy = Object.create(SpellClicker.randomPick(SpellClicker.Monsters));
            SpellClicker.game.Enemies.push(newEnemy);
        }
    };
};

SpellClicker.Monsters = {
    'critter': new SpellClicker.Enemy('Skittering Teeth', 15, 5, 10, "skeleton-critter-1-blue.png"),
    'critter-elite': new SpellClicker.Enemy('Rabid Plaguehound', 20, 10, 20, "skeleton-critter-1-green.png"),
    'skeleton': new SpellClicker.Enemy('Walking Bones', 30, 10, 25, "skeleton-melee-1-blue.png"),
    'skeleton-elite': new SpellClicker.Enemy('Angry Dead', 60, 30, 75, "skeleton-melee-1-green.png")
};



// Damage Roll
SpellClicker.Roll = function(spell){
    var spellHits = Math.random() > (1 - SpellClicker.game.Player.accuracy),
        spellCrits = Math.random() > (1- SpellClicker.game.Player.critical),
        damageDone = 0;

    if ( spellHits ) {
        damageDone = spell.damage;
        if ( spellCrits ) {
            damageDone = damageDone * 1.5;
        }
    }

    return Math.round(damageDone);
};

// Game Loops
SpellClicker.tick = function(){
    SpellClicker.tickers.Monsters();
    SpellClicker.tickers.Spells();
};

SpellClicker.tickers.Spells = function(){
    if(SpellClicker.game.spellQueue.length >= 6 ){
        SpellClicker.game.spellQueue[0].cast();
    }
    
    var newSpell = Object.create(SpellClicker.randomPick(SpellClicker.Spells));
    SpellClicker.game.spellQueue.push(newSpell);
};

SpellClicker.tickers.Monsters = function(){
    if(SpellClicker.game.Enemies.length <= 0 ){
        var newEnemy = Object.create(SpellClicker.randomPick(SpellClicker.Monsters));
        SpellClicker.game.Enemies.push(newEnemy);
    }
};

// DON'T FUCK WITH THE RNGESUS
SpellClicker.randomPick = function(obj){
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

SpellClicker.loop = setInterval(SpellClicker.tick, 1000);

$(document).ready( function() {
    rivets.bind($('#game'), SpellClicker.game);
});
