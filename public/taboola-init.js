(function () {
    var PUBLISHER_ID = 'zucca-network';
    var PAGE_TYPE    = 'article';

    var LOADER_URL         = '//cdn.taboola.com/libtrc/'       + PUBLISHER_ID + '/loader.js';
    var LOADER_PRIVACY_URL = '//static.tblcontent.com/libtrc/' + PUBLISHER_ID + '/loader.privacy.js';
    var PIXEL_URL          = 'https://static.qovani.com/libtrc/tr5?type=pixel&publisher=' + PUBLISHER_ID;
    var SCRIPT_ID          = 'tb_loader_script';

    window._taboola = window._taboola || [];

    var pageTypePush = {};
    pageTypePush[PAGE_TYPE] = 'auto';
    _taboola.push(pageTypePush);

    new Image().src = PIXEL_URL;

    var firstScript = document.getElementsByTagName('script')[0];

    function injectLoader(id, src, fallbackSrc) {
        if (document.getElementById(id)) return;
        var s = document.createElement('script');
        s.async = true;
        s.src   = src;
        s.id    = id;
        if (fallbackSrc) {
            s.onerror = function () {
                if (s.parentNode) s.parentNode.removeChild(s);
                injectLoader(SCRIPT_ID + '_fb', fallbackSrc, null);
            };
        }
        firstScript.parentNode.insertBefore(s, firstScript);
    }

    injectLoader(SCRIPT_ID, LOADER_URL, LOADER_PRIVACY_URL);

    if (window.performance && typeof window.performance.mark === 'function') {
        window.performance.mark('tbl_ic');
    }
})();
