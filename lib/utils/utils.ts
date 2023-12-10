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

export async function createToken(id: any, isAdmin: any) {
    return jwt.sign({id, isAdmin: isAdmin }, process.env.JWT_SECRET as any);
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