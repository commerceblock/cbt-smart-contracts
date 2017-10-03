## CommerceBlock CBT ERC20 Smart Contracts ##

> The quieter you become, the more you can hear.
>
> -- Ram Dass



**Note run below commands with NodeJS 8.5+, this is needed for native async support**

### Install dependencies ###

```bash
npm install
```

### Run Ethereum local test node ###

```bash
npm run testrpc
```

### Run tests ###

```bash
export ROPSTEN_SEED="<ROPSTEN_TEST_WALLET_SEED>"
npm run test
```

Example:
```bash
export ROPSTEN_SEED="6667817685838271f0804611d915013bfcb68d8b6de6ff49972a52db5fe134c2b821dde2ebadcac503f5b7d4c98293b7d399079ec5dac6fdff2a843ace8e65c3"
npm run test
```

### Run code coverage ###

```bash
export ROPSTEN_SEED="<ROPSTEN_TEST_WALLET_SEED>"
npm run coverage
```

Example:
```bash
export ROPSTEN_SEED="6667817685838271f0804611d915013bfcb68d8b6de6ff49972a52db5fe134c2b821dde2ebadcac503f5b7d4c98293b7d399079ec5dac6fdff2a843ace8e65c3"
npm run coverage
```
