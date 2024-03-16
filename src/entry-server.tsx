import { createHandler, StartServer } from '@solidjs/start/server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Regex Generator AI - Automatically generate regex.</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Harness the capabilities of GPT to effortlessly create regular expressions on demand. Say goodbye to the hassle of writing regular expressions."
          />
          <link rel="icon" href="/favicon.png" />
          {assets}
          {/* Google Analysis */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-5WDT6EW9G2" />
          <script>
            {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-5WDT6EW9G2');`}
          </script>
          {/* Google Adsense */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6715369444769710"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
