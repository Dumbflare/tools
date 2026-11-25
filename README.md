# Dumbflare Tools

A static, browser-based toolbox that can be hosted on GitHub Pages. No account,
server, or build step is required: publish this repository's root directory.

Tool inputs are processed in your browser and are not sent to a Dumbflare
server. OpenPGP verification and PHP bcrypt/Argon2id use browser libraries
downloaded from jsDelivr when those tools are used; tool inputs are not sent to
that CDN. Those three features require an internet connection. Other tools work
without external dependencies.

The PHP and Python validators provide lightweight browser-side checks, not a
replacement for running the language's official parser. Encryption uses
Web Crypto; keep a copy of the key and encrypted result because the page does
not store them. Generated card numbers are test data and must not be used for
payments.
