[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][deps-dev-image]][deps-dev-url]

# postal-api

REST API server for libpostal

## Install

```sh
$ npm install --global postal-api
```

Please note that postal-api is using [postal-async] and it expects that
libpostal data is located in `/var/lib/libpostal`.

See [libpostal docs] on how to download the data.

## API

### `parse`

```sh
 curl 'http://localhost:4030/parse?address=781+Franklin+Ave+Crown+Hts+Brooklyn+NY'
```

```json
[
  {
    "label": "house_number",
    "value": "781"
  },
  {
    "label": "road",
    "value": "franklin ave"
  },
  {
    "label": "suburb",
    "value": "crown hts"
  },
  {
    "label": "city_district",
    "value": "brooklyn"
  },
  {
    "label": "state",
    "value": "ny"
  }
]

```


### `expand`

```sh
curl 'http://localhost:4030/expand?address=781+Franklin+Ave+Crown+Hts+Brooklyn+NY'
```


```json
[
  "781 franklin avenue crown heights brooklyn ny",
  "781 franklin avenue crown heights brooklyn new york"
]
```

## Environment

`postal-api` is using [dotenv] and by default reads its environment from `/etc/default/postal-api`

- `POSTAL_API_PORT` - port number on which postal-api listens, defaults to 4030


## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[dotenv]: https://www.npmjs.com/package/dotenv
[postal-async]: https://www.npmjs.com/package/postal-async
[libpostal docs]: https://github.com/openvenues/libpostal#data-files

[npm-image]: https://img.shields.io/npm/v/postal-api.svg
[npm-url]: https://npmjs.org/package/postal-api

[travis-url]: https://travis-ci.com/pirxpilot/postal-api
[travis-image]: https://img.shields.io/travis/com/pirxpilot/postal-api.svg

[deps-image]: https://img.shields.io/david/pirxpilot/postal-api.svg
[deps-url]: https://david-dm.org/pirxpilot/postal-api

[deps-dev-image]: https://img.shields.io/david/dev/pirxpilot/postal-api.svg
[deps-dev-url]: https://david-dm.org/pirxpilot/postal-api?type=dev
