var SpellClicker = SpellClicker || {};

SpellClciker.Spell = function(){
    this.name,
    this.damage
}

SpellClicker.SpellPool = {
'lightningBolt': new SpellClick.Spell('Lightning Bolt', 10)
};

SpellClicker.game.spellQueue = [
    Object.clone(SpellClicker.SpellPool.lightningBolt)
];

