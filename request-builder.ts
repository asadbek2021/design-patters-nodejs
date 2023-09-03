//@ts-nocheck
import http ,{ ClientRequest, IncomingMessage, RequestOptions } from 'http';



enum HttpMethods {
    GET='GET',
    POST='POST',
};

type NativeType = (url: string | URL, options: RequestOptions, callback?: (res: IncomingMessage) => void) => ClientRequest;

class Request {

    private native: NativeType= http.request.bind(http);
    constructor(
       private url: string | URL, 
       private method: HttpMethods,
       private query: object,
       private headers: object,
       private body?: object,
    ){}

    async invoke() {
        const queury = this.buildQuery(this.query);
        if(this.method == HttpMethods.GET || !this.body) {
            let data = '';
            const request = this.native(this.url + queury, {method: this.method}, (res) => {
                res.on('data', (chunk) => {data += chunk.toString()});
                res.on('end', () => {console.log(data)});
            });
            this.setHeaders(request, this.headers);
            request.end();
        }
    }

    private setHeaders(requestObj: ClientRequest, headers: object) {
        for(let key of Object.keys(headers)) {
            requestObj.setHeader(key, headers[key]);
        }
    }

    private buildQuery(query: object) {
        const arr: string[] = ['?'];
        for(let key of Object.keys(query)) {
            arr.push(`${key}=${query[key]}`);
        }
        return arr.join(',').replace(',','');
    }
}

class RequestBuilder {

    private url: URL | string;
    private headers: object;
    private body?: any;
    private method: HttpMethods;
    private query: object;

    addUrl(url: URL | string) {
        this.url = url;
        return this;
    }

    addHeaders(headers: object) {
        this.headers = headers;
        return this;
    }

    addMethod(method: HttpMethods) {
        this.method = method;
        return this;
    }

    addQuery(query: object) {
        this.query = query;
        return this;
    }

    addBody(body?: any) {
        if(this.method != HttpMethods.POST) {
            throw new Error('Please first specify correct Method for body!');
        } else if(this.body) {
            this.body = body;
            return this;
        }
    }

    build() {
        if(!this.url ||
            !this.method ||
            !this.query ||
            !this.headers
        ) {
            throw new Error('Please provide all required props!');
        }

        return new Request(
            this.url,
            this.method,
            this.query,
            this.headers,
            this.body
        );
    }

}


const request = new RequestBuilder()
    .addUrl('http://info.cern.ch/')
    .addHeaders({
        'Content-type': 'application/json',
    })
    .addMethod(HttpMethods.GET)
    .addQuery({'salam':2}).build();

     request.invoke();