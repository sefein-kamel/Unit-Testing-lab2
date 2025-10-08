/**
 * Calculates various power for hero based on his strength. 
 ** if the 0< strength >10, he will be weak
 ** if the 10<= strength >20, he will be strong
 ** if the 20<= strength, he will be unbelievable
 * @param {number} strength - hero strength value

 * @returns {String} string with the strength power of the hero
 */
export default function calculateHeroStrengthPower(strength){
    if(strength< 10)
        return `${strength} (weak)`
    else if(strength>= 10 && strength < 20)
        return `${strength} (strong)`
    else  
        return `${strength} (unbelievable)`
}