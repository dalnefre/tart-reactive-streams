/*

index.js - "tart-reactive-streams": Implementation of Reactive Streams (tart module)

The MIT License (MIT)

Copyright (c) 2015 Dale Schumacher

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/
"use strict";

var rs = module.exports;

//var log = console.log;
var log = function () {};

var rs.factory = function factory(sponsor) {
    var opt = {};
    
    opt.publisher = function publisher() {
        var subList = [];
        return sponsor(function publisherBeh(m) {
            if (m.action === 'subscribe') {
                var subscription = opt.subscription(this.self, m.subscriber);
                subList.push(subscription);
                m.subscriber({ event:'onSubscribe', subscription:subscription });
            }
        });
    };
    
    opt.subscription = function subscription(pub, sub) {
        return sponsor(function subscriptionBeh(m) {
            if (m.action === 'request') {
                .
            } else if (m.action === 'cancel') {
                .
            }
        });
    };

    return opt;
};
