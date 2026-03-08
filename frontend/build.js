import { build } from 'vite';
import fs from 'fs';

(async () => {
    try {
        await build();
        console.log("Build successful.");
    } catch (error) {
        fs.writeFileSync('build-error.log', error.stack || error.toString(), "utf8");
        console.error("Build failed. Wrote error to build-error.log");
    }
})();
