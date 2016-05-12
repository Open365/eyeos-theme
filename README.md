Eyeos Theme
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
		"themes-dock-main": "templates/main.html",
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
		"themes-default-main": "templates/main.html",
		"themes-default-content": "templates/content.html",
		"themes-default-topbar": "templates/topbar.html"
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
		"themes-default-content": "templates/content.html",
		"themes-default-topbar": "templates/topbar.html",
		"addons-applications-icon": "templates/icon.html"
	}
}
```

### Merged (Dfault and Santfe plus Applications addon)
```json
{
	"sass": [
		"addons/applications/sass/variables.sass",
		"themes/default/css/variables.sass",
		"themes/santfe/css/variables.sass",
		"addons/applications/foo.sass",
		"themes/default/css/main.sass",
		"themes/santfe/css/main.sass",
	],
	"hooks": {
		"addons-applications-icon": "themes/santfe/templates/icon.html",
		"themes-default-main": "themes/default/templates/main.html",
		"themes-default-content": "themes/santfe/templates/content.html",
		"themes-default-topbar": "themes/santfe/templates/topbar.html",

	},
	"modules": {
		"ApplicationsModule": "modules/applicationsmodule.js"
	}
}
```

### Next steps
[InfoParser]   --->
                        [InfoProvider] ---> [ThemeInfoProvider] ----> themeInfos[]
                        [InfoProvider] <---- [ThemeInfoProvider]
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