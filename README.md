# PolyUI

Sleek React component library following the Polypass design language

## Installation

1. Add this library to your project with

```sh
git submodule add https://github.com/polypass/polyui.git
```

2. Add this to your `package.json`

```json
"scripts": {
  [...]
  "postinstall": "git submodule update --remote",
}
```

3. Add this to your `tsconfig.json` (if you're using TypeScript)

```json
"compilerOptions": {
  [...]
  "paths": {
    [...]
    "@polyui/*": ["./polyui/src/*"]
  }
}
```

PolyUI is now installed in your project, and will update when you use `npm i`.

## Usage

You can import components, libraries, etc. from the `@polyui/` package.

## License

&copy;Polypass. All rights reserved. PolyUI is only to be used for Polypass projects, and may not be used without prior authorization.
