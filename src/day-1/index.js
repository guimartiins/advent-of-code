import { createReadStream } from 'fs'

export async function main() {
    const readableStream = createReadStream('./input.txt')
    const chunks = []
    const regex = /([0-9])/gm
    let value = 0

    for await (const chunk of readableStream) {
        const formatted = chunk.toString().split('\n')
        chunks.push(...formatted)
    }

    for (const string of chunks) {
        const match = string.match(regex)
        if (match.length === 2) {
            value += Number(match.join(''))
        } else if (match.length > 2) {
            value += Number(match[0] + match[match.length - 1])
        } else {
            value += Number(match[0] + match[0])
        }
    }

    return value
}

;(async () => {
    console.time()
    const res = await main()
    console.log(res)
    console.timeEnd()
})()
