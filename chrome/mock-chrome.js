'use strict';

document.execCommand = function () {
  return true;
};

// Manually override functions by replacing the entire namespace.

chrome.runtime = {
  getURL: function (path) {
    return '/base/chrome/' + path;
  }
};

var contextMenus = {};

chrome.contextMenus = {
  create: function (contextMenu, callback) {
    contextMenus[contextMenu.title] = contextMenu;
    callback();
  }
};

chrome.notifications = {
  create: function (nid, options, callback) {
    if (!nid) {
      nid = 'notification-' + Math.floor(Math.random(1000000));
    }

    var nevent = new Event('chrome-notification');
    nevent.id = nid;
    nevent.options = options;
    document.dispatchEvent(nevent);

    if (callback) {
      callback(nid);
    }
  },
  clear: function (nid, callback) {
    var nevent = new Event('chrome-notification-removed');
    nevent.id = nid;
    document.dispatchEvent(nevent);

    if (callback) {
      callback(true);
    }
  }
};
