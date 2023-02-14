function genRandonString(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
 }
 const options = {
        radius: 20,
        backgroundColor: ["b6e3f4","c0aede","d1d4f9"],
        backgroundType: ["gradientLinear"],
        mouth: ['laughing', 'smile', 'smirk', 'suprised'],
        hair: ['dannyPhantom','fonze', 'full', 'mrClean', 'pixie']
 }
   
export {options, genRandonString}

