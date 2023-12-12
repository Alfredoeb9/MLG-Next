import moment from "moment";
import jwt from "jsonwebtoken"

export async function emailRegx(value: string) {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const isValidEmail = emailRegex.test(value);
    return isValidEmail;
}

export async function getCurrentDateTime() {
    return moment().toISOString();
}

export async function createToken(id: any, isAdmin: boolean) {
    const token1: string = jwt.sign({id, isAdmin: isAdmin }, process.env.JWT_SECRET as any);
    const token2: string = jwt.sign({id, isAdmin: isAdmin }, process.env.JWT_SECRET as any);
    const secureToken = token1 + token2;
    return secureToken;
}
// module.exports = {
//     emailRegex: async (value: string) => {
//         const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//         const isValidEmail = emailRegex.test(value);
//         return isValidEmail;
//     },
//     getCurrentDateTime() {
//         return moment().toISOString();
//     },
// }