export interface IResponseGetRequestInfo {
    xApiToken?: string
    userAgent?: string
    browserName?: string
    ipAddress?: string
}

const getBrowserNameFromSecChUa = (sec_ch_ua: string) => {
    const browsers = [
        "Amazon Silk",
        "Apple Safari",
        "Brave",
        "Dolphin browser",
        "Firefox Focus",
        "Google Chrome",
        "Microsoft Edge",
        "Mozilla Firefox",
        "Opera Mobile",
        "Puffin Browser",
        "QQ browser",
        "Samsung Internet",
        "UC Browser",
        "Vivaldi",
        "Opera",
        "Safari",
        "Maxthon"
    ];

    const browserUndefined = "Browser Undefined";
    let browserName: string = null

    browsers.forEach( it => {
        if(sec_ch_ua?.includes(it) && !browserName)
            browserName = it;
    });

    return browserName || browserUndefined;
}

export const getRequestInfoFromLogin = (req: any): IResponseGetRequestInfo => {
    if(!req) return null;
    const ipAddress = getIpAddress(req);
    const {
        'sec-ch-ua': sec_ch_ua,
        'user-agent': userAgent,
        'x-api-token': xApiToken
    } = req?.headers;

    if(xApiToken)
        return {
        xApiToken,
        ipAddress
    }

    return {
        userAgent,
        ipAddress,
        browserName: getBrowserNameFromSecChUa(sec_ch_ua)
    }
}

export const getIpAddress = (req: any): string=> {
    let xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ips: string[] = xForwardedFor.split(',');
        return ips?.length ? ips.at(-1).trim() : null;
    }
    return req.socket.remoteAddress;
}