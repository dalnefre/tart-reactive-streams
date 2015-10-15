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

/*
public interface Publisher<T> {
    public void subscribe(Subscriber<? super T> s);
}
*/
    opt.publisher = function publisher() {
        var subList = [];
        return sponsor(function publisherBeh(r) {
            if (r.action === 'subscribe') {
                var subscription = opt.subscription(this.self, r.subscriber);
                subList.push(subscription);
                r.subscriber({ event:'onSubscribe', subscription:subscription });
            }
        });
    };

/*
public interface Subscriber<T> {
    public void onSubscribe(Subscription s);
    public void onNext(T t);
    public void onError(Throwable t);
    public void onComplete();
}
*/
    opt.subscriber = function subscriber() {
        return sponsor(function subscriberBeh(e) {
            if (e.event === 'onSubscribe') {
                .
            } else if (e.event === 'onNext') {
                .
            } else if (e.event === 'onError') {
                .
            } else if (e.event === 'onComplete') {
                .
            }
        });
    };

/*
public interface Subscription {
    public void request(long n);
    public void cancel();
}
*/
    opt.subscription = function subscription(pub, sub) {
        return sponsor(function subscriptionBeh(r) {
            if (r.action === 'request') {
                .
            } else if (r.action === 'cancel') {
                .
            }
        });
    };

    return opt;
};
