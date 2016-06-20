Eyeos Product
===========

## Overview

Themming library and service

## How to use it

### Default applications
```json
{
	"defaultAddons": ["applications"]
}
```

### ApplicationsModule
	Tha ghost config

### Applications addon
```json
{
	"button": ["templates/button.html"],
	"content": ["templates/content.html"],
	"sass": ["sass/variables.sass", "sass/foo.sass"],
	"modules": [
		"ApplicationsModule"
	],
	"hooks": {
		"addons-applications-icon": "templates/icon.html"
	}
}
```

### Dock
```json
{
	"defaultAddons": true,
	"sass": ["css/variables.sass","css/main.sass"],
	"hooks": {
		"products-dock-main": "templates/main.html",
	}
}
```

### Default
```json
{
	"defaultAddons": true,
	"sass": ["css/variables.sass","css/main.sass"],
	"addons": {
		"applications": "full",
		"startMenu": "full"
	},
	"hooks": {
		"products-default-main": "templates/main.html",
		"products-default-content": "templates/content.html",
		"products-default-topbar": "templates/topbar.html"
	}
}
```

### Santfe
```json
{
	"extends": "default",
	"sass": ["css/variables.sass","css/main.sass"],
	"addons": {
		"iconsOnDesktop": "full"
	},
	"hooks": {
		"products-default-content": "templates/content.html",
		"products-default-topbar": "templates/topbar.html",
		"addons-applications-icon": "templates/icon.html"
	}
}
```

### Merged (Dfault and Santfe plus Applications addon)
```json
{
	"sass": [
		"addons/applications/sass/variables.sass",
		"products/default/css/variables.sass",
		"products/santfe/css/variables.sass",
		"addons/applications/foo.sass",
		"products/default/css/main.sass",
		"products/santfe/css/main.sass",
	],
	"hooks": {
		"addons-applications-icon": "products/santfe/templates/icon.html",
		"products-default-main": "products/default/templates/main.html",
		"products-default-content": "products/santfe/templates/content.html",
		"products-default-topbar": "products/santfe/templates/topbar.html",

	},
	"modules": {
		"ApplicationsModule": "modules/applicationsmodule.js"
	}
}
```

### Next steps
[InfoParser]   --->
                        [InfoProvider] ---> [ProductInfoProvider] ----> productInfos[]
                        [InfoProvider] <---- [ProductInfoProvider]
                        [InfoProvider] ---> [AddonsInfoProvider] ---> addonsInfo[]
                        [InfoProvider] <--- [AddonsInfoProvider]
                  <---  [InfoProvider]

[InfoParser]

## Quick help

* Install modules

```bash
	$ npm install
	$ bower install
```

* Check tests

```bash
    $ ./tests.sh
```
