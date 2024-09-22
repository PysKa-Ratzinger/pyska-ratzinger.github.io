'use strict';

export class Vec {
        constructor(x, y) {
                this.x = x;
                this.y = y;
        }

        clone() {
                return new Vec(this.x, this.y)
        }

        add(o) {
                return new Vec(this.x + o.x, this.y + o.y);
        }

        sub(o) {
                return new Vec(this.x - o.x, this.y - o.y);
        }

        mult(v) {
                return new Vec(this.x * v, this.y * v);
        }
};

export default Vec;

