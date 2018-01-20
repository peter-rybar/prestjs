
export class GA {

    private static _ga = new GA();

    static init(trackingId: string, dimensions?: Object): GA {
        return GA._ga.init(trackingId, dimensions);
    }

    static sendPageview(path: string): void {
        GA._ga.sendPageview(path);
    }

    static sendEvent(category: string, action: string, label: string): void {
        GA._ga.sendEvent(category, action, label);
    }

    private _trackingId: string;

    init(trackingId: string, dimensions?: Object): this {
        this._trackingId = trackingId;
        this._load();
        if (this._trackingId) {
            const w: any = self;
            w.ga("create", trackingId, "auto");
            if (dimensions) {
                for (const prop in dimensions) {
                    if (dimensions.hasOwnProperty(prop)) {
                        // console.log(prop + ": " + dimensions[prop]);
                        w.ga("set", prop, (dimensions as any)[prop]);
                    }
                }
            }
            w.ga("send", "pageview");
        }
        return this;
    }

    sendPageview(path: string): void {
        if (this._trackingId) {
            const w: any = self;
            w.ga("send", "pageview", path);

            // w.ga("set", { page: path, title: title});
            // w.ga("send", "pageview");

            // w.ga("set", "page", path);
            // w.ga("send", "pageview");
        }
    }

    sendEvent(category: string, action: string, label: string): void {
        if (this._trackingId) {
            const ga = (self as any).ga;
            console.log("Senging GA", ga, category, action, label);
            if (ga) {
                ga("send", "event", category, action, label);
                // ga("send", "pageview", {
                //     "page": this.get("url"),
                //     "title": this.get("url")
                // });
            }
        }
    }

    private _load(): void {
        if (this._trackingId) {
            (function (i: any, s: any, o: any, g: any, r: any, a?: any, m?: any) {
                i["GoogleAnalyticsObject"] = r;
                i[r] = i[r] || function () {
                        ((<any>i[r]).q = (<any>i[r]).q || []).push(arguments);
                    };
                (<any>i[r]).l = 1 * (<any>new Date());
                a = s.createElement(o);
                m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                if (m !== undefined) {
                    m.parentNode.insertBefore(a, m);
                } else {
                    document.head.appendChild(a);
                }
            })(self, document, "script", "//www.google-analytics.com/analytics.js", "ga");
        }
    }

}

// GA.init("track-id");
// GA.sendPageview("my-page");
