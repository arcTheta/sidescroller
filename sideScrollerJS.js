var loc = 0;

var keys = {
    up    : 38,
    down  : 40,
    left  : 37,
    right : 39,
    space : 32,
    w : 87,
    a : 65,
    s : 83,
    d : 68,
    q : 81,
    r : 82,
    e : 69
};

document.addEventListener('keydown', keydown_handler, false);
var img = document.getElementById('bg');
var sprite = document.getElementById("char")
function keydown_handler(event) {
    if (event.which == keys.right) {
        if (loc !== 80000) {
            move(img,-5,0);
            loc = loc + 5;
        }
    }
    if (event.which == keys.left) {
        if (loc !== 0) {
        move(img,5,0);
        loc = loc - 5;
        }
         move(sprite,0,10);
    }
    if (event.which == keys.up) {
        move(sprite,0,10);
    }
}

 function move(char, x , y) {
    var cs = window.getComputedStyle(char);
    left = parseFloat(cs.left) || 0;
    top = parseFloat(cs.top) || 0;
    char.style.left = left + x + 'px';
    char.style.top = top + y + 'px';
}

console.log("Lets Attempt to edit the values of an object and attempt a battle. Try help() if you are stuck");

var weapons = [];

function enemy(name,lv,exp,hp,type,status,weapon) {
    this.name = name;
    this.lvl = lv;
    this.HP = hp;
    this.exp = exp;
    this.type = type;
    this.statusEffect = status;
    this.weapon = weapon;
    this.cash = 0
    this.xp = 0
}

function weapon(name,damage,defense,range,weight) {
    this.name = name;
    this.dmg = damage;
    this.def = defense;
    this.rng = range;
    this.weight = weight;
    weapons.push(this);
}

var items = [];
var inventoryArray =  [] ;

function item(HPChange,type,NumOfUses,name,price) {
    this.HPChange = HPChange;
    this.type = type;
    this.uses = NumOfUses;
    this.name = name;
    this.price = price;
    this.use = function () {
        if (this.type == "Potion") {
            if (this.uses !== 0) {
                if ((player.lvl.maxHP - player.HP < this.HPChange ) && (player.lvl.maxHP !== player.HP)) {
                    player.HP = player.lvl.maxHP;
                    this.uses --;
                    console.log("Used A " + this.name + ". You now have Full HP. You have " + this.uses + " of these remaining");
                    
                }
                else if (player.lvl.maxHP - player.HP > this.HPChange) {
                    player.HP = player.HP + this.HPChange;
                    this.uses --;
                    console.log("Used A " + this.name + ". You have " + this.uses + " of these remaining");
                    
                }
                else if (player.HP == player.lvl.maxHP) {
                    console.log("It has no effect. You put the " + this.name + " away. You still have " + this.uses + " Left.");
                }
                
                console.log("Your HP: " + player.HP + " HP.");
            }
            else {console.log("Out Of " + this.name + "s." )}
        if (this.uses === 0) {
            console.log("That was your Last potion! Buy More!");
            inventoryArray.splice(inventoryArray.indexOf(this),1,this.name + " X " + 0);
        }
            
        }
    };
    this.buy = function (p) {
        if (player.cash < (15*p)) {console.log("Not Enough Money")}
        else {player.cash = player.cash-(15*p); this.uses = parseInt(this.uses) + parseInt(p)}
    };
    this.sell = function(p) {
        if (this.uses === 0) {console.log("You Don't Have Any Left!")}
        if (this.uses !== 0) {this.uses --; player.cash += ((this.price)/5)*4; console.log("Sold a " + this.name + " for: " + ((this.price)/5)*4 + ". You have " + this.uses + " remaining. You have $" + player.cash + " to spend.");}
    };
    items.push(this.name + " X " + this.uses);
}

var maxLevel = 300;

var levels = [];

function level(i) {
    this.levelID = i + 1;
    this.maxHP = i*15;
    this.attackPower = i * 10;
    this.defenseValue = i * 7;
    this.mana = i*5;
    this.xpNeeded = i * 50;
}

