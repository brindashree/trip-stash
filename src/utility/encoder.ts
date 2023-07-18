const secretKey = 712312;

export class MaskId {
    static encodeNumber(number: number): number {
        // Define a secret key or algorithm for encoding

        // Perform the encoding calculation
        const encodedNumber: number = number * secretKey;

        return encodedNumber;
    }

    static decodeNumber(encodedNumber: number): number {
        // Define the inverse operation of the encoding calculation
        const decodedNumber: number = encodedNumber / secretKey;

        return decodedNumber;
    }
}


