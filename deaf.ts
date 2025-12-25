let response = fetch("https://gmgn.ai/vas/api/v1/token-signal/v2?device_id=1fcd6402-0538-4d7a-94a4-36e898d77a15&fp_did=76781e9013696319986b39357d5974c2&client_id=gmgn_web_20251224-9128-ce8359a&from_app=gmgn&app_ver=20251224-9128-ce8359a&tz_name=Europe%2FLondon&tz_offset=0&app_lang=en-US&os=web&worker=0", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9,es-ES;q=0.8,es;q=0.7,fr-FR;q=0.6,fr;q=0.5,en-US;q=0.4",
        "baggage": "sentry-environment=production,sentry-release=20251224-9128-ce8359a,sentry-public_key=93c25bab7246077dc3eb85b59d6e7d40,sentry-trace_id=06a55af964f24cfab7fc8f7d8dee1809,sentry-sample_rate=0.01,sentry-sampled=false",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sentry-trace": "06a55af964f24cfab7fc8f7d8dee1809-9c833b0230ce5a3f-0",
        "cookie": "_ga=GA1.1.1698044500.1763749878; _ga_UGLVBMV4Z0=GS1.2.1766667048837022.c043bf611f8b86360bca28eea3376f9e.a0M%2F51Z60A3%2BE4megOdNQw%3D%3D.%2BkUSk%2FEKDE5Hok1c8OYd%2BA%3D%3D.2vZe3jQVY1gr46whRoQp9g%3D%3D.KPeeeHfoakUjsoVJDj90sg%3D%3D; __cf_bm=VU7ES3MKkur7cZJkuZkOvpLQprmib1h4B3wYWmmsd8U-1766667532-1.0.1.1-0OawX2Mo3gaxC4BDcrvhIlUDM_1fdMiMf_waJmCOsJat44a39TqNgqQpTjrJtejssHGYHUkO0Z3A1EtnMKloYIKhOxup7ot9itHdmT1yIKU; _ga_0XM0LYXGC8=GS2.1.s1766667046$o44$g1$t1766667580$j26$l0$h0",
        "Referer": "https://gmgn.ai/trend/Q2Wot3l7?chain=sol&tab=surge"
    },
    "body": "{\"chain\":\"sol\",\"groups\":[{\"launchpad_platform\":[\"Pump.fun\"],\"signal_type\":[1],\"total_fee_min\":1}]}",
    "method": "POST"
});


console.log(response.then(async response => console.log(await response.json())))