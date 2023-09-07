//@ts-ignore
import superagent, { SuperAgent, SuperAgentRequest } from "superagent";
import util from "util";

const promiseGet = util.promisify(superagent.get.bind(superagent));


// promiseGet('google.com').then(data => console.log(data.statusType))

enum ReqStatus{
    Sent,
    Done,
}

type ReqHandler = (err: null, req: {statusType: any}) => void;
const proxyHandler = {
    //@ts-ignore
    get:  (target, property) => {
        if(property == 'get') {
            const map = new Map<string, {status: ReqStatus, text?:string, handlers: ReqHandler[]}>();
            //@ts-ignore
            return  function(url, handler) {
                const req = map.get(url);
                if(req) {
                    if(req.status == ReqStatus.Sent) {
                        req.handlers = [...req.handlers, handler];
                        map.set(url, {...req});
                    }
                    else {
                        console.log('CACHE is used!!!!!!');
                        handler(null, {statusType: req.text})
                    }
                    return;
                }
                map.set(url, {status: ReqStatus.Sent, handlers:[handler]});
                target.get(url, (_, res) => {
                    let req = map.get(url);
                    req.status = ReqStatus.Done;
                    req.text = res.statusType;
                    map.set(url, {...req, handlers:[handler]});
                    req.handlers.forEach(h => h(null, {statusType: req.text}));
                })
                
            }
        }
    }
}

// function patchToCacheAgent(superagent: SuperAgent<SuperAgentRequest>): SuperAgent<SuperAgentRequest> {
//     const getOrigin = superagent.get;
//     const cache = new Map();
//     //@ts-ignore
//     superagent.get = (url, handler)=> {
//             getOrigin.apply(superagent, [url, (_, res) => {
//                 if(cache.get(url)) {
//                     console.log('CACHE is used!!!!!!');
//                     const res = {statusType: cache.get(url)};
//                     //@ts-ignore
//                     handler(null, res);
//                     return;
//                 }
//                 console.log('set to cache')
//                 cache.set(url, res.statusType + 'From Cache');
//                 handler(null, res)
//             }]);
//     }
//     return superagent;
// }

// const patched = patchToCacheAgent(superagent);

// patched.get('google.com', (_: null, res: {statusType: number})=> console.log('2 -', res.statusType))
// patched.get('google.com', (_: null, res: {statusType: number})=> console.log('1 -', res.statusType))

// class SuperAgentProxy {
//     private cache = new Map();
//     constructor(private superagent) {
//     }

//     get(url: string, handler:(err, res) => void) {
//         console.log(this.cache.get(url));
//         if(this.cache.get(url)) {
//             console.log('CACHE is used!!!!!!');
//             const res = {statusType: this.cache.get(url)};
//             return handler(null, res);
//         }
//         else {
//              this.superagent.get(url, (_, res) => {
//                 console.log('set to cache')
//                 this.cache.set(url, res.statusType + 'From Cache');
//                 return handler(null, res);
//             });
//         }
//     }
// }




const superAgentProxy = new Proxy(superagent, proxyHandler);

// const cachedSuperagent = new SuperAgentProxy(superagent);

// cachedSuperagent.get('google.com', (_,res) => {console.log('1 - ', res.statusType)})
// cachedSuperagent.get('google.com', (_,res) => {console.log('2 - ', res.statusType)})
// cachedSuperagent.get('google.com', (_,res) => {console.log('3 - ', res.statusType)})
// cachedSuperagent.get('google.com', (_,res) => {console.log('4 - ', res.statusType)})


superAgentProxy.get('google.com', (_,res) => {console.log('1 - ', res.statusType)})
superAgentProxy.get('google.com', (_,res) => {console.log('2 - ', res.statusType)})
// superAgentProxy.get('google.com', (_,res) => {console.log('3 - ', res.statusType)})
// superAgentProxy.get('google.com', (_,res) => {console.log('4 - ', res.statusType)})
