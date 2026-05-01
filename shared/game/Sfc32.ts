class Sfc32 {
    private static _xfnv1a(str: string): () => number {
        let h = 2166136261 >>> 0;

        for (let i = 0; i < str.length; i++) {
            h = Math.imul(h ^ str.charCodeAt(i), 16777619);
        }

        return (): number => {
            h += h << 13;
            h ^= h >>> 7;
            h += h << 3;
            h ^= h >>> 17;

            return (h += h << 5) >>> 0;
        };
    }

    private a: number;
    private b: number;
    private c: number;
    private d: number;

    public constructor(str: string) {
        const seed = Sfc32._xfnv1a(str);
        this.a = seed();
        this.b = seed();
        this.c = seed();
        this.d = seed();
    }

    public next(): number {
        this.a >>>= 0;
        this.b >>>= 0;
        this.c >>>= 0;
        this.d >>>= 0;

        const t = (((this.a + this.b) | 0) + this.d) | 0;

        this.a = this.b ^ (this.b >>> 9);
        this.b = (this.c + (this.c << 3)) | 0;
        this.c = (((this.c << 21) | (this.c >>> 11)) + t) | 0;
        this.d = (this.d + 1) | 0;

        return (t >>> 0) / 4294967296;
    }
}