for (var x = 1; x < maxLevel+1; x++) {
    levels.push(new level(x));
}

//==============================================================================================================
var names = ["Harry","Oliver","Jack","Rick","Bill","Mary","Lucy","Cindy","Deep","Isaac"];

var nameToPick = Math.floor((Math.random()*10)+1);
//==============================================================================================================

var knife = new weapon("Knife", 5, 2, 2, 2);

var sword = new weapon("Short Sword",9,2,5,3);

var swordOfDerp = new weapon("The Sword Of HerpDerp ",10,5,5,5);

var rapier = new weapon("Rapier",15,7,7,7);

//==============================================================================================================
var Enemy = new enemy(names[nameToPick-1],levels[0],0,50,"minion","none",knife);

var player = new enemy("Anon",levels[4],50,45,"player","none",swordOfDerp);
//==============================================================================================================
var potion = new item(25,"Potion","1","Potion", 15); 
var superpotion = new item(50,"Potion","1","Super Potion", 25); 
inventoryArray.push(potion);
inventoryArray.push(superpotion)
//==============================================================================================================
window.alert("Open The Console, Hit CTRL + SHIFT + J");

console.log("Next Battle: " + player.name + " VS " + Enemy.name + "!");

console.log(player.name + " is using the: " + player.weapon.name);

console.log(Enemy.name + " is using the: " + Enemy.weapon.name);

console.log("Attack using the attack() command. You have four types of attack: Horizontal - attack('h'), Vertical - atack('v'), Stab - attack('s'), and Finally, a Jumping attack - attack('j)");

console.log("But First, If you want, Introduce Yourself with the intro command. Example intro('Bob')");

//==============================================================================================================



//==============================================================================================================

var damage = 0;
var retaliationChance = 0;

var pastAttacks = [];

function attack( m ) {
    
    retaliationChance = Math.floor((Math.random()*10)+1);
    
    console.log("Your HP: " + player.HP + ". " + Enemy.name + "'s HP: " + Enemy.HP);
    //==============================================================================================================
    if (m === "h") {
        console.log("You Sliced Horizontaly,");
        if (retaliationChance > 2) {
            damage = player.lvl; 
            console.log("You Dealt: " + damage + " Points of Damage"); 
            Enemy.HP = Enemy.HP - damage;
        }
        else {
            damage = Enemy.weapon.dmg;
            console.log("While Your Side was Exposed, "  + Enemy.name + " attacked you. Dealing " + damage + " points of damage using their " + Enemy.weapon.name);
            player.HP = player.HP - damage;
            
        }
    }
    //==============================================================================================================
    if (m === "v") {
        console.log("You Sliced Vertically,"); 
        damage = player.weapon.dmg; 
        console.log("You Dealt: " + damage + " Points of Damage"); 
        Enemy.HP = Enemy.HP - damage;
    }
    //==============================================================================================================
    if (m === "j") {
        console.log("You Jumped high into the air, somersaulting on your way down, with the " + player.weapon.name + " Spinning Menacingly."); 
        if (retaliationChance < 4) {
            damage = player.lvl + player.weapon.dmg; 
            Enemy.HP = Enemy.HP - damage;
            console.log("You Dealt: " + damage + " Points of Damage"); 
        }
        else {
            damage = 0;
            Enemy.HP = Enemy.HP - damage;
            console.log("On The Way Down, " + Enemy.name + " Slashed At You With " + Enemy.weapon.name + " Dealing " + Enemy.weapon.dmg + " points of Damage");
            damage = Enemy.weapon.dmg;
            player.HP = player.HP - damage;
            
        }
        
        
    }
    //==============================================================================================================
    if (m === "s") {
        console.log("You Stabbed at " + Enemy.name ); 
        damage = player.def; 
        console.log("You Dealt: " + damage + " Points of Damage"); 
        Enemy.HP = Enemy.HP - damage;
    }
    
    console.log("Your HP: " + player.HP + ". " + Enemy.name + "'s HP: " + Enemy.HP);
    
    if (player.HP < 16) {console.log("You are Gravely Wounded. Use a potion.")}
    if (player.HP < 1 ) {console.log("Your Wounds Overcame you. You Fall To the Ground. Dead. A pool of blood grows around where you Lay. " + Enemy.name + " Wins!")}
    if (Enemy.HP < 1) {console.log("The Wounds You Enflicted on " + Enemy.name + " Were To Much For Any Human. Your Opponent Falls To the Ground. Blood Pours From their Wounds. They are dead. You Win."); next()}

    pastAttacks.push( m );
}

