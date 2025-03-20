function extractUsername(email: string): string | null {
    if (typeof email !== 'string') {
        return null; // Handle non-string input
    }

    const atIndex = email.indexOf('@');

    if (atIndex === -1) {
        return null; // Handle emails without '@'
    }

    return email.substring(0, atIndex);
}


export function extractFirstPartOfUsername(email: string): string | null {
    const username = extractUsername(email);
    if (username === null) {
        return null;
    }
    const numbers = "0123456789"
    let result = "";
    for (let i = 0; i < username.length; i++) {
        if (numbers.includes(username[i])) {
            break;
        }
        result += username[i];
    }
    return result;
}