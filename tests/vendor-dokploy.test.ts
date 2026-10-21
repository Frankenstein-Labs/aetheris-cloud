import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, relative } from "node:path";

const root = resolve("vendor/dokploy");
const manifest = JSON.parse(readFileSync(resolve(root, "manifest.json"), "utf8")) as {
  commit: string;
  files: { path: string; sha256: string; importedSha256?: string }[];
};

test("official UI snapshot retains pinned bytes except documented credential-hint removal", () => {
  assert.equal(manifest.commit, "05970e7b234d4742ceab2967490597fbde47dbdd");
  assert.equal(manifest.files.length, 481);
  for (const file of manifest.files) {
    const content = readFileSync(resolve(root, file.path));
    assert.equal(createHash("sha256").update(content).digest("hex"), file.importedSha256 ?? file.sha256, file.path);
  }
});

test("no proprietary source or environment files are imported", () => {
  const walk = (path: string): string[] => readdirSync(path, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(resolve(path, entry.name)) : [relative(root, resolve(path, entry.name))]);
  const files = walk(root);
  assert.equal(files.some(path => path.split("/").includes("proprietary")), false);
  assert.equal(files.some(path => path.split("/").some(part => part.startsWith(".env"))), false);
});

test("UI sources contain no provider credential literals or complete private keys", () => {
  const credentials = /(?:sk_live_|sk_test_|ghp_|github_pat_|hf_|sk-aeth-)[A-Za-z0-9]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----[\s\S]+?-----END (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;
  for (const file of manifest.files) assert.equal(credentials.test(readFileSync(resolve(root, file.path), "utf8")), false, file.path);
});