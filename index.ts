import type { HeadersInit } from "bun";
import { pipe } from "fp-ts/lib/function";

import {
    Left,
    Right,
    type Either,
    type FetchConfig,
    type gmgm_api_response,
    type HttpMethod,
    type TokenBasics,
    type TokenData
} from "./types";
import { createTokenMonitor } from "./monitor";
import { sendMessageToChannel } from "./telegram";
import { parseConfig } from "./utils";

const url = "https://gmgn.ai/vas/api/v1/token-signal/v2?device_id=e2048be7-f39a-463c-9505-824b2321f8f5&fp_did=ff168e146960018eee828c835dee3ca2&client_id=gmgn_web_20251223-9048-62fc6ed&from_app=gmgn&app_ver=20251223-9048-62fc6ed&tz_name=Africa%2FCasablanca&tz_offset=3600&app_lang=en-US&os=web&worker=0"

const config = {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.5",
        "baggage": "sentry-environment=production,sentry-release=20251223-9048-62fc6ed,sentry-public_key=93c25bab7246077dc3eb85b59d6e7d40,sentry-trace_id=3150ad1c761f42299d3a476b6e3feb39,sentry-sample_rate=0.01,sentry-sampled=false",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Brave\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "sentry-trace": "3150ad1c761f42299d3a476b6e3feb39-8326b5054385c6e4-0",
        "cookie": "__cf_bm=N2fjLcrlfPmTWiW53ZNvgIgWrBZSDwyutIKwMeGGcw0-1766496027-1.0.1.1-VdkMtYAU2hC3BF2QrEDCB4.TaMo2IMJn4AoVxxJKJdIDyZFFXb9vmDGjwM7KiRn2bJrRBNTgN7tMr1lmHSxxDK2Zbt9mcOjYZYvGp4PYnwU",
        "Referer": "https://gmgn.ai/trend/Q2Wot3l7?chain=sol&tab=surge"
    },
    "body":
    {
        chain: 'sol',
        groups: [
            {
                launchpad_platform: ['Pump.fun'],
                signal_type: [1],
                total_fee_min: 1
            }
        ]
    },
    "method": "POST"
}


const handleResponse = async (response: Response): Promise<Either<string, gmgm_api_response>> => {

    console.log(`response status :: ${response.status}`);
    if (!response.ok) {
        process.exit(1)
        return Left(`${response.statusText}`)
    } else {
        return Right((await response.json() as gmgm_api_response))
    }
}

type createConfig = (method: HttpMethod, headers: HeadersInit, body: Record<string, any>) => FetchConfig

const createFetchConfig: createConfig = (m, h, b) =>
    ({ method: m, headers: { ...h }, body: JSON.stringify(b) })



// Composable fetch wrapper
const fetchJson = (url: string) => (config: FetchConfig): Promise<Either<string, gmgm_api_response>> =>
    fetch(url, config).then(async response => await handleResponse(response));


const extractData = (response: gmgm_api_response): Array<TokenData> => response.data

const transformData = (tokens: Array<TokenData>): Array<TokenBasics> => {
    console.log(`coins collected length ::`, tokens.length)
    return tokens.map(item => ({ name: item.data.name, address: item.data.address }))
}

console.log('Starting Monitoring Stream ...');
const Monitor = createTokenMonitor({ maxHistorySize: 2, trackInitialSnapshot: false })

const runMonitoring = async () => {
    const Telegram_config = parseConfig()

    /*   if (Telegram_config._tag === 'Left') {
          console.error(Telegram_config.left);
          process.exit(1);
      }
   */
    let results = pipe(
        await fetchJson(url)
            (createFetchConfig('POST', config.headers, config.body)),
        (e => e._tag === 'Left' ? [] : extractData(e.right)),
        transformData
    )


    const report = Monitor.analyze(results)
    console.log('Changes detected:', report.newTokens);
    if (report.newTokens.length > 0) {
        /*   let Message = await sendMessageToChannel(
              {
                  BotToken: Telegram_config.right.botToken,
                  channelId: Telegram_config.right.channelId
              },
              report.newTokens) */
        console.log(report.newTokens)
    }

}
setInterval(runMonitoring, 1000);
