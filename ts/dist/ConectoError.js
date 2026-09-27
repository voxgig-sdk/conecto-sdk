"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConectoError = void 0;
class ConectoError extends Error {
    isConectoError = true;
    sdk = 'Conecto';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ConectoError = ConectoError;
//# sourceMappingURL=ConectoError.js.map