//==============================================================================================================
var xpInc;
var enemiesKilled;
var moneyEarned;

function lvlup() {
    console.log(player.lvl)
    console.log("Level Up!");
    
    var nextLevel = player.lvl.levelID;
    player.lvl = levels[nextLevel - 1];
    console.log(player.lvl);
}

function next() {
    enemiesKilled++;
    moneyEarned = Math.floor((Math.random()*100)+15);
    nameToPick = Math.floor((Math.random()*10)+1);
    xpInc = parseInt(Enemy.weapon.dmg + Enemy.lvl.attackPower);
    player.xp = player.xp + xpInc;
    player.cash = player.cash + moneyEarned;
    if (player.xp == player.lvl.xpNeeded) {lvlup()}
    
    console.log("Well Done for winning. You were awarded with: $" + moneyEarned + " And you Earned " + xpInc + "XP giving you a total of: " + player.xp + "XP and $" + player.cash);
    
    Enemy = new enemy(names[nameToPick-1],Math.floor((Math.random()*10)+1),0,Math.floor((Math.random()*100)+1),"minion","none",weapons[Math.floor(Math.random()*(weapons.length-1))]);
    
    console.log("Next Battle: " + player.name + " VS " + Enemy.name + "!");
    
    console.log(player.name + " is using the: " + player.weapon.name);
    
    console.log(Enemy.name + " is using the: " + Enemy.weapon.name);
    
    console.log("But First, If you want, Introduce Yourself with the intro command. Example intro('Bob')");
    
}




function inv() {
    console.log("You are carrying: " + items);
}

function help() {
    console.log("Welcome to My Console Based Game! Try gameplay() to Learn about the game, try listcommands() to see what you can do with the JS console.");
}

function gameplay() {
    console.log("coming soon");
}

function listcommands() {
    console.log("Commands are notated as follows comName(param) where comName is the name of the command and param is the name of a parameter which you need to supply");
    console.log("attack('h') Attacks the Enemy. Takes 1 parameter, Either 'h', 'v', 'j' or 's' ");
    console.log("itemName.use() Uses an Item. replace itemName with the name of the item. E.g.: potion.use()");
    console.log("itemName.equip() Equips an Item. Only works for Weapons and armour");
    console.log("inv() Displays the Inventory");
    console.log("intro() Inroduce yourself to the enemy. May Reveal interesting Info.");
    console.log("gameplay() Shows info about the game");
    console.log("browse() Look at what is for sale ");
    console.log("itemName.inspect() look at an item and see what it does");
    console.log("itemName.buy(n) buy n number of items");
    console.log("itemName.uses shows how many of an item you have left");
    console.log("player.cash shows your money");
    console.log("=====================================================================================================================================================");
    console.log("Extra commands");
    console.log("=====================================================================================================================================================");
    console.log("player.HP Displays your HP");
    console.log("Enemy.HP Displays the Enemies HP");
    console.log("player Displays info about the player");
    console.log("Enemy Displays info about the Enemy");
        console.log("With these commands, if you know what your doing, you can very easily create mods and cheats. Have fun Experimenting! (Of course if you mess something up badly just hit F5)");
    
}

function intro(name) {
    player.name=name;
    console.log("You introduced yourself as " + player.name);
    console.log("Enough With pleasantries. Fight.");
}