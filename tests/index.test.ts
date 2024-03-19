import {describe, it} from "node:test";
import axios from "axios";
import * as fs from "fs";
import * as path from "node:path";


describe("Fake webhook push commit", async () => {
    it("should 200", async () => {
        const response = await axios.post('http://localhost:3000/webhook', {});
        expect(200)
    });
});