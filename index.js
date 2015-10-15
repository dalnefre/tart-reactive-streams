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
                var publisher = this.self;
                var subscriber = r.subscriber;
                var subscription = opt.subscription(publisher, subscriber);
                subList.push(subscription);
                subscriber({ event:'onSubscribe', subscription:subscription });
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
    opt.subscriber = function subscriber(consumer, batchSize, fail) {
        batchSize = batchSize || 1;
        fail = fail || log;
        var expecting = 0;
        var subscription;
        return sponsor(function subscriberBeh(e) {
            if (e.event === 'onSubscribe') {
                expecting = batchSize;
                subscription = e.subscription;
                subscription({ action:'request', count:batchSize });
            } else if (e.event === 'onNext') {
                --expecting;
                if (expecting >= 0) {
                    consumer(e.data, function callback (error) {
                        if (error) {
                            expecting = 0;
                            subscription({ action:'cancel' });
                            fail(error);
                        }
                        e.done(this.self);
                    });
                } else {
                    e.done(this.self);
                }
                if (expecting == 0) {
                    subscription({ action:'request', count:batchSize });
                }
            } else if (e.event === 'onError') {
                fail(e.error);
                expecting = 0;
            } else if (e.event === 'onComplete') {
                expecting = 0;
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
