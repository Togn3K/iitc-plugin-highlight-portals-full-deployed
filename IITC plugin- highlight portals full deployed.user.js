// ==UserScript==
// @id             iitc-plugin-highlight-portals-full-deployed@togn3k
// @name           IITC plugin: highlight portals full deployed
// @category       Highlighter
// @version        0.1.2.20190801.00001
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @description    [iitc-2019-08-01-000001] Use the portal fill color to denote if the portal is full deployed.
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'iitc';
plugin_info.dateTimeVersion = '20190801.00001';
plugin_info.pluginId = 'portal-highlighter-full-deployed';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalsFullDeployed = function() {};

window.plugin.portalsFullDeployed.highlight = function(data) {

  if(data.portal.options.team != TEAM_NONE) {
    var res_count = data.portal.options.data.resCount;

    if(res_count !== undefined && res_count == 8) {
      var fill_opacity = 1;
      var color = 'red';
      var params = {fillColor: color, fillOpacity: fill_opacity};
      data.portal.setStyle(params);
    }
  }
}

var setup =  function() {
  window.addPortalHighlighter('Portals Full Deployed', window.plugin.portalsFullDeployed.highlight);
}

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


