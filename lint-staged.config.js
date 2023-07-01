module.exports = {
  '*rc': ['prettier --write'],
  '*.{md,mdx,js,json}': ['prettier --write'],
  '*.{ts,tsx}': ['prettier --write', 'eslint']
}
