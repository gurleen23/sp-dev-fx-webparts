# Script editor web part for modern pages built in React

## Summary
Coming from old classic SharePoint pages you might have existing script solutions you want to re-use on a modern page
without having to repackage it as a new SharePoint Framework web part. This web part is similar to the classic
Script Editor Web Part, and allows you do drop arbitrary script or html on a modern page.

> Notice. All client-side web parts are deployed or enabled to be available in site level by tenant administrator using tenant app catalog. If there are concerns on enabling script options in a tenant, this web part or a approach should not be approved by tenant administrators.

As an example add the following scripts to the web part in order to show weather info on your page. First *jQuery* is loaded, then the *simpleWeather* extension, and finally the last script block is executed to show the weather.

```html
<div id="weather"></div>
<script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min.js"></script>
<script>
  jQuery.simpleWeather({
	location: 'Oslo, Norway',
	woeid: '',
	unit: 'c',
	success: function(weather) {
	  html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
	  html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
	  html += '<li>'+weather.currently+'</li></ul>';
  
	  jQuery("#weather").html(html);
	},
	error: function(error) {
	  jQuery("#weather").html('<p>'+error+'</p>');
	}
  });
</script>
```

The web part works by loading each script in a `<script src>` tag sequentially in the order they are specified, then any other `<script>` block is executed.

![site page header configurator web part](./assets/modern-script-editor-wp.gif)

If all you want is to add markup on the page, you can do that as well. Adding the following html would show a headline and a list.

```html
<h2>My header</h2>
<ul>
    <li>One
    <li>Two
    <li>Three
</ul>
```

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework Release GA](https://blogs.office.com/2017/02/23/sharepoint-framework-reaches-general-availability-build-and-deploy-engaging-web-parts-today/)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-script-editor | Mikael Svenson ([@mikaelsvenson](http://www.twitter.com/mikaelsvenson), [techmikael.com](techmikael.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 10th, 2017|Initial release
1.0.1|August 8th, 2017|Updated SPFx version and CSS loading

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome
### Local testing

- Clone this repository
- In the command line run:
  - `npm install`
  - `gulp serve`

### Deploy
* Set CDN path in config\write-manifest.json to where you want to host the web part
	* E.g.:  https://&lt;tenant&gt;.sharepoint.com/sites/CDN/SiteAssets/SPFx/&lt;partname&gt;
* gulp --ship
* gulp package-solution --ship
* Copy contents of temp\deploy to the CDN folder
* Upload .sppkg file from sharepoint\solution to your tenant App Catalog
	* E.g.: https://&lt;tenant&gt;.sharepoint.com/sites/AppCatalog/AppCatalog
* Add the web part to a site collection, and test it on a page

## Features
This web part illustrates the following concepts on top of the SharePoint Framework:

- Re-use existing JavaScript solutions on a modern page
- Office UI Fabric
- React

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-script-editor" />