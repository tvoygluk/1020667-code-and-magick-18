'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var RESPONSE_OK_CODE = 200;
  var TEN_SECOND = 10000;
  var REQUEST_TYPE_GET = 'GET';
  var REQUEST_TYPE_POST = 'POST';

  var requestVers = function (requestType, url, onLoad, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === RESPONSE_OK_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TEN_SECOND;

    xhr.open(requestType, url);
    xhr.send(data);
  };

  // var load = function (onLoad, onError) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === RESPONSE_OK_CODE) {
  //       onLoad(xhr.response);
  //     } else {
  //       onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });
  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = TEN_SECOND;

  //   xhr.open('GET', URL_LOAD);
  //   xhr.send();
  // };

  // var save = function (onLoad, onError, data) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';
  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === RESPONSE_OK_CODE) {
  //       onLoad(xhr.response);
  //     } else {
  //       onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });
  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = TEN_SECOND;

  //   xhr.open('POST', URL_SAVE);
  //   xhr.send(data);
  // };


  window.backend = {
    REQUEST_TYPE_GET: REQUEST_TYPE_GET,
    REQUEST_TYPE_POST: REQUEST_TYPE_POST,
    URL_LOAD: URL_LOAD,
    URL_SAVE: URL_SAVE,
    load: requestVers,
    save: requestVers
  };
})();
