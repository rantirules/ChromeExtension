'use strict';
console.log("Chrome extension is running again");
let imgs = document.getElementsByTagName('img');

for (imgElt of imgs) {
  console.log(imgElt.src); // this is going to parsed into the google cloud api
}

    if (API_KEY) {
      return done();
    }
 // the assert module that I used here is when an expression evaluates to 0 or false, an error is thrown and the programme stops

    document.addEventListener('config-loaded', function () {
      assert(API_KEY);
      return done();
    });
  });
// menu options when user right clicks
  it('Should add context menu items', function (done) {
    assert(contextMenus['Text detection']);
    assert(contextMenus['Label detection']);
    assert(contextMenus['Face detection']);
    done();
  });

  it('Should label images', function (done) {
    // Waiting for notification removal will take at least 4 seconds.
    this.timeout(15000 /* 15 seconds */);

    var lookForLabel = function (evt) {
      var nid = evt.id;
      assert(evt.id);
      assert(evt.options['message'].indexOf('cat ') >= 0);

      var lookForClear = function (evt) {
        assert(evt.id === nid);
        document.removeEventListener('chrome-notification-removed', lookForClear);
        done();
      };
      document.addEventListener('chrome-notification-removed', lookForClear);
      document.removeEventListener('chrome-notification', lookForLabel);
    };
    document.addEventListener('chrome-notification', lookForLabel);

    contextMenus['Label detection'].onclick({srcUrl: '/base/testing/cat.jpg'});
  });
// evt is a truthy value
  it('Should detect text', function (done) {
    var lookForText = function (evt) {
      assert(evt.id);
      assert(evt.options['title'].indexOf('Text copied to clipboard') >= 0);
      assert(evt.options['message'].toLowerCase().indexOf('wake up') >= 0);
      document.removeEventListener('chrome-notification', lookForText);
      done();
    };
    document.addEventListener('chrome-notification', lookForText);

    contextMenus['Text detection'].onclick({srcUrl: '/base/testing/wakeup.jpg'});
  });

  it('Should detect faces', function (done) {
    var lookForFaces = function (evt) {
      assert(evt.id);
      assert(evt.options['title'] === 'Detected 1 face(s)');
      document.removeEventListener('chrome-notification', lookForFaces);
      done();
    };
    document.addEventListener('chrome-notification', lookForFaces);

    contextMenus['Face detection'].onclick({srcUrl: '/base/testing/face.jpg'});
  });
});
