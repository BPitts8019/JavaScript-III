/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/**
 * Chooses a random number between 1 and the number of sides chosen.
 * @param {number} sides 
 */
const rollD = (sides) => {
	return Math.floor(Math.random() * sides ) + 1;
};

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
const GameObject = function ({name, nickname, dimensions}) {
   this.createdAt = new Date();
   this.name = name;
   this.nickname = nickname || "";
   this.dimensions = dimensions;
}
GameObject.prototype.destroy = function () {
   return `${this.name} was removed from the game.`;
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
const CharacterStats = function ({healthPoints, ...rest}) {
   this.healthPoints = healthPoints;
   GameObject.call(this, rest);
}
CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function (damage) {
   return `${this.name} took ${damage} damage.`;
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
const Humanoid = function ({team, weapons, language, ...rest}) {
   this.team = team;
   this.weapons = weapons;
   this.language = language;
   CharacterStats.call(this, rest);
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function () {
   return `${this.name} offers a greeting in ${this.language}.`;
};
Humanoid.prototype.attack = function (target) {
   const BASE_TO_HIT = 8;

   //which weapon do I use?
   //random choice for now
   // const weapon = this.weapons[rollD(this.weapons.length) - 1];
   const weapon = this.weapons[0];

   //did we hit the target?
   const hitTarget = rollD(20) >= BASE_TO_HIT + weapon.toHitMod;
   //how much damage is caused?
   const damage = (hitTarget)? Math.floor(Math.random(weapon.maxDmg - weapon.minDmg + 1) + weapon.minDmg) : 0;
   if (damage > 0) {
      console.log(`${this.nickname} hits ${target.name} with his ${weapon.type}.`);
   } else {
      console.log(`${this.nickname} misses ${target.name} with his ${weapon.type}.`);
   }

   //update target health
   target.healthPoints -= damage;
   console.log(target.takeDamage(damage));
   if (target.healthPoints <= 0) {
      console.log(target.destroy());
   }
};
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


//   const mage = new Humanoid({
//    //  createdAt: new Date(),
//     dimensions: {
//       length: 2,
//       width: 1,
//       height: 1,
//     },
//     healthPoints: 5,
//     name: 'Bruce',
//     team: 'Mage Guild',
//     weapons: [
//       'Staff of Shamalama',
//     ],
//     language: 'Common Tongue',
//   });

//   const swordsman = new Humanoid({
//    //  createdAt: new Date(),
//     dimensions: {
//       length: 2,
//       width: 2,
//       height: 2,
//     },
//     healthPoints: 15,
//     name: 'Sir Mustachio',
//     team: 'The Round Table',
//     weapons: [
//       'Giant Sword',
//       'Shield',
//     ],
//     language: 'Common Tongue',
//   });

//   const archer = new Humanoid({
//    //  createdAt: new Date(),
//     dimensions: {
//       length: 1,
//       width: 2,
//       height: 4,
//     },
//     healthPoints: 10,
//     name: 'Lilith',
//     team: 'Forest Kingdom',
//     weapons: [
//       'Bow',
//       'Dagger',
//     ],
//     language: 'Elvish',
//   });

//   console.log(mage.createdAt); // Today's date
//   console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
//   console.log(swordsman.healthPoints); // 15
//   console.log(mage.name); // Bruce
//   console.log(swordsman.team); // The Round Table
//   console.log(mage.weapons); // Staff of Shamalama
//   console.log(archer.language); // Elvish
//   console.log(archer.greet()); // Lilith offers a greeting in Elvish.
//   console.log(mage.takeDamage()); // Bruce took damage.
//   console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!
  
  // * Weapons will contain three values: type, minDmg, maxDmg

const Villain = function (props) {
   Humanoid.call(this, props);
};
Villain.prototype = Object.create(Humanoid.prototype);
Villain.prototype.berserk = function (target) {
   console.log(`${this.nickname} is berserking. They get two attacks!`);
   this.attack(target);
   this.attack(target);
};

const Hero = function (props) {
   this.maxHealth = props.healthPoints;
   Humanoid.call(this, props);
};
Hero.prototype = Object.create(Humanoid.prototype);
Hero.prototype.heal = function (maxHealth) {
   this.healthPoints += 5;
   if (this.healthPoints > maxHealth) {
      this.healthPoints = maxHealth;
   }

   console.log(`${this.nickname} heals for 5 points.`);
};

//---- Create Players ----//
const villain = new Villain({
   dimensions: {
      length: 2,
      width: 3,
      height: 4,
   },
   healthPoints: 25,
   name: 'Grommash Hellscream',
   nickname: "Grom",
   team: 'Iron Horde',
   weapons: [
      { type: "Battleaxe", toHitMod: 1, minDmg: 5, maxDmg: 9 },
      { type: "Mace", toHitMod: 0, minDmg: 3, maxDmg: 5 },
      { type: "Dagger", toHitMod: -2, minDmg: 1, maxDmg: 2 }
   ],
   language: 'Orcish',
});

const hero = new Hero({
   dimensions: {
      length: 2,
      width: 2,
      height: 3,
   },
   healthPoints: 15,
   name: 'Arthas Menethil',
   nickname: "Arthas",
   team: 'Alliance',
   weapons: [
      { type: "Lightbringer", toHit: 0, minDmg: 5, maxDmg: 7 },
      { type: "shortsword", toHit: -1, minDmg: 3, maxDmg: 5 }
   ],
   language: 'Common',
});

// for (let i = 0; i < 20; i++) {
//    if (rollD(20) >= Math.round(20/3)) {
//       console.log(`** Berserk **`);
//    } else {
//       console.log(`Attack`);
//    }
// }

// //-- STATS TEST --//
// (function () {
//    const stats = {
//       hit: 0,
//       miss: 0
//    };
//    const numTests = 10000;
//    const toHit = 17;
//    let dieRoll = -1;

//    for (let i=0; i < numTests; i++) {
//       // dieRoll = rollD(20);
//       // if (!stats[dieRoll]) {
//       //    stats[dieRoll] = 1;
//       // } else {
//       //    stats[dieRoll]++;
//       // }
//       dieRoll = rollD(20);
//       if (dieRoll >= toHit) {
//          stats.hit++;
//       } else {
//          stats.miss++;
//       }
//    }

//     console.log(JSON.stringify(stats, null, 3));
//     console.log(`Hit percentage: ${(stats.hit / numTests).toFixed(2) * 100}%`);
// })();

//---- GAME LOOP ----//
do {
   //villain attacks first
      //berserk or attack?
   console.log(`---------------------`);
   if (rollD(20) >= 18) {
      villain.berserk(hero);
   } else {
      villain.attack(hero);
   }

   //hero attacks second
      //heal or attack
   console.log(`---------------------`);
   if (rollD(20) >= 17) {
      hero.heal();
   } else {
      hero.attack(villain);
   }
   console.log("\n\n");
} while (villain.healthPoints > 0 && hero.healthPoints > 0);

if (villain.healthPoints > 0) {
   console.log(`${villain.name} Has killed ${hero.name}!`);
} else if (hero.healthPoints > 0) {
   console.log(`${hero.name} Has killed ${villain.name}!`);
} else {
   console.log(`Both combatants have killed each other!`);
}
console.log(`GAME OVER!!`);