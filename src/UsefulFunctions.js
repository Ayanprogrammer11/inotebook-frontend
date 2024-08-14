

/**
* @param {number} num1 - First Number which you want to Add
* @param {number} num2 - The last Number
 */

const sumTwo = (num1, num2) => {
    if(typeof num1 === "number" && typeof num2 === "number") {    
    return num1 + num2;
    } else if (typeof num1 === "number" || typeof num2 === "number") {
        return "Error: One of your argument is not a Number"
    }
    else if(typeof num1 !== "number" && typeof num2 !== "number") {
        return `Error: Got a "${typeof num1}" instead of number`
    }
}


/**
 * 
 * @param {string} str - Converts the first letter of a string to Uppercase 
 */
const Capitalize = (str) => {
        return str;
}

/**

 * @param {string} str - The String which you want to Truncate
 * @param {number} start - The Starting Number from where Truncating will start
 * @param {number} end - The ending number where Truncating will end 
 * - For Example: if starting number is 0 and ending number is 2 and the string is "hello" then it will be like "hel" not "he"
 * @param {string} indicate - The String that will be added after Truncation
 */
const Truncate = (str, start, end, indicate) => {
    if(str.length < end) {
        return str.substring(start, end+1)
    }
    return str.substring(start, end+1) + indicate;

}

/**
 * 
 * @param {string} str - Checks if there is a number in the string
 * - If there is then it returns true
 * - Otherwise false
 */

const containingNumber = (str) => {
        if(str.includes("0") || str.includes("1") || str.includes("2") || str.includes("3") || str.includes("4") || str.includes("5") || str.includes("6") || str.includes("7") || str.includes("8") || str.includes("9") || str.includes("10")) {
            return true;
        }
         else {
            return false;
        }
}

const getFirstName = (string) => {
    return string;
 }

module.exports = {sumTwo, Capitalize, Truncate , getFirstName, containingNumber}

