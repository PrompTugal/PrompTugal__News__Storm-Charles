/* The read-only vault reader of the evidence pages.
 * The derivations are sgit.ai's house reader (https://sgit.ai/assets/vault-embed.js, SGVaultEmbed.Reader, read 11 November 2026),
 * copied here as its brief asks (https://sgit.ai/docs/briefs/sgit-ai-site-pages.md: copy, do not fetch across origins), with one
 * change: a file is found by walking only the folders on its path, so a vault of thousands of captures costs a few requests.
 * It holds a READ key only: it cannot write. Objects whose id contains -imm- are immutable and cached; the ref never is.
 * Kept by incident.archivist@web-summit.dinis. */
(function () {
  'use strict'
  var enc = new TextEncoder(), dec = new TextDecoder()
  function hexToBytes(hex) { var out = new Uint8Array(hex.length / 2); for (var i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16); return out }
  function bytesToHex(b) { var s = ''; for (var i = 0; i < b.length; i++) s += b[i].toString(16).padStart(2, '0'); return s }
  function b64ToBytes(b64) { var bin = atob(b64), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out }

  function Reader(cfg) {
    this.endpoint = cfg.endpoint.replace(/\/$/, '')
    this.vaultId = cfg.vault_id
    this.readKey = String(cfg.read_key).replace(/^sgit_(public|private)_read_/, '').split(':')[0]
    this.mem = new Map(); this.trees = new Map(); this.requests = 0; this.bytes = 0
  }
  Reader.prototype.init = async function () {
    if (!(window.crypto && window.crypto.subtle)) throw new Error('Web Crypto is not available here (it needs https or localhost)')
    var raw = hexToBytes(this.readKey)
    this.aesKey = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt'])
    this.hmacKey = await crypto.subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    return this
  }
  Reader.prototype.fileId = async function (domain) { return bytesToHex(new Uint8Array(await crypto.subtle.sign('HMAC', this.hmacKey, enc.encode(domain)))).slice(0, 12) }
  Reader.prototype.decrypt = async function (bytes) { return new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.slice(0, 12), tagLength: 128 }, this.aesKey, bytes.slice(12))) }
  Reader.prototype.raw = async function (path) {
    var r = await fetch(this.endpoint + '/api/vault/read/' + this.vaultId + '/' + path, { cache: path.indexOf('-imm-') !== -1 ? 'default' : 'no-store' })
    if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + path)
    var b = new Uint8Array(await r.arrayBuffer()); this.requests++; this.bytes += b.length; return b
  }
  Reader.prototype.obj = async function (id) { if (this.mem.has(id)) return this.mem.get(id); var p = await this.decrypt(await this.raw('bare/data/' + id)); this.mem.set(id, p); return p }
  Reader.prototype.objJson = async function (id) { return JSON.parse(dec.decode(await this.obj(id))) }
  Reader.prototype.decB64 = async function (b64) { return b64 ? dec.decode(await this.decrypt(b64ToBytes(b64))) : '' }
  Reader.prototype.open = async function () {
    var refId = 'ref-pid-muw-' + await this.fileId('sg-vault-v1:file-id:ref:' + this.vaultId)
    var ref = JSON.parse(dec.decode(await this.decrypt(await this.raw('bare/refs/' + refId))))
    this.commitId = ref.commit_id
    this.rootTree = (await this.objJson(ref.commit_id)).tree_id
    return this
  }
  // one folder: { name: {tree_id} | {blob_id} }, names decrypted once
  Reader.prototype.dir = async function (treeId) {
    if (this.trees.has(treeId)) return this.trees.get(treeId)
    var tree = await this.objJson(treeId), out = {}, es = tree.entries || []
    var names = await Promise.all(es.map(function (e) { return this.decB64(e.name_enc) }, this))
    for (var i = 0; i < es.length; i++) out[names[i]] = es[i]
    this.trees.set(treeId, out); return out
  }
  Reader.prototype.find = async function (path) {
    var parts = path.replace(/^\.?\//, '').split('/'), t = this.rootTree
    for (var i = 0; i < parts.length; i++) {
      var d = await this.dir(t), e = d[parts[i]]
      if (!e) return null
      if (i === parts.length - 1) return e
      if (!e.tree_id) return null
      t = e.tree_id
    }
    return null
  }
  Reader.prototype.readBytes = async function (path) { var e = await this.find(path); if (!e || !e.blob_id) throw new Error('not in the vault: ' + path); return this.obj(e.blob_id) }
  Reader.prototype.readText = async function (path) { return dec.decode(await this.readBytes(path)) }
  window.EvidenceVault = { Reader: Reader, sha256: async function (bytes) { return bytesToHex(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))) } }
})()